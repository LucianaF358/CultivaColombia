
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Video, FileText, Wrench, BookOpen, ExternalLink, Download } from 'lucide-react';

const videos = [
  {
    title: "Agricultura Sostenible en Colombia",
    description: "Un documental que explora prácticas agrícolas respetuosas con el medio ambiente en diferentes regiones del país.",
    videoId: "watch?v=R8eK5tO_18s",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "sustainable agriculture"
  },
  {
    title: "Cómo Hacer Compost Casero Fácilmente",
    description: "Aprende paso a paso a crear tu propio abono orgánico para enriquecer la tierra de tus cultivos.",
    videoId: "watch?v=I5efI420-tY",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "compost pile"
  },
  {
    title: "Control de Plagas Orgánico",
    description: "Descubre métodos naturales y efectivos para proteger tus plantas sin usar químicos dañinos.",
    videoId: "watch?v=z-Si8I1d2oA",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "organic pest"
  },
  {
    title: "Cómo iniciar una huerta en casa desde cero",
    description: "Guía completa para principiantes sobre cómo planificar y empezar tu propia huerta en casa, sin importar el espacio.",
    videoId: "watch?v=zHn3kfg3fsI",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "urban garden"
  },
  {
    title: "Agricultura Regenerativa: El Futuro del Planeta",
    description: "Explora los principios de la agricultura regenerativa, que busca restaurar la salud del suelo y la biodiversidad.",
    videoId: "watch?v=gSAbmJkZ2yI",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "regenerative agriculture"
  },
  {
    title: "Cómo Hacer un Sistema de RIEGO por GOTEO Casero",
    description: "Un tutorial práctico para construir un sistema de riego por goteo eficiente y de bajo costo para tu huerto.",
    videoId: "watch?v=D-EV-v3y-Y4",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "drip irrigation"
  },
  {
    title: "Elaboración de BIOFERTILIZANTE líquido casero",
    description: "Aprende a preparar un abono líquido orgánico para nutrir tus plantas y mejorar la vida del suelo.",
    videoId: "watch?v=2pUj-2kG3A0",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "organic fertilizer"
  },
  {
    title: "El Cultivo del Café en Colombia",
    description: "Documental sobre el proceso del cultivo de café de especialidad en las montañas de Colombia.",
    videoId: "watch?v=LqB4jF6I-wY",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "coffee plantation"
  },
  {
    title: "Lombricultura casera: Cómo empezar",
    description: "Guía de iniciación a la lombricultura para producir uno de los mejores abonos orgánicos: el humus de lombriz.",
    videoId: "watch?v=O1OqRkS-A-w",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "worm composting"
  },
  {
    title: "Cómo Sembrar y Cultivar Aguacate Hass",
    description: "Consejos y técnicas para el cultivo exitoso del aguacate Hass, un cultivo de gran importancia en Colombia.",
    videoId: "watch?v=x7KkFwK6jdw",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "avocado tree"
  },
  {
    title: "Asociación de Cultivos en la Huerta",
    description: "Aprende a combinar plantas para beneficiarse mutuamente, repeler plagas y optimizar el espacio en tu huerto.",
    videoId: "watch?v=n2oVv04lfbA",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "companion planting"
  },
  {
    title: "Secretos del Cultivo de Cacao Fino",
    description: "Descubre el manejo agronómico del cacao para obtener un producto de alta calidad, desde la siembra hasta la cosecha.",
    videoId: "watch?v=hB2Xb-K3IqI",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "cacao farm"
  },
  {
    title: "Cómo mejorar la salud de tu suelo",
    description: "Principios clave para entender y mejorar la estructura, fertilidad y biología del suelo de tu finca o jardín.",
    videoId: "watch?v=g6t41RN2gGY",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "healthy soil"
  },
  {
    title: "10 Plantas que Repelen Plagas en tu Huerta",
    description: "Conoce qué plantas aromáticas y flores puedes sembrar para mantener a los insectos indeseados lejos de tus cultivos.",
    videoId: "watch?v=D-EV-v3y-Y4",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "marigold flowers"
  },
  {
    title: "Reproducción de plantas por esquejes",
    description: "Aprende la técnica de multiplicación de plantas a través de esquejes o estacas, una forma fácil y rápida.",
    videoId: "watch?v=n43U2n-jG68",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plant cuttings"
  },
  {
    title: "Cultivo de la Papa: Guía Completa",
    description: "Un recorrido completo por el cultivo de la papa en los Andes, desde la preparación del terreno hasta la cosecha.",
    videoId: "watch?v=sW-iMasj44Y",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "potato farming"
  },
  {
    title: "Cómo Podar Árboles Frutales Correctamente",
    description: "Técnicas de poda de formación y mantenimiento para asegurar una buena producción y salud en tus árboles frutales.",
    videoId: "watch?v=xI5mmy0T_a8",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "pruning tree"
  },
  {
    title: "Qué es la Permacultura",
    description: "Introducción a los principios y la ética de la permacultura, un sistema de diseño basado en los ecosistemas naturales.",
    videoId: "watch?v=yEpt5s0A9gU",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "permaculture design"
  },
  {
    title: "Bancos de Semillas Comunitarios",
    description: "La importancia de los bancos de semillas locales para la conservación de la agrobiodiversidad y la soberanía alimentaria.",
    videoId: "watch?v=T_sC5ZDG3yA",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "seed bank"
  },
  {
    title: "Abono Orgánico Bocashi: Cómo Prepararlo",
    description: "Tutorial paso a paso para preparar abono fermentado tipo Bocashi, rico en nutrientes y microorganismos.",
    videoId: "watch?v=wMh-k-j1kQQ",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "organic compost"
  },
  {
    title: "Cultivo de Maíz: Tradición y Futuro",
    description: "Explora las técnicas de cultivo del maíz, un pilar de la alimentación en América Latina, desde la siembra hasta la cosecha.",
    videoId: "watch?v=2T3XqD-4-ss",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "corn cultivation"
  }
];

