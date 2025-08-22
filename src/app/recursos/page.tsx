
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
  },
  {
    title: "Guía Completa de Agricultura Urbana",
    description: "Aprende a montar y mantener tu propia huerta en espacios pequeños con este manual de agrocultiva.co.",
    url: "https://www.agrocultiva.co/blogs/noticias/guia-completa-de-agricultura-urbana-como-crear-y-mantener-tu-propia-huerta",
  },
  {
    title: "Manual de Buenas Prácticas Agrícolas (BPA)",
    description: "Documento oficial del ICA sobre los estándares para garantizar la calidad e inocuidad de los productos.",
    url: "https://www.ica.gov.co/getattachment/1b580a31-6b83-45a7-9306-7945e43e30e7/Publicacion-3.aspx",
  },
  {
    title: "El ABC del Riego: Cuándo y Cómo Regar",
    description: "Aprende a identificar las necesidades de agua de tus plantas y las mejores técnicas de riego (Blog 'El Huerto de Urbano').",
    url: "https://elhuertourbano.net/riego/",
  },
  {
    title: "Guía para la Preparación de Compost Casero",
    description: "Transforma tus desechos orgánicos en 'oro negro' para tus plantas con esta guía paso a paso de EcologíaVerde.",
    url: "https://www.ecologiaverde.com/como-hacer-compost-casero-1613.html",
  },
  {
    title: "Identificación y Manejo de Plagas Comunes",
    description: "Aprende a reconocer y combatir las plagas más frecuentes de la huerta con métodos orgánicos (InfoJardin).",
    url: "https://articulos.infojardin.com/huerto/plagas-del-huerto.htm",
  },
  {
    title: "La Poda: Un Mal Necesario y Beneficioso",
    description: "Guía ilustrada sobre por qué, cuándo y cómo podar diferentes tipos de plantas para mejorar su salud.",
    url: "https://www.jardineriaon.com/cuando-podar-las-plantas.html",
  },
  {
    title: "Biopreparados: Fertilizantes y Repelentes Caseros",
    description: "Recetas sencillas de La Huerta de Toni para crear tus propios insumos agrícolas a partir de materiales que tienes en casa.",
    url: "https://www.lahuertinadetoni.es/10-insecticidas-ecologicos-y-caseros-para-prevenir-y-combatir-plagas/",
  },
];

const tools = [
  {
    title: "Plantix - Tu doctor para las plantas",
    description: "Una aplicación móvil que te ayuda a identificar plagas y enfermedades subiendo una foto.",
    url: "https://plantix.net/es/",
  },
  {
    title: "Calculadora de Fertilizantes Yara",
    description: "Herramienta online para calcular las necesidades de nutrientes de tus cultivos.",
    url: "https://www.yaracolombia.com/recomendaciones-nutricionales/herramientas-y-servicios-digitales/calculadoras-de-conversion/",
  },
  {
    title: "Mapa de Suelos de Colombia - AGROSAVIA",
    description: "Consulta los mapas detallados de suelos de Colombia para entender mejor tu tierra.",
    url: "https://www.agrosavia.co/investigacion-y-desarrollo/mapas-de-suelos",
  },
  {
    title: "Canal de YouTube: La Huerta de Toni",
    description: "Uno de los canales más populares en español sobre huertos urbanos, permacultura y técnicas de cultivo ecológico.",
    url: "https://www.youtube.com/@LaHuertadeToni",
  },
  {
    title: "PictureThis (App)",
    description: "Identifica miles de plantas, flores y árboles al instante con solo tomar una foto. Incluye diagnósticos.",
    url: "https://www.picturethisai.com/es",
  },
  {
    title: "IDEAM - Pronóstico del Tiempo",
    description: "Consulta los pronósticos meteorológicos oficiales para Colombia, crucial para la planificación agrícola.",
    url: "http://www.ideam.gov.co/web/tiempo-y-clima",
  },
  {
    title: "Red de Información del Sector Agropecuario (Agronet)",
    description: "Plataforma del Ministerio de Agricultura de Colombia con estadísticas, precios y noticias del sector.",
    url: "https://www.agronet.gov.co/",
  },
  {
    title: "Foro de InfoJardín",
    description: "Una de las comunidades de jardinería y agricultura más grandes en español para resolver dudas.",
    url: "https://foro.infojardin.com/",
  },
];

const articles = [
  {
    title: "5 Claves para un Riego Eficiente",
    description: "El riego es fundamental, pero hacerlo de forma eficiente ahorra agua y previene enfermedades. Aprende 5 claves.",
    url: "https://www.jardineriaon.com/consejos-para-un-riego-eficiente.html",
  },
  {
    title: "Principios Básicos del Compostaje Casero",
    description: "Compostar es reciclar materia orgánica para crear un abono rico en nutrientes. Conoce los principios básicos.",
    url: "https://www.eldiario.es/consumoclaro/hazlo-tu-mismo/ocho-claves-compost-casero-funcione-huerto-urbano_1_1656829.html",
  },
  {
    title: "Asociación de Cultivos: Las Tres Hermanas",
    description: "Una técnica ancestral que combina maíz, frijol y calabaza para crear un sistema que se beneficia mutuamente.",
    url: "https://www.sembrar100.com/guias-de-siembra/las-tres-hermanas/",
  },
  {
    title: "El Impacto de La Niña y El Niño en la Agricultura",
    description: "Entender el fenómeno ENOS es clave para la planificación agrícola en Colombia. Un análisis de la FAO.",
    url: "https://www.fao.org/colombia/noticias/detail-events/es/c/1672322/",
  },
  {
    title: "Manejo Integrado de Plagas: ¿Qué es?",
    description: "El manejo de plagas no depende de una sola técnica, sino de la combinación de varias estrategias (MIP). Aprende más aquí.",
    url: "https://espanol.epa.gov/manejo-integrado-de-plagas-mip/conceptos-basicos-del-manejo-integrado-de-plagas",
  },
  {
    title: "La importancia de la salud del suelo",
    description: "Un suelo sano es la base de alimentos nutritivos. Conozca el estado de los suelos en América Latina y el Caribe.",
    url: "https://www.fao.org/colombia/noticias/detail-events/es/c/1620025/",
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
            <ResourceGrid items={guides} icon={FileText} />
        </TabsContent>

        <TabsContent value="tools">
            <ResourceGrid items={tools} icon={Wrench} />
        </TabsContent>
        
        <TabsContent value="articles">
            <ResourceGrid items={articles} icon={BookOpen} />
        </TabsContent>
      </Tabs>

    </div>
  );
}

type ResourceItem = {
    title: string;
    description: string;
    url: string;
}

function ResourceGrid({ items, icon: Icon }: { items: ResourceItem[], icon: React.ElementType }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
            <Card key={index} className="flex flex-col sm:flex-row items-center p-4 gap-4">
                <div className="flex-shrink-0">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-8 w-8 text-primary"/>
                    </div>
                </div>
                <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
                <div className="flex-shrink-0 mt-4 sm:mt-0">
                    <Button asChild>
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4"/>
                            Visitar
                        </Link>
                    </Button>
                </div>
            </Card>
            ))}
        </div>
    );
}
