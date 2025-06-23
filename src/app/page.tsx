import { getCrops } from '@/lib/data';
import { CropsView } from '@/components/crops/CropsView';

export default async function Home() {
  const crops = await getCrops();
  const regions = [...new Set(crops.map(crop => crop.region))];
  const climates = [...new Set(crops.map(crop => crop.clima))];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Bienvenido a AgroColombia
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Descubre los cultivos ideales para tu región y clima. Fomentemos juntos la soberanía alimentaria en Colombia.
        </p>
      </header>
      <CropsView
        initialCrops={crops}
        regions={regions}
        climates={climates}
      />
    </div>
  );
}