const documents = [
  {
    title: "Calendario de Siembra para Colombia",
    description: "Una guía completa en PDF con las mejores épocas para sembrar diferentes cultivos según la región.",
    url: "/docs/calendario-siembra.pdf", // Placeholder URL
  },
  {
    title: "Guía de Agricultura Urbana y en Patios",
    description: "Aprende a montar tu propia huerta en espacios pequeños. Ideal para principiantes.",
    url: "/docs/guia-agricultura-urbana.pdf", // Placeholder URL
  },
    {
    title: "Manual de Buenas Prácticas Agrícolas (BPA)",
    description: "Documento del ICA sobre los estándares para garantizar la calidad e inocuidad de los productos.",
    url: "https://www.ica.gov.co/getattachment/1b580a31-6b83-45a7-9306-7945e43e30e7/Publicacion-3.aspx", 
    isExternal: true,
  },
];

const tools = [
  {
    title: "Identificador de Plagas (App)",
    description: "Una aplicación móvil que te ayuda a identificar plagas y enfermedades subiendo una foto.",
    url: "https://plantix.net/es/",
  },
  {
    title: "Calculadora de Fertilizantes",
    description: "Herramienta online para calcular las necesidades de nutrientes de tus cultivos.",
    url: "https://www.yaracolombia.com/recomendaciones-nutricionales/herramientas-y-servicios-digitales/calculadoras-de-conversion/",
  },
  {
    title: "Mapa de Suelos de Colombia - AGROSAVIA",
    description: "Consulta los mapas detallados de suelos de Colombia para entender mejor tu tierra.",
    url: "https://www.agrosavia.co/investigacion-y-desarrollo/mapas-de-suelos",
  },
];

