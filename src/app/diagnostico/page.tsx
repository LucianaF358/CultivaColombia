
"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function DiagnosticoPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!imagePreview) {
      // Idealmente, usaríamos un toast para esto
      alert("Por favor, sube una imagen.");
      return;
    }
    setIsLoading(true);
    // Lógica de la IA aquí
    console.log("Enviando a la IA:", { image: imagePreview, description });
    // Simular una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
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
                  className="relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
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
                          setImagePreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                      <span>Haz clic para subir una imagen</span>
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
      </div>
    </div>
  );
}
