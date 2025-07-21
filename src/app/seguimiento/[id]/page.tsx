
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { useRouter, notFound } from 'next/navigation';
import { getTrackedPlantById, updateTrackedPlantTasks } from '@/lib/firebase/seguimiento';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ClipboardList, Loader2, HeartPulse, Sprout, Siren, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { TrackedPlant } from '@/types';


function MarkdownContent({ content }: { content: string | undefined }) {
  if (!content) return null;
  const createMarkup = (text: string) => ({ __html: text });
  return (
    <div
      className="text-muted-foreground space-y-2 prose-p:my-0 prose-ul:list-disc prose-ul:pl-5 prose-ul:space-y-1"
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
}

function parseCareTasks(careNeeded: string | undefined): { text: string; completed: boolean }[] {
    if (!careNeeded) return [];
    // The AI is instructed to use "- " for bullet points. We find those lines.
    const taskLines = careNeeded.match(/^- .*/gm);
    if (!taskLines) return [];
    
    return taskLines.map(line => ({
        // Remove the leading "- "
        text: line.substring(2).trim(),
        completed: false
    }));
}


export default function TrackedPlantDetailPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [plant, setPlant] = useState<TrackedPlant | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPlant = async () => {
      try {
        const fetchedPlant = await getTrackedPlantById(user.uid, params.id);
        if (fetchedPlant) {
          setPlant(fetchedPlant);
          if (fetchedPlant.tasks && fetchedPlant.tasks.length > 0) {
            setTasks(fetchedPlant.tasks);
          } else if (fetchedPlant.diagnosis?.careNeeded) {
            setTasks(parseCareTasks(fetchedPlant.diagnosis.careNeeded));
          }
        } else {
          setPlant(null); // Plant not found
        }
      } catch (error) {
        console.error("Error fetching tracked plant:", error);
        toast({ title: "Error", description: "No se pudo cargar la planta.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [user, authLoading, params.id, router, toast]);

  const handleTaskChange = async (index: number) => {
    if (!user || !plant) return;

    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);

    try {
        await updateTrackedPlantTasks(user.uid, plant.id, newTasks);
        toast({
            title: "Progreso guardado",
            description: "Tu lista de tareas ha sido actualizada.",
        });
    } catch (error) {
        console.error("Error updating tasks:", error);
        toast({ title: "Error", description: "No se pudo guardar el cambio en la tarea.", variant: "destructive" });
        // Revert UI change on error
        const revertedTasks = [...tasks];
        revertedTasks[index].completed = !revertedTasks[index].completed;
        setTasks(revertedTasks);
    }
  };

  if (loading || authLoading) {
    return <DetailPageSkeleton />;
  }

  if (!plant) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/seguimiento" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver a Seguimiento
      </Link>
      
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={plant.photoDataUri}
                        alt={`Diagnóstico de ${plant.plantName || 'planta'}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-3xl font-bold font-headline text-primary">{plant.plantName || 'Planta no identificada'}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                        {plant.description || "Sin descripción adicional."}
                    </CardDescription>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico de la IA</CardTitle>
              <CardDescription>Análisis y estado de salud de tu planta.</CardDescription>
            </CardHeader>
            <CardContent>
                {plant.isHealthy ? (
                    <div className="flex items-center gap-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg">
                        <ShieldCheck className="h-8 w-8"/>
                        <p className="font-semibold">¡Buenas noticias! Tu planta parece estar en buen estado de salud.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <InfoItem icon={<Siren className="text-destructive"/>} label="Problema Detectado" value={plant.diagnosis?.problem || 'No especificado'} />
                        <InfoItem icon={<Sprout className="text-accent"/>} label="Posibles Causas" content={<MarkdownContent content={plant.diagnosis?.causes} />} />
                        <InfoItem icon={<HeartPulse className="text-accent"/>} label="Daños Observados" content={<MarkdownContent content={plant.diagnosis?.damages} />} />
                    </div>
                )}
            </CardContent>
          </Card>
          
          {!plant.isHealthy && tasks.length > 0 && (
             <Card>
                <CardHeader>
                <CardTitle>Plan de Cuidados</CardTitle>
                <CardDescription>Marca las tareas a medida que las completes para recuperar tu planta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-md border hover:bg-muted/50 transition-colors">
                            <Checkbox 
                                id={`task-${index}`} 
                                checked={task.completed}
                                onCheckedChange={() => handleTaskChange(index)}
                                aria-label={`Marcar como completada: ${task.text}`}
                            />
                            <Label 
                                htmlFor={`task-${index}`}
                                className={`flex-1 cursor-pointer text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}
                            >
                                {task.text}
                            </Label>
                        </div>
                    ))}
                </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, content }: { icon: React.ReactNode, label: string, value?: string, content?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-card rounded-md border">
      <div className="flex-shrink-0 w-6 h-6 mt-1">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-card-foreground">{label}</p>
        {value && <p className="text-muted-foreground">{value}</p>}
        {content && <div className="mt-1">{content}</div>}
      </div>
    </div>
  )
}


function DetailPageSkeleton() {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <Skeleton className="w-full aspect-video rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <Skeleton className="h-7 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
                 <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
