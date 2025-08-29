
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, Bug, Flower, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const terminosCultivo = [
  { term: "🌿 Acodo", definition: "Método para reproducir una planta haciendo que una rama desarrolle raíces mientras sigue unida a la planta madre." },
  { term: "🍂 Acolchado (Mulch)", definition: "Capa de material (como paja u hojas secas) que se pone sobre el suelo para protegerlo, mantener la humedad y evitar malas hierbas." },
  { term: "⛰️ Altiplano", definition: "Meseta elevada y extensa, como la Sabana de Bogotá." },
  { term: "🗓️ Anual", definition: "Planta que completa todo su ciclo de vida (nace, crece, florece y muere) en un solo año." },
  { term: "🔄 Bienal", definition: "Planta que tarda dos años en completar su ciclo de vida." },
  { term: "🥔 Cormo", definition: "Tallo subterráneo, corto y abultado, que almacena nutrientes (parecido a un bulbo). Se usa para reproducir plantas como el ñame o el gladiolo." },
  { term: "☀️ Curado", definition: "Proceso de secado al que se someten algunos frutos o bulbos (como el ajo y la cebolla) después de la cosecha para mejorar su conservación." },
  { term: "💧 Drenaje", definition: "Capacidad del suelo para eliminar el exceso de agua. Un buen drenaje evita que las raíces se pudran." },
  { term: "🌳 Epífita", definition: "Planta que crece sobre otra planta (como un árbol) sin parasitarla, solo usándola como soporte. Las orquídeas son un ejemplo clásico." },
  { term: "🌱 Esqueje (o Estaca)", definition: "Trozo de tallo, hoja o raíz que se corta de una planta para reproducirla." },
  { term: "🔗 Espaldera", definition: "Estructura de postes y alambres usada para guiar y soportar plantas trepadoras como la vid o el maracuyá." },
  { term: "🐮 Forraje", definition: "Hierba o plantas que se cultivan para alimentar al ganado." },
  { term: "💡 Fotoperiodo", definition: "Número de horas de luz que una planta recibe en un día. Es un factor clave que controla la floración en muchas especies como el crisantemo." },
  { term: "🏞️ Franco (Suelo)", definition: "Tipo de suelo ideal para la agricultura, con un equilibrio de arena, limo y arcilla. Es fértil y tiene buen drenaje." },
  { term: "👨‍⚕️ Injerto", definition: "Técnica que consiste en unir una parte de una planta (la yema o púa) con otra que ya tiene raíces (el patrón) para que crezcan como una sola. Se usa mucho en árboles frutales." },
  { term: "🫘 Leguminosa (o Fabaceae)", definition: "Familia de plantas (como el frijol o la lenteja) que tienen la capacidad de fijar nitrógeno en el suelo, mejorando su fertilidad." },
  { term: "♻️ Materia Orgánica", definition: "Residuos descompuestos de plantas y animales que enriquecen el suelo con nutrientes. El compost es un ejemplo." },
  { term: "🌻 Oleaginosa", definition: "Planta de cuya semilla o fruto se puede extraer aceite (como la soya o la palma africana)." },
  { term: "♾️ Perenne", definition: "Planta que vive durante más de dos años." },
  { term: "🌾 Pseudocereal", definition: "Plantas como la quinua o el amaranto, cuyas semillas se usan y consumen como si fueran cereales, but botánicamente no lo son." },
  { term: "🫚 Rizoma", definition: "Tallo subterráneo que crece horizontalmente y del cual brotan raíces y nuevos tallos. El jengibre y la cúrcuma son ejemplos." },
  { term: "💪 Rústico (planta)", definition: "Se refiere a una planta que es muy resistente, adaptable y que no requiere cuidados especiales para sobrevivir." },
  { term: "📚 spp.", definition: "Abreviatura de \"especies\" (en plural). Se usa en nombres científicos (ej. Rosa spp.) para referirse a varias especies dentro de un mismo género." },
  { term: "🌵 Suculenta", definition: "Planta que almacena agua en sus hojas, tallos o raíces, lo que le permite sobrevivir en climas secos. El Aloe Vera es un ejemplo." },
  { term: "⬆️ Tutorado", definition: "Poner un soporte (como una estaca o una red) a una planta para ayudarla a crecer verticalmente y evitar que sus tallos o frutos toquen el suelo." }
];

