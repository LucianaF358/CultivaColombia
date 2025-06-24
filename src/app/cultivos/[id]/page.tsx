import { getCropById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Sprout, Bug, Calendar, Clock, Sun, Trees } from 'lucide-react';

export default async function CropDetailPage({ params }: { params: { id: string } }) {
  const crop = await getCropById(params.id);

  if (!crop) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
        <ArrowLeft className="h-4 w-4" />
        Volver a todos los cultivos
      </Link>
      
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-2 relative w-full aspect-square md:aspect-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src={crop.imageUrl}
            alt={`Imagen de ${crop.nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            data-ai-hint={crop.dataAiHint}
          />
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="bg-card/80">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-headline text-primary">{crop.nombre}</CardTitle>
              <CardDescription className="text-xl text-muted-foreground italic">{crop.nombreCientifico} ({crop.familia})</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{crop.descripcionDetallada}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ficha Técnica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <InfoItem icon={<Sun className="text-accent"/>} label="Clima" value={crop.clima} />
                <InfoItem icon={<Trees className="text-accent"/>} label="Región" value={crop.region} />
                <InfoItem icon={<Calendar className="text-accent"/>} label="Temporada de siembra" value={crop.temporada} />
                <InfoItem icon={<Sprout className="text-accent"/>} label="Tipo de suelo" value={crop.tipoDeSuelo} />
                <InfoItem icon={<Clock className="text-accent"/>} label="Tiempo de siembra" value={crop.tiempoSiembra} />
                <InfoItem icon={<Clock className="text-accent rotate-180" />} label="Tiempo de cosecha" value={crop.tiempoCosecha} />
                <InfoItem icon={<Bug className="text-accent"/>} label="Plagas comunes" value={crop.plagasComunes} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-card rounded-md border">
      <div className="flex-shrink-0 w-5 h-5 mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-card-foreground">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
