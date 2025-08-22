
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Wrench, BookOpen, ExternalLink } from 'lucide-react';

const guides = [
  {
    title: "Calendario de Siembra para Colombia",
    description: "Una guía de Pintuco Agro para saber qué sembrar cada mes en Colombia según el clima.",
    url: "https://www.pintuco.com.co/blog/agropintuco/saber-que-sembrar-cada-mes-en-colombia-segun-el-clima/",
    category: "Guía"
  },
  {
    title: "Guía Completa de Agricultura Urbana",
    description: "Aprende a montar y mantener tu propia huerta en espacios pequeños con este manual de agrocultiva.co.",
    url: "https://www.agrocultiva.co/blogs/noticias/guia-completa-de-agricultura-urbana-como-crear-y-mantener-tu-propia-huerta",
    category: "Guía"
  },
  {
    title: "Manual de Buenas Prácticas Agrícolas (BPA)",
    description: "Documento oficial del ICA sobre los estándares para garantizar la calidad e inocuidad de los productos.",
    url: "https://www.ica.gov.co/getattachment/1b580a31-6b83-45a7-9306-7945e43e30e7/Publicacion-3.aspx",
    category: "Manual"
  },
    {
    title: "El ABC del Riego: Cuándo y Cómo Regar",
    description: "Aprende a identificar las necesidades de agua de tus plantas y las mejores técnicas de riego (Blog 'El Huerto de Urbano').",
    url: "https://elhuertourbano.net/riego/",
    category: "Guía"
  },
  {
    title: "Guía para la Preparación de Compost Casero",
    description: "Transforma tus desechos orgánicos en 'oro negro' para tus plantas con esta guía paso a paso de EcologíaVerde.",
    url: "https://www.ecologiaverde.com/como-hacer-compost-casero-1613.html",
    category: "Guía"
  },
  {
    title: "Identificación y Manejo de Plagas Comunes",
    description: "Aprende a reconocer y combatir las plagas más frecuentes de la huerta con métodos orgánicos (InfoJardin).",
    url: "https://articulos.infojardin.com/huerto/plagas-del-huerto.htm",
    category: "Guía"
  },
];

const tools = [
  {
    title: "Plantix - Tu doctor para las plantas",
    description: "Una aplicación móvil que te ayuda a identificar plagas y enfermedades subiendo una foto.",
    url: "https://plantix.net/es/",
    category: "App"
  },
  {
    title: "Calculadora de Fertilizantes Yara",
    description: "Herramienta online para calcular las necesidades de nutrientes de tus cultivos.",
    url: "https://www.yaracolombia.com/recomendaciones-nutricionales/herramientas-y-servicios-digitales/calculadoras-de-conversion/",
    category: "Herramienta Web"
  },
  {
    title: "Mapa de Suelos de Colombia - AGROSAVIA",
    description: "Consulta los mapas detallados de suelos de Colombia para entender mejor tu tierra.",
    url: "https://www.agrosavia.co/investigacion-y-desarrollo/mapas-de-suelos",
    category: "Mapa"
  },
  {
    title: "Canal de YouTube: La Huerta de Toni",
    description: "Uno de los canales más populares en español sobre huertos urbanos, permacultura y técnicas de cultivo ecológico.",
    url: "https://www.youtube.com/@LaHuertadeToni",
    category: "Comunidad"
  },
  {
    title: "PictureThis (App)",
    description: "Identifica miles de plantas, flores y árboles al instante con solo tomar una foto. Incluye diagnósticos.",
    url: "https://www.picturethisai.com/es",
    category: "App"
  },
  {
    title: "Foro de InfoJardín",
    description: "Una de las comunidades de jardinería y agricultura más grandes en español para resolver dudas.",
    url: "https://foro.infojardin.com/",
    category: "Comunidad"
  },
];

