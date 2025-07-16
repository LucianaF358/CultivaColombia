import { getCrops } from '@/lib/data';
import { CropsView } from '@/components/crops/CropsView';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Leaf, Map, Search } from 'lucide-react';

export default async function Home() {
  const crops = await getCrops();
  const regions = [...new Set(crops.map(crop => crop.region))];
  const climates = [...new Set(crops.map(crop => crop.clima))];
  const types = [...new Set(crops.map(crop => crop.tipo))];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Bienvenido a CultivaColombia
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Tu asistente inteligente para la soberanía alimentaria en Colombia.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col items-center justify-center p-8 text-center bg-card/80 hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Diagnóstico con IA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">¿Tu planta parece enferma? Sube una foto y obtén un diagnóstico y recomendaciones al instante.</p>
            <Button asChild size="lg">
              <Link href="/diagnostico">Diagnosticar Ahora</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center p-8 text-center bg-card/80 hover:shadow-xl transition-shadow">
           <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Explorar Cultivos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Navega por nuestra base de datos de cultivos, filtra por región, clima y más para encontrar tu siembra ideal.</p>
             <Button asChild size="lg" variant="outline">
              <Link href="#explorer">Ver todos los cultivos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <section id="explorer">
         <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">Explorador de Cultivos</h2>
            <p className="text-muted-foreground mt-2">Encuentra el cultivo perfecto para tu tierra.</p>
        </header>
        <CropsView
          initialCrops={crops}
          regions={regions}
          climates={climates}
          types={types}
        />
      </section>
    </div>
  );
}
