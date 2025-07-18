
"use client";

import { useState, useRef, type DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Bot, Sprout, Siren, HeartPulse, ShieldCheck, AlertTriangle, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import { diagnosePlant, type DiagnosePlantOutput } from '@/ai/flows/diagnosePlant';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/firebase/auth';
import { saveDiagnosisForTracking } from '@/lib/firebase/seguimiento';
import { useRouter } from 'next/navigation';

function DiagnosisResultSkeleton() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

// Helper to render text with bullet points and bold tags
function MarkdownContent({ content }: { content: string | undefined }) {
  if (!content) return null;

  const createMarkup = (text: string) => {
    // Reemplaza los guiones de Markdown por elementos <li> y envuelve los bloques en <ul>
    const listRegex = /((?:^- .+\n?)+)/gm;
    let processedText = text.replace(listRegex, (match) => {
      const items = match.split('\n').filter(item => item.trim() !== '');
      const listItems = items.map(item => `<li>${item.substring(2)}</li>`).join('');
      return `<ul class="list-disc pl-5 space-y-1">${listItems}</ul>`;
    });
     // Reemplaza los párrafos que no son listas con etiquetas <p> para un espaciado consistente.
    const paragraphRegex = /^(?!<ul)(.*)$/gm;
    processedText = processedText.replace(paragraphRegex, (match) => {
        if (match.trim() === '' || match.startsWith('<ul')) return match;
        return `<p>${match}</p>`;
    });

    return { __html: processedText };
  };

  return (
    <div
      className="text-muted-foreground space-y-2 prose-p:my-0"
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
}


export default function DiagnosticoPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [result, setResult] = useState<DiagnosePlantOutput | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();


  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setResult(null); // Reset result when a new image is uploaded
        };
        reader.readAsDataURL(file);
    } else {
        toast({
            title: "Archivo no válido",
            description: "Por favor, sube un archivo de imagen.",
            variant: 'destructive'
        });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!imagePreview) {
      toast({
        title: "Imagen requerida",
        description: "Por favor, sube una imagen para el diagnóstico.",
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    setResult(null);

    try {
      const diagnosisResult = await diagnosePlant({
        photoDataUri: imagePreview,
        description,
      });
      setResult(diagnosisResult);
    } catch (error) {
      console.error("Error diagnosing plant:", error);
      toast({
        title: 'Error en el diagnóstico',
        description: 'No se pudo analizar la planta. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDiagnosis = async () => {
    if (!user || !result || !imagePreview) {
      toast({
        title: "No se puede guardar",
        description: "Debes iniciar sesión y tener un diagnóstico válido para guardar.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await saveDiagnosisForTracking(user.uid, {
        ...result,
        photoDataUri: imagePreview,
        description,
      });
      toast({
        title: "Diagnóstico Guardado",
        description: "Puedes ver tus plantas guardadas en la sección de seguimiento.",
        action: {
          altText: "Ir a Seguimiento",
          onClick: () => router.push('/seguimiento'),
        }
      });
    } catch (error) {
       console.error("Error saving diagnosis:", error);
       toast({
        title: 'Error al guardar',
        description: 'No se pudo guardar el diagnóstico. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const clearForm = () => {
    setImagePreview(null);
    setDescription('');
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline text-primary">Diagnóstico de Cultivos con IA</h1>
          <p className="text-muted-foreground mt-2">Sube una foto de tu planta y describe el problema para obtener ayuda.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Analizar mi planta</CardTitle>
            <CardDescription>Completa los siguientes campos para obtener un diagnóstico.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="plant-image">Fotografía de la planta</Label>
                <div 
                  className={cn(
                    "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors",
                    isDragging && "border-primary bg-primary/10"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnter={handleDragOver}
                >
                  <Input 
                    id="plant-image" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  {imagePreview ? (
                    <>
                      <Image src={imagePreview} alt="Vista previa de la planta" width={200} height={200} className="mx-auto rounded-md object-cover h-48 w-full" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full bg-background/70"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearForm();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground pointer-events-none">
                      <Upload className="h-8 w-8" />
                      <span>Haz clic o arrastra una imagen aquí</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción del problema (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Ej: Las hojas tienen manchas amarillas y los bordes están secos."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !imagePreview}>
                {isLoading ? 'Analizando...' : 'Obtener Diagnóstico'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && <DiagnosisResultSkeleton />}

        {result && (
          <Card className="mt-8 animate-in fade-in-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Resultado del Diagnóstico</CardTitle>
                  <CardDescription>Análisis generado por la IA de CultivaColombia.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!result.isPlant ? (
                 <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                  <h3 className="mt-4 text-lg font-semibold">No se detectó una planta</h3>
                  <p className="mt-2 text-sm text-muted-foreground">La imagen no parece ser de una planta. Por favor, intenta con otra foto.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {result.isHealthy ? 
                        <ShieldCheck className="h-10 w-10 text-green-600"/> : 
                        <Siren className="h-10 w-10 text-destructive"/>
                      }
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                         Planta Identificada: <span className="font-bold text-primary">{result.plantName || "No identificada"}</span>
                      </h3>
                      <p className="text-muted-foreground">
                        {result.isHealthy ? 'Tu planta parece estar en buen estado de salud.' : `Se ha detectado un problema: ${result.diagnosis?.problem || 'No especificado'}`}
                      </p>
                    </div>
                  </div>
                  
                  {user && (
                    <div className="pt-4 border-t">
                      <Button onClick={handleSaveDiagnosis} disabled={isSaving} className="w-full">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        {isSaving ? "Guardando..." : "Guardar para Seguimiento"}
                      </Button>
                    </div>
                  )}

                  {!result.isHealthy && result.diagnosis && (
                     <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 text-base">
                              <div className="p-2 bg-primary/10 rounded-full"><Siren className="h-5 w-5 text-primary"/></div>
                              <span>Daños Observados</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <MarkdownContent content={result.diagnosis.damages} />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 text-base">
                               <div className="p-2 bg-primary/10 rounded-full"><Sprout className="h-5 w-5 text-primary"/></div>
                               <span>Posibles Causas</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                             <MarkdownContent content={result.diagnosis.causes} />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                           <AccordionTrigger>
                              <div className="flex items-center gap-3 text-base">
                                <div className="p-2 bg-primary/10 rounded-full"><HeartPulse className="h-5 w-5 text-primary"/></div>
                                <span>Cuidados y Recomendaciones</span>
                              </div>
                           </AccordionTrigger>
                          <AccordionContent>
                             <MarkdownContent content={result.diagnosis.careNeeded} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
