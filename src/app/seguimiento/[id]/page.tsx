
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { useRouter, notFound, useParams } from 'next/navigation';
import { getTrackedPlantById, updateTrackedPlantPlan, addNoteAndUpdatePlan } from '@/lib/firebase/seguimiento';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Siren, HeartPulse, Sprout, ShieldCheck, CalendarDays, BookText, Lightbulb, Loader2, Check, Droplets, Sun, Wind, ActivitySquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { TrackedPlant, DailyCarePlan, CareTask } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

function GerminationCalendar({ plant, dailyPlan, onTaskChange }: { plant: TrackedPlant, dailyPlan: DailyCarePlan[], onTaskChange: (dayIndex: number, taskIndex: number) => void }) {
    
    const [todayIndex, setTodayIndex] = useState(-1);

    useEffect(() => {
        if (plant.trackedAt) {
            const startDate = plant.trackedAt.toDate();
            const today = new Date();
            startDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            const diffTime = Math.abs(today.getTime() - startDate.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            setTodayIndex(diffDays);
        }
    }, [plant.trackedAt]);
    
    const taskTypeStyles = {
        sowing: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
        watering: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
        care: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
        observation: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800',
        default: 'bg-muted/50 border-border'
    };

    const getDayTaskType = (day: DailyCarePlan) => {
        if (!day.tasks || day.tasks.length === 0) return 'default';
        return day.tasks[0].type || 'default';
    };

    const todaysTasks = todayIndex >= 0 && todayIndex < dailyPlan.length ? dailyPlan[todayIndex].tasks : [];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Calendario de Germinación: {plant.plantName}</CardTitle>
          <CardDescription>Sigue el plan de 7 días para que tu semilla germine con éxito.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 text-center">
            {dailyPlan.map((day, index) => (
              <div
                key={day.day}
                className={cn(
                  "p-2 rounded-lg border-2 transition-all",
                  taskTypeStyles[getDayTaskType(day)],
                  todayIndex === index ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                )}
              >
                <div className="font-bold text-sm">Día {day.day}</div>
                <div className="text-xs capitalize">{day.tasks[0]?.type || 'Cuidado'}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <Badge variant="outline" className={cn("border-2", taskTypeStyles.sowing)}>Siembra</Badge>
                <Badge variant="outline" className={cn("border-2", taskTypeStyles.watering)}>Riego</Badge>
                <Badge variant="outline" className={cn("border-2", taskTypeStyles.care)}>Cuidado</Badge>
                <Badge variant="outline" className={cn("border-2", taskTypeStyles.observation)}>Observación</Badge>
            </div>
          </div>
          
          <Card className="bg-card/50">
             <CardHeader>
                <CardTitle>
                    {todayIndex >= 0 && todayIndex < 7
                        ? `Tareas para Hoy (Día ${todayIndex + 1})`
                        : "Plan de Germinación"
                    }
                </CardTitle>
                <CardDescription>
                     {todayIndex >= 0 && todayIndex < 7 
                        ? `Estas son las acciones recomendadas para el día de hoy.`
                        : `El plan de 7 días ha finalizado. ¡Esperamos que tu planta haya germinado!`
                     }
                </CardDescription>
             </CardHeader>
             <CardContent>
                {todaysTasks.length > 0 ? (
                    <div className="space-y-3">
                        {todaysTasks.map((task, taskIndex) => (
                           <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-card rounded-md border hover:bg-muted/50 transition-colors">
                                <Checkbox
                                    id={`task-${todayIndex}-${taskIndex}`}
                                    checked={task.completed}
                                    onCheckedChange={() => onTaskChange(todayIndex, taskIndex)}
                                    aria-label={`Marcar como completada: ${task.text}`}
                                />
                                <Label
                                    htmlFor={`task-${todayIndex}-${taskIndex}`}
                                    className={`flex-1 cursor-pointer text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}
                                >
                                    {task.text}
                                </Label>
                            </div>
                        ))}
                    </div>
                ) : (
                     <div className="text-center text-muted-foreground py-6">
                        <p>No hay tareas programadas para hoy.</p>
                        {todayIndex >= 7 && <p className="mt-2 text-sm">¡Tu planta debería haber germinado!</p>}
                    </div>
                )}
             </CardContent>
          </Card>
           {plant.trackedAt && (
             <p className="text-xs text-muted-foreground text-center">
                Seguimiento iniciado el: {format(plant.trackedAt.toDate(), "d 'de' LLLL, yyyy", { locale: es })}
             </p>
            )}
        </CardContent>
      </Card>
    );
}

export default function TrackedPlantDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [plant, setPlant] = useState<TrackedPlant | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyPlan, setDailyPlan] = useState<DailyCarePlan[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);
  const plantId = params.id as string;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPlant = async () => {
      if (!plantId) return;
      try {
        const fetchedPlant = await getTrackedPlantById(user.uid, plantId);
        if (fetchedPlant) {
          setPlant(fetchedPlant);
          setDailyPlan(fetchedPlant.dailyPlan || []);
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

    if (user && plantId) {
      fetchPlant();
    }
  }, [user, authLoading, plantId, router, toast]);

  const progress = useMemo(() => {
    const allTasks = dailyPlan.flatMap(day => day.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = allTasks.filter(task => task.completed);
    return (completedTasks.length / allTasks.length) * 100;
  }, [dailyPlan]);


  const handleTaskChange = async (dayIndex: number, taskIndex: number) => {
    if (!user || !plant) return;

    const newPlan = JSON.parse(JSON.stringify(dailyPlan));
    newPlan[dayIndex].tasks[taskIndex].completed = !newPlan[dayIndex].tasks[taskIndex].completed;
    setDailyPlan(newPlan);

    try {
        await updateTrackedPlantPlan(user.uid, plant.id, newPlan);
    } catch (error) {
        console.error("Error updating plan:", error);
        toast({ title: "Error", description: "No se pudo guardar el cambio en la tarea.", variant: "destructive" });
        // Revert UI change on error
        const revertedPlan = JSON.parse(JSON.stringify(dailyPlan));
        revertedPlan[dayIndex].tasks[taskIndex].completed = !revertedPlan[dayIndex].tasks[taskIndex].completed;
        setDailyPlan(revertedPlan);
    }
  };

  const handleAddNote = async () => {
    if (!user || !plant || !newNote.trim()) {
        toast({ title: "Nota vacía", description: "Por favor escribe una nota.", variant: "destructive" });
        return;
    }
    setIsUpdatingPlan(true);
    try {
        const updatedPlan = await addNoteAndUpdatePlan(user.uid, plantId, newNote);
        setDailyPlan(updatedPlan);
        setPlant(prev => prev ? { ...prev, notes: [...(prev.notes || []), { text: newNote, date: new Date().toISOString() }] } : null);
        setNewNote('');
        toast({ title: "Plan Actualizado", description: "La IA ha generado un nuevo plan de cuidados basado en tu nota." });
    } catch (error) {
        console.error("Error updating plan with note:", error);
        toast({ title: "Error", description: "No se pudo actualizar el plan con la nota.", variant: "destructive" });
    } finally {
        setIsUpdatingPlan(false);
    }
  };


  if (loading || authLoading) {
    return <DetailPageSkeleton />;
  }

  if (!plant) {
    notFound();
  }
  
  const isGerminationTracking = plant.isHealthy && plant.imageUrl;

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
                        src={plant.photoDataUri || plant.imageUrl || 'https://placehold.co/600x400.png'}
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

            {!isGerminationTracking && (
                <Card>
                    <CardHeader>
                        <CardTitle>Notas y Observaciones</CardTitle>
                        <CardDescription>Añade notas para que la IA ajuste el plan de cuidados.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Textarea 
                                placeholder="Ej: 'Las manchas han empezado a reducirse, pero noté unas pequeñas moscas blancas...'"
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                rows={4}
                            />
                            <Button onClick={handleAddNote} disabled={isUpdatingPlan || !newNote.trim()} className="w-full">
                                {isUpdatingPlan ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando y actualizando...</> : <><Lightbulb className="mr-2 h-4 w-4" />Añadir Nota y Actualizar Plan</>}
                            </Button>
                        </div>

                        {plant.notes && plant.notes.length > 0 && (
                            <div className="space-y-3 pt-4 border-t">
                                <h4 className="font-semibold text-sm">Historial de Notas</h4>
                                <div className="max-h-40 overflow-y-auto space-y-3 pr-2">
                                    {plant.notes.slice().reverse().map((note, index) => (
                                        <div key={index} className="text-sm p-3 bg-muted/50 rounded-md border">
                                            <p className="text-muted-foreground">{note.text}</p>
                                            <p className="text-xs text-muted-foreground/80 mt-1">{format(new Date(note.date), "d 'de' LLLL, yyyy 'a las' HH:mm", { locale: es })}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

        </div>

        <div className="lg:col-span-3 space-y-6">
            {isGerminationTracking ? (
                <GerminationCalendar plant={plant} dailyPlan={dailyPlan} onTaskChange={handleTaskChange} />
            ) : (
                <>
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
                    
                    {!plant.isHealthy && dailyPlan.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Plan de Cuidados de 7 Días</CardTitle>
                                <div className="flex items-center gap-4">
                                    <Progress value={progress} className="w-full" />
                                    <span className="text-sm font-semibold text-muted-foreground">{Math.round(progress)}%</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="day-1" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
                                        {dailyPlan.map((day, dayIndex) => (
                                            <TabsTrigger key={dayIndex} value={`day-${day.day}`}>Día {day.day}</TabsTrigger>
                                        ))}
                                    </TabsList>
                                    {dailyPlan.map((day, dayIndex) => (
                                        <TabsContent key={dayIndex} value={`day-${day.day}`} className="mt-4 space-y-3">
                                            {day.tasks.length > 0 ? day.tasks.map((task, taskIndex) => (
                                                <div key={taskIndex} className="flex items-center space-x-3 p-3 bg-card rounded-md border hover:bg-muted/50 transition-colors">
                                                    <Checkbox 
                                                        id={`task-${dayIndex}-${taskIndex}`} 
                                                        checked={task.completed}
                                                        onCheckedChange={() => handleTaskChange(dayIndex, taskIndex)}
                                                        aria-label={`Marcar como completada: ${task.text}`}
                                                    />
                                                    <Label 
                                                        htmlFor={`task-${dayIndex}-${taskIndex}`}
                                                        className={`flex-1 cursor-pointer text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}
                                                    >
                                                        {task.text}
                                                    </Label>
                                                </div>
                                            )) : (
                                                <p className="text-muted-foreground text-sm text-center py-4">No hay tareas específicas para hoy. ¡Buen trabajo!</p>
                                            )}
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    )}

                    {!plant.isHealthy && dailyPlan.length === 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Plan de Cuidados</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center text-muted-foreground flex flex-col items-center gap-4 py-8">
                                    <CalendarDays className="h-10 w-10" />
                                    <p>La IA no generó un plan de cuidados diario para este diagnóstico.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
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