const articles = [
  {
    title: "5 Claves para un Riego Eficiente",
    content: [
        "El riego es fundamental, pero hacerlo de forma eficiente ahorra agua y previene enfermedades. Aquí tienes 5 claves:",
        "<strong>1. Riega al amanecer o atardecer:</strong> Evita las horas de máximo sol para reducir la evaporación. El mejor momento es temprano en la mañana.",
        "<strong>2. Riega la base, no las hojas:</strong> Mojar las hojas puede fomentar la aparición de hongos. Dirige el agua directamente a la tierra, sobre las raíces.",
        "<strong>3. Conoce tu suelo:</strong> Los suelos arenosos necesitan riegos más frecuentes y cortos, mientras que los arcillosos retienen más agua y requieren riegos más espaciados y profundos.",
        "<strong>4. Usa acolchado (mulch):</strong> Una capa de materia orgánica (hojas secas, paja) sobre el suelo ayuda a mantener la humedad, reduce la aparición de malas hierbas y regula la temperatura.",
        "<strong>5. Observa tus plantas:</strong> Son el mejor indicador. Aprende a reconocer los signos de sed (hojas marchitas) y de exceso de agua (hojas amarillentas y suelo encharcado)."
    ],
  },
  {
    title: "Principios Básicos del Compostaje Casero",
    content: [
        "Compostar es reciclar materia orgánica para crear un abono rico en nutrientes. Sigue estos principios:",
        "<strong>1. El equilibrio es la clave (Verde y Marrón):</strong> Necesitas una mezcla equilibrada de materiales 'verdes' (ricos en nitrógeno) y 'marrones' (ricos en carbono).",
        "   - <strong>Verdes:</strong> Restos de frutas y verduras, posos de café, césped recién cortado.",
        "   - <strong>Marrones:</strong> Hojas secas, ramas pequeñas, cartón sin tinta, serrín.",
        "<strong>2. Mantén la humedad adecuada:</strong> La pila de compost debe estar húmeda como una esponja escurrida. Ni seca ni encharcada.",
        "<strong>3. La aireación es vital:</strong> Remueve la pila de compost cada una o dos semanas para oxigenarla. Esto acelera el proceso y evita malos olores.",
        "<strong>4. ¿Qué no compostar?:</strong> Evita carnes, lácteos, grasas, aceites y excrementos de mascotas, ya que pueden atraer plagas y generar olores desagradables.",
        "<strong>5. Paciencia:</strong> El compost estará listo en unos 3 a 6 meses, cuando tenga un color oscuro, textura terrosa y un olor a tierra de bosque."
    ],
  }
];


export default function RecursosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Centro de Recursos</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Encuentra videos, guías, herramientas y artículos para potenciar tus habilidades como agricultor.
        </p>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-8">
          <TabsTrigger value="videos" className="py-2 flex items-center gap-2"><Video className="h-4 w-4"/> Videos</TabsTrigger>
          <TabsTrigger value="guides" className="py-2 flex items-center gap-2"><FileText className="h-4 w-4"/> Guías</TabsTrigger>
          <TabsTrigger value="tools" className="py-2 flex items-center gap-2"><Wrench className="h-4 w-4"/> Herramientas</TabsTrigger>
          <TabsTrigger value="articles" className="py-2 flex items-center gap-2"><BookOpen className="h-4 w-4"/> Artículos</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <CardHeader>
                  <div className="relative aspect-video">
                    <Image 
                      src={video.thumbnailUrl}
                      alt={`Miniatura del video ${video.title}`}
                      fill
                      className="object-cover rounded-md"
                      data-ai-hint={video.dataAiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{video.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`https://www.youtube.com/${video.videoId}`} target="_blank" rel="noopener noreferrer">
                      <Video className="mr-2 h-4 w-4" /> Ver en YouTube
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc, index) => (
                <Card key={index} className="flex flex-col sm:flex-row items-center p-4 gap-4">
                    <div className="flex-shrink-0">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="h-8 w-8 text-primary"/>
                        </div>
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <h3 className="font-semibold text-lg">{doc.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{doc.description}</p>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0">
                         <Button asChild>
                            <Link href={doc.url} target="_blank" rel="noopener noreferrer">
                                {doc.isExternal ? <ExternalLink className="mr-2 h-4 w-4"/> : <Download className="mr-2 h-4 w-4" />}
                                {doc.isExternal ? 'Visitar' : 'Descargar'}
                            </Link>
                        </Button>
                    </div>
                </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool, index) => (
                <Card key={index} className="flex flex-col sm:flex-row items-center p-4 gap-4">
                     <div className="flex-shrink-0">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Wrench className="h-8 w-8 text-primary"/>
                        </div>
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <h3 className="font-semibold text-lg">{tool.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{tool.description}</p>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0">
                         <Button asChild>
                            <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visitar Herramienta
                            </Link>
                        </Button>
                    </div>
                </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="articles">
            <div className="space-y-8 max-w-4xl mx-auto">
                {articles.map((article, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {article.content.map((paragraph, pIndex) => (
                                <p 
                                key={pIndex}
                                className="text-foreground/90"
                                dangerouslySetInnerHTML={{ __html: paragraph }}
                                />
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
