"use client";

import { useState, useMemo } from 'react';
import type { Crop } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InteractiveMapProps {
  crops: Crop[];
  regions: string[];
}

const difficultyClasses = {
  'Fácil': {
    border: 'border-primary',
    text: 'text-primary',
    dot: 'bg-primary'
  },
  'Media': {
    border: 'border-accent',
    text: 'text-accent',
    dot: 'bg-accent'
  },
  'Difícil': {
    border: 'border-destructive',
    text: 'text-destructive',
    dot: 'bg-destructive'
  },
};

const ColombiaSVG = ({ selectedRegion, onRegionClick }: { selectedRegion: string | null, onRegionClick: (region: string) => void }) => {
    // Improved SVG paths for Colombian regions
    const regionPaths: { [key: string]: string } = {
        'Andina': "M130 187L121 185.5L110.5 180L103.5 175.5L97.5 168L93.5 158V147.5L98 136L103 122.5L105.5 110L110 94L113.5 82.5L120.5 66.5L127.5 54.5L135 44L138 33L142 24.5L150 20L159.5 18L166 22.5L171 30.5L178 33.5L186.5 40L189 50L194 62L203 69.5L208.5 76.5L202 89L196 96L194.5 110L189.5 125L183.5 137.5L178 148L173.5 157L163 171L159.5 178.5L150 182.5L141.5 185.5L130 187Z",
        'Caribe': "M178 33.5L171 30.5L166 22.5L159.5 18L150 20L142 24.5L138 33L145.5 39.5L154 44.5L163 47.5L173 50.5L181.5 52.5L189 50L194 62L203 69.5L208.5 76.5L214 75L224 71.5L234.5 65.5L245 57.5L255.5 49L265 42.5L271.5 35L273.5 25.5L263.5 20.5L250 17L235 15.5L220.5 17.5L211.5 24L200.5 30L194 36.5L186.5 40L178 33.5Z",
        'Pacífica': "M110 94L105.5 110L103 122.5L98 136L93.5 147.5V158L85.5 156L78 149L72 137.5L68 126L65 115L64.5 102.5L68 90.5L74.5 82L82.5 77L90 77.5L98 81.5L104.5 88L110 94Z",
        'Orinoquía': "M178 148L189.5 150L199.5 150.5L209 154L217.5 161.5L226 169.5L232.5 179.5L235.5 190.5L234.5 201L230.5 209.5L224 216L213.5 221L201 220.5L189 216L175.5 210.5L163.5 204L152 195L141.5 185.5L150 182.5L159.5 178.5L163 171L173.5 157L178 148Z",
        'Amazonía': "M93.5 158L97.5 168L103.5 175.5L110.5 180L121 185.5L130 187L141.5 185.5L152 195L163.5 204L175.5 210.5L189 216L201 220.5L213.5 221L212 231.5L204.5 240L193.5 248.5L181.5 254.5L168.5 259L154.5 260.5L141 259.5L128 255.5L116 249.5L106.5 241L99.5 231L95 220L92.5 208L92 195.5L90.5 182.5V169L93.5 158Z"
    };

    return (
        <svg viewBox="60 10 220 260" className="w-full h-auto max-h-[400px] drop-shadow-lg">
            <g>
                {Object.entries(regionPaths).map(([name, pathData]) => (
                    <path
                        key={name}
                        d={pathData}
                        onClick={() => onRegionClick(name)}
                        className={cn(
                            "stroke-background stroke-2 transition-all duration-300 cursor-pointer",
                            selectedRegion === name ? 'fill-primary/80' : 'fill-muted hover:fill-primary/50'
                        )}
                    />
                ))}
            </g>
        </svg>
    );
};


export function InteractiveMap({ crops, regions }: InteractiveMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(regions.includes('Andina') ? 'Andina' : regions[0]);

  const cropsInRegion = useMemo(() => {
    return crops.filter(crop => crop.region === selectedRegion);
  }, [crops, selectedRegion]);

  const handleRegionClick = (region: string) => {
    // Only set state if the region has data, to avoid clicking on Amazonia (from SVG) if it has no crops
    if (regions.includes(region)) {
        setSelectedRegion(region);
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold font-headline text-primary">Mapa Interactivo de Cultivos</h2>
          <p className="text-muted-foreground mt-2">Explora los cultivos ideales por región y su nivel de dificultad.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-card p-4 rounded-lg border shadow-sm">
                <ColombiaSVG selectedRegion={selectedRegion} onRegionClick={handleRegionClick} />
                 <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {regions.map(region => (
                    <Button
                      key={region}
                      variant={selectedRegion === region ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRegion(region)}
                    >
                      {region}
                    </Button>
                  ))}
                </div>
            </div>
            
            <div className="mt-8 md:mt-0">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Cultivos en la región {selectedRegion}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {cropsInRegion.length > 0 ? (
                        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
                            {cropsInRegion.map(crop => (
                            <Link href={`/cultivos/${crop.id}`} key={crop.id} className="block group">
                                <div className={cn(
                                    "p-3 rounded-lg border-l-4 group-hover:bg-accent/50 transition-colors flex items-center justify-between",
                                    difficultyClasses[crop.dificultad].border
                                )}>
                                    <span className="font-semibold text-card-foreground">{crop.nombre}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("text-xs font-medium", difficultyClasses[crop.dificultad].text)}>{crop.dificultad}</span>
                                        <span className={cn("h-3 w-3 rounded-full", difficultyClasses[crop.dificultad].dot)}></span>
                                    </div>
                                </div>
                            </Link>
                            ))}
                        </div>
                        ) : (
                        <p className="text-muted-foreground text-center py-8">No hay cultivos para esta región.</p>
                        )}
                    </CardContent>
                </Card>
                <div className="mt-4 flex justify-center items-center gap-6 text-sm p-3 bg-card rounded-lg border">
                    <h4 className="font-semibold">Leyenda:</h4>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-primary"></span>
                        <span>Fácil</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-accent"></span>
                        <span>Media</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-destructive"></span>
                        <span>Difícil</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