const articles = [
  {
    title: "5 Claves para un Riego Eficiente",
    description: "El riego es fundamental, pero hacerlo de forma eficiente ahorra agua y previene enfermedades. Aprende 5 claves.",
    url: "https://www.jardineriaon.com/consejos-para-un-riego-eficiente.html",
    category: "Artículo"
  },
  {
    title: "Principios Básicos del Compostaje Casero",
    description: "Compostar es reciclar materia orgánica para crear un abono rico en nutrientes. Conoce los principios básicos.",
    url: "https://www.eldiario.es/consumoclaro/hazlo-tu-mismo/ocho-claves-compost-casero-funcione-huerto-urbano_1_1656829.html",
    category: "Artículo"
  },
  {
    title: "Asociación de Cultivos: Las Tres Hermanas",
    description: "Una técnica ancestral que combina maíz, frijol y calabaza para crear un sistema que se beneficia mutuamente.",
    url: "https://www.sembrar100.com/guias-de-siembra/las-tres-hermanas/",
    category: "Artículo"
  },
  {
    title: "El Impacto de La Niña y El Niño en la Agricultura",
    description: "Entender el fenómeno ENOS es clave para la planificación agrícola en Colombia. Un análisis de la FAO.",
    url: "https://www.fao.org/colombia/noticias/detail-events/es/c/1672322/",
    category: "Artículo"
  },
  {
    title: "Manejo Integrado de Plagas: ¿Qué es?",
    description: "El manejo de plagas no depende de una sola técnica, sino de la combinación de varias estrategias (MIP). Aprende más aquí.",
    url: "https://espanol.epa.gov/manejo-integrado-de-plagas-mip/conceptos-basicos-del-manejo-integrado-de-plagas",
    category: "Artículo"
  },
  {
    title: "La importancia de la salud del suelo",
    description: "Un suelo sano es la base de alimentos nutritivos. Conozca el estado de los suelos en América Latina y el Caribe.",
    url: "https://www.fao.org/colombia/noticias/detail-events/es/c/1620025/",
    category: "Artículo"
  },
];


export default function RecursosPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Centro de Recursos</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Encuentra guías, herramientas y artículos para potenciar tus habilidades como agricultor.
        </p>
      </header>

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto mb-8">
          <TabsTrigger value="guides" className="py-2 flex items-center gap-2"><FileText className="h-4 w-4"/> Guías y Manuales</TabsTrigger>
          <TabsTrigger value="tools" className="py-2 flex items-center gap-2"><Wrench className="h-4 w-4"/> Herramientas y Comunidades</TabsTrigger>
          <TabsTrigger value="articles" className="py-2 flex items-center gap-2"><BookOpen className="h-4 w-4"/> Artículos de Interés</TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
            <ResourceGrid items={guides} />
        </TabsContent>

        <TabsContent value="tools">
            <ResourceGrid items={tools} />
        </TabsContent>
        
        <TabsContent value="articles">
            <ResourceGrid items={articles} />
        </TabsContent>
      </Tabs>

    </div>
  );
}

type ResourceItem = {
    title: string;
    description: string;
    url: string;
    category: string;
}

function ResourceGrid({ items }: { items: ResourceItem[] }) {
    const getIcon = (category: string) => {
        switch(category.toLowerCase()) {
            case 'guía':
            case 'manual':
            case 'artículo':
                return BookOpen;
            case 'app':
            case 'herramienta web':
            case 'mapa':
                return Wrench;
            case 'comunidad':
                return FileText; // Or another relevant icon
            default:
                return ExternalLink;
        }
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
               const Icon = getIcon(item.category);
               return (
                <Link key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    <Card className="flex flex-col h-full overflow-hidden group-hover:shadow-xl transition-shadow duration-300 bg-card">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                                <Icon className="h-8 w-8 text-primary"/>
                            </div>
                            <div>
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                                <CardDescription className="text-xs">{item.category}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <p className="text-muted-foreground text-sm">{item.description}</p>
                        </CardContent>
                    </Card>
                </Link>
               )
            })}
        </div>
    );
}