const terminosPlagas = [
  { term: "🍄 Antracnosis", definition: "Enfermedad causada por un hongo que provoca manchas oscuras y hundidas en hojas, tallos y frutos." },
  { term: "🐞 Broca del café", definition: "Pequeño escarabajo que perfora el grano de café para poner sus huevos, dañando la cosecha." },
  { term: "⚫ Carbón", definition: "Enfermedad fúngica que afecta a los cereales, convirtiendo los granos en una masa de polvo negro." },
  { term: "☁️ Cochinilla", definition: "Insecto pequeño que se cubre con una capa algodonosa o cerosa y chupa la savia de las plantas." },
  { term: "🍂 Gota (o Tizón tardío)", definition: "Enfermedad devastadora, causada por un hongo (Phytophthora infestans), que afecta principalmente a la papa y el tomate, provocando manchas y pudrición." },
  { term: "🐛 Gusano Cogollero", definition: "Larva de una polilla que ataca el \"cogollo\" (la parte central del crecimiento) de plantas como el maíz." },
  { term: "🍊 HLB (Huanglongbing)", definition: "Enfermedad bacteriana incurable de los cítricos que amarillea las hojas y deforma los frutos. Es una de las más destructivas para naranjos y limones." },
  { term: "🌫️ Mildeo (Velloso o Polvoso)", definition: "Enfermedad causada por hongos que crea una capa de polvo blanco o grisáceo sobre las hojas." },
  { term: "🍫 Monilia", definition: "Hongo que ataca las mazorcas de cacao, pudriéndolas desde adentro." },
  { term: "🔬 Nematodos", definition: "Gusanos microscópicos que viven en el suelo y atacan las raíces de las plantas, debilitándolas." },
  { term: "PowderyMildeo", definition: "Similar al mildeo, es un hongo que forma una capa de polvo blanco sobre hojas y tallos." },
  { term: "🌾 Piricularia", definition: "Hongo que causa una de las enfermedades más graves del arroz, provocando manchas en las hojas y el \"cuello\" de la espiga." },
  { term: "🟠 Roya", definition: "Enfermedad fúngica que produce pústulas de color anaranjado o marrón (similar al óxido) en las hojas." },
  { term: "🍌 Sigatoka Negra", definition: "Enfermedad fúngica muy agresiva que destruye las hojas del banano y el plátano, reduciendo la producción." },
  { term: "🦟 Sogata", definition: "Insecto que chupa la savia del arroz y puede transmitir virus." },
  { term: "🦗 Trips", definition: "Insectos muy pequeños y alargados que raspan las hojas y flores para alimentarse, dejando manchas plateadas." }
];

const terminosBotanica = [
  { term: "솜 Bellota", definition: "En el algodón, es la cápsula que contiene las semillas y la fibra." },
  { term: "capegooseberry Capacho", definition: "La cáscara de papel que envuelve el fruto de la uchuva." },
  { term: "💐 Inflorescencia", definition: "Grupo de flores dispuestas en una estructura. El brócoli y la coliflor son ejemplos comestibles." },
  { term: "🥦 Pella", definition: "La cabeza compacta y blanca que forma la coliflor." },
  { term: "🥬 Penca", definition: "El tallo carnoso y alargado de plantas como el apio." },
  { term: "🌺 Pseudobulbo", definition: "En las orquídeas, es un tallo engrosado que almacena agua y nutrientes." },
  { term: "🫛 Vaina", definition: "Cáscara alargada que contiene las semillas de las leguminosas, como el frijol o la arveja." }
];


export default function GlosarioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Glosario de Términos Agrícolas</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Un diccionario rápido para entender los conceptos clave del mundo de la agricultura y la botánica.
        </p>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        <CategorySection title="Términos de Cultivo y Suelos" emoji="🌱" icon={GraduationCap} terms={terminosCultivo} />
        <CategorySection title="Plagas y Enfermedades Comunes" emoji="🐛" icon={Bug} terms={terminosPlagas} />
        <CategorySection title="Partes de la Planta y Botánica" emoji="🌸" icon={Flower} terms={terminosBotanica} />
      </div>
    </div>
  );
}

interface CategorySectionProps {
    title: string;
    emoji: string;
    icon: React.ElementType;
    terms: { term: string; definition: string }[];
}

function CategorySection({ title, emoji, icon: Icon, terms }: CategorySectionProps) {
    const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

    const sortedTerms = useMemo(() => {
        const sorted = [...terms];
        if (sortOrder === 'asc') {
            sorted.sort((a, b) => a.term.localeCompare(b.term));
        } else if (sortOrder === 'desc') {
            sorted.sort((a, b) => b.term.localeCompare(a.term));
        }
        return sorted;
    }, [terms, sortOrder]);

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <span className="text-3xl">{emoji}</span>
                            <span>{title}</span>
                        </CardTitle>
                        <CardDescription>Definiciones clave relacionadas con {title.toLowerCase()}.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setSortOrder('asc')}
                            className={cn(sortOrder === 'asc' && 'bg-accent')}
                            aria-label="Ordenar A-Z"
                        >
                            <ArrowDownAZ className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setSortOrder('desc')}
                            className={cn(sortOrder === 'desc' && 'bg-accent')}
                            aria-label="Ordenar Z-A"
                        >
                            <ArrowUpZA className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {sortedTerms.map((item, index) => (
                        <AccordionItem key={item.term} value={`item-${index}`}>
                            <AccordionTrigger className="py-4 text-base text-left hover:no-underline">
                                {item.term}
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 text-muted-foreground">
                                {item.definition}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
