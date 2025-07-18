
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Video, FileText, Wrench, BookOpen, ExternalLink, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const videos = [
  {
    title: "¿Qué es la Fotosíntesis? Explicación Sencilla",
    description: "Aprende cómo las plantas convierten la luz solar en su alimento. El proceso fundamental para la vida en la Tierra.",
    videoId: "watch?v=vBGGV6p_mK4",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "photosynthesis diagram"
  },
  {
    title: "Las Partes de una Planta y sus Funciones",
    description: "Un recorrido completo por la raíz, tallo, hojas, flores y frutos. Entiende para qué sirve cada parte.",
    videoId: "watch?v=wB32o_ifQ3M",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plant parts"
  },
  {
    title: "El Ciclo de Vida de una Planta: de Semilla a Semilla",
    description: "Observa el increíble viaje de una planta desde la germinación hasta que produce sus propias semillas.",
    videoId: "watch?v=FJy3eH-tD3s",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plant lifecycle"
  },
  {
    title: "Polinización: El Secreto de las Flores y Frutos",
    description: "Descubre cómo viaja el polen y por qué es crucial para que las plantas produzcan frutos y semillas. Conoce a los polinizadores.",
    videoId: "watch?v=yl3e2A2TdaA",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "bee pollination"
  },
  {
    title: "La Respiración en las Plantas: ¿Cómo Respiran?",
    description: "Las plantas también respiran. Aprende sobre el intercambio de gases y cómo obtienen energía durante la noche.",
    videoId: "watch?v=hB-p7331v4w",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "plant stomata"
  },
  {
    title: "Cómo Germinar una Semilla: Paso a Paso",
    description: "Guía práctica para entender el proceso de germinación y cómo darle a tus semillas el mejor comienzo posible.",
    videoId: "watch?v=J8t2dZc3g9s",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "seed germination"
  },
];

const documents = [
  {
    title: "Calendario de Siembra para Colombia",
    description: "Una guía completa en PDF con las mejores épocas para sembrar diferentes cultivos según la región.",
    url: "/docs/calendario-siembra.pdf",
  },
  {
    title: "Guía de Agricultura Urbana y en Patios",
    description: "Aprende a montar tu propia huerta en espacios pequeños. Ideal para principiantes.",
    url: "/docs/guia-agricultura-urbana.pdf",
  },
  {
    title: "Manual de Buenas Prácticas Agrícolas (BPA)",
    description: "Documento del ICA sobre los estándares para garantizar la calidad e inocuidad de los productos.",
    url: "https://www.ica.gov.co/getattachment/1b580a31-6b83-45a7-9306-7945e43e30e7/Publicacion-3.aspx", 
    isExternal: true,
  },
  {
    title: "El Arte de Germinar Semillas",
    description: "Técnicas y secretos para despertar tus semillas y asegurar un comienzo exitoso para tus plantas.",
    url: "/docs/guia-germinacion-semillas.pdf",
  },
  {
    title: "Primeros Pasos para tu Huerta",
    description: "Una guía esencial para planificar, diseñar y preparar el terreno para tu primera huerta casera.",
    url: "/docs/guia-iniciar-huerta.pdf",
  },
  {
    title: "El ABC del Riego: Cuándo y Cómo Regar",
    description: "Aprende a identificar las necesidades de agua de tus plantas y las mejores técnicas de riego.",
    url: "/docs/guia-riego-eficiente.pdf",
  },
  {
    title: "Nutrición Vegetal para Principiantes",
    description: "Entiende los nutrientes que tus plantas necesitan y cómo proporcionárselos de forma natural.",
    url: "/docs/guia-nutricion-vegetal.pdf",
  },
  {
    title: "Guía para la Preparación de Compost Casero",
    description: "Transforma tus desechos orgánicos en oro negro para tus plantas con esta guía paso a paso.",
    url: "/docs/guia-compostaje-casero.pdf",
  },
  {
    title: "Identificación y Manejo de Plagas Comunes",
    description: "Aprende a reconocer y combatir las plagas más frecuentes de la huerta con métodos orgánicos.",
    url: "/docs/guia-manejo-plagas.pdf",
  },
  {
    title: "Plantas que Curan el Suelo: Abonos Verdes",
    description: "Descubre cómo ciertas plantas pueden mejorar la fertilidad y estructura de tu suelo de forma natural.",
    url: "/docs/guia-abonos-verdes.pdf",
  },
  {
    title: "Cosecha y Almacenamiento de Hortalizas",
    description: "Maximiza la frescura y durabilidad de tus cosechas con las técnicas adecuadas de recolección y guardado.",
    url: "/docs/guia-cosecha-almacenamiento.pdf",
  },
  {
    title: "La Poda: Un Mal Necesario y Beneficioso",
    description: "Guía ilustrada sobre por qué, cuándo y cómo podar diferentes tipos de plantas para mejorar su salud.",
    url: "/docs/guia-poda-basica.pdf",
  },
  {
    title: "Mitos y Verdades de la Agricultura",
    description: "Separamos la ficción de la realidad en el mundo de la jardinería y la agricultura. ¡Te sorprenderás!",
    url: "/docs/guia-mitos-agricultura.pdf",
  },
  {
    title: "Guía para la Recolección de Semillas",
    description: "Aprende a guardar las semillas de tus mejores plantas para la próxima temporada y crear tu propio banco.",
    url: "/docs/guia-recoleccion-semillas.pdf",
  },
  {
    title: "15 Datos Curiosos sobre las Plantas",
    description: "Una colección de hechos fascinantes sobre el reino vegetal que cambiará tu forma de ver las plantas.",
    url: "/docs/guia-datos-curiosos-plantas.pdf",
  },
  {
    title: "Salud del Suelo: Más Allá del NPK",
    description: "Profundiza en la importancia de la materia orgánica, los microorganismos y la estructura del suelo.",
    url: "/docs/guia-salud-del-suelo.pdf",
  },
  {
    title: "Cómo Atraer Polinizadores a tu Huerta",
    description: "Descubre qué flores y prácticas puedes implementar para invitar a abejas y mariposas a tu jardín.",
    url: "/docs/guia-atraer-polinizadores.pdf",
  },
  {
    title: "Agricultura en Macetas: Cultiva en Cualquier Espacio",
    description: "Guía completa para tener una huerta productiva en balcones, terrazas y patios pequeños.",
    url: "/docs/guia-agricultura-macetas.pdf",
  },
  {
    title: "Entendiendo el Lenguaje de las Plantas",
    description: "Aprende a interpretar las señales que te dan tus plantas: hojas amarillas, marchitas o con manchas.",
    url: "/docs/guia-lenguaje-plantas.pdf",
  },
  {
    title: "Biopreparados: Fertilizantes y Repelentes Caseros",
    description: "Recetas sencillas para crear tus propios insumos agrícolas a partir de materiales que tienes en casa.",
    url: "/docs/guia-biopreparados-caseros.pdf",
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
  {
    title: "Canal de YouTube: La Huerta de Toni",
    description: "Uno de los canales más populares en español sobre huertos urbanos, permacultura y técnicas de cultivo ecológico.",
    url: "https://www.youtube.com/@LaHuertadeToni",
  },
  {
    title: "Canal de YouTube: Agro-Cultura.co",
    description: "Canal colombiano enfocado en la agricultura sostenible, con reportajes y guías sobre cultivos locales.",
    url: "https://www.youtube.com/@agro-cultura",
  },
  {
    title: "PictureThis (App)",
    description: "Identifica miles de plantas, flores y árboles al instante con solo tomar una foto. Incluye diagnósticos.",
    url: "https://www.picturethisai.com/es",
  },
  {
    title: "Planificador de Huertos Online",
    description: "Herramienta web para diseñar y planificar la distribución de tu huerto, optimizando espacio y asociaciones.",
    url: "https://www.growveg.com/garden-planner-intro.aspx",
  },
  {
    title: "Portal de la FAO en español",
    description: "Accede a noticias, publicaciones y datos de la Organización de las Naciones Unidas para la Alimentación y la Agricultura.",
    url: "https://www.fao.org/home/es",
  },
  {
    title: "Infoagro - Portal Agrícola",
    description: "Un completo portal con artículos técnicos, noticias de mercado y foros sobre todo tipo de cultivos.",
    url: "https://www.infoagro.com/",
  },
  {
    title: "Calendario Lunar para Siembra",
    description: "Consulta las fases de la luna para planificar tus siembras y cosechas según los principios de la agricultura biodinámica.",
    url: "https://www.calendariolunar.es/huerto/",
  },
  {
    title: "Red de Información y Comunicación del Sector Agropecuario (Agronet)",
    description: "Plataforma del Ministerio de Agricultura de Colombia con estadísticas, precios y noticias del sector.",
    url: "https://www.agronet.gov.co/",
  },
  {
    title: "Calculadora de Asociaciones de Cultivos",
    description: "Descubre qué plantas se benefician mutuamente al crecer juntas (alelopatía) y cuáles deben evitarse.",
    url: "https://www.lahuertinadetoni.es/tabla-de-asociaciones-de-cultivos-y-compatibilidades/",
  },
  {
    title: "Agroecología en Corto (Podcast)",
    description: "Podcast que explora temas de agroecología, soberanía alimentaria y experiencias de agricultores.",
    url: "https://open.spotify.com/show/5rX3X4Y5Z6Z0j6f6e0c0j4",
  },
  {
    title: "Foro de InfoJardín",
    description: "Una de las comunidades de jardinería y agricultura más grandes en español para resolver dudas.",
    url: "https://foro.infojardin.com/",
  },
  {
    title: "IDEAM - Pronóstico del Tiempo",
    description: "Consulta los pronósticos meteorológicos oficiales para Colombia, crucial para la planificación agrícola.",
    url: "http://www.ideam.gov.co/web/tiempo-y-clima",
  },
  {
    title: "Calculadora de Espaciado de Plantas",
    description: "Calcula cuántas plantas puedes sembrar en un área determinada según el marco de plantación recomendado.",
    url: "https://www.omnicalculator.com/other/plant-spacing",
  },
  {
    title: "Blog: Cosechando Ideas",
    description: "Un blog con guías detalladas, tutoriales de bricolaje para el huerto y recetas con productos de temporada.",
    url: "https://www.pinterest.com/ideas/huerto-en-casa/914381831841/",
  },
  {
    title: "Cursos Online de Permacultura",
    description: "Plataforma con cursos para aprender a diseñar sistemas agrícolas sostenibles y resilientes.",
    url: "https://www.permacultura.org/cursos.html",
  },
  {
    title: "Twitch: Agricultor en Directo",
    description: "Canales de agricultores que transmiten en vivo sus labores diarias, mostrando técnicas y resolviendo dudas en tiempo real.",
    url: "https://www.twitch.tv/directory/game/Farming%20Simulator%2022",
  },
];

type Article = {
  id: number;
  title: string;
  content: string[];
};

const articles: Article[] = [
  {
    id: 1,
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
    id: 2,
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
  },
  {
    id: 3,
    title: "Asociación de Cultivos Tradicional en Colombia",
    content: [
        "La 'milpa' o la siembra de las 'Tres Hermanas' es una técnica ancestral que combina maíz, frijol y ahuyama (o calabaza) en un mismo espacio, creando un sistema que se beneficia mutuamente.",
        "<strong>1. Maíz, el soporte:</strong> El tallo del maíz sirve como un tutor natural para que el frijol pueda enredarse y trepar en busca de luz.",
        "<strong>2. Frijol, el fertilizante:</strong> El frijol, como todas las leguminosas, tiene la capacidad de fijar nitrógeno atmosférico en el suelo, un nutriente esencial que el maíz consume en grandes cantidades.",
        "<strong>3. Ahuyama, la protectora:</strong> Las grandes hojas de la ahuyama cubren el suelo, manteniendo la humedad, evitando el crecimiento de malezas y creando un microclima favorable para las otras dos plantas.",
        "<strong>Beneficios:</strong> Esta asociación no solo optimiza el espacio y los recursos, sino que también mejora la salud del suelo y proporciona una dieta balanceada: carbohidratos (maíz), proteínas (frijol) y vitaminas (ahuyama)."
    ],
  },
  {
    id: 4,
    title: "El Impacto de La Niña y El Niño en la Agricultura Colombiana",
    content: [
        "Colombia, por su ubicación tropical, es altamente vulnerable al Fenómeno El Niño-Oscilación del Sur (ENOS). Entender su impacto es clave para la planificación agrícola.",
        "<strong>Fenómeno de El Niño:</strong> Se caracteriza por un calentamiento de las aguas del Océano Pacífico, lo que generalmente se traduce en <strong>déficit de lluvias y sequías</strong> en gran parte del país, especialmente en las regiones Andina y Caribe. Afecta negativamente a cultivos como el café, el arroz y la papa, y disminuye los caudales de los ríos para riego.",
        "<strong>Fenómeno de La Niña:</strong> Es el evento opuesto, con un enfriamiento de las aguas del Pacífico que provoca un <strong>aumento de las lluvias</strong>, inundaciones y deslizamientos de tierra. Esto puede causar pérdidas de cosechas por exceso de humedad, proliferación de enfermedades fúngicas y daños en la infraestructura vial.",
        "<strong>Adaptación:</strong> Los agricultores deben prepararse implementando sistemas de riego eficientes para El Niño, y mejorando el drenaje de los terrenos y usando variedades resistentes a hongos para La Niña. Estar atento a los pronósticos del IDEAM es fundamental."
    ],
  },
  {
    id: 5,
    title: "Manejo Integrado de la Broca del Café",
    content: [
        "La broca del café (Hypothenemus hampei) es la plaga más devastadora para el café en Colombia y el mundo. Un manejo efectivo no depende de una sola técnica, sino de la combinación de varias estrategias (Manejo Integrado de Plagas - MIP).",
        "<strong>1. Control Cultural (Re-Re):</strong> La práctica más importante es la recolección rigurosa y frecuente de todos los frutos maduros, sobremaduros y secos que quedan en el árbol y en el suelo después de la cosecha. Esto elimina el principal sitio de reproducción de la broca.",
        "<strong>2. Control Biológico:</strong> Consiste en la liberación de avispas parasitoides (como Cephalonomia stephanoderis) que atacan a la broca dentro del grano. También se pueden usar hongos entomopatógenos como Beauveria bassiana para infectar y matar al insecto.",
        "<strong>3. Trampeo:</strong> Se utilizan trampas con atrayentes (una mezcla de alcoholes) para capturar las hembras de la broca que vuelan en busca de nuevos frutos para infestar. Esto ayuda a monitorear y reducir la población.",
        "<strong>4. Control Químico (Último Recurso):</strong> Solo se debe recurrir a insecticidas de baja toxicidad y de forma muy localizada cuando los niveles de infestación son muy altos (superiores al 2%) y las otras medidas no han sido suficientes."
    ],
  }
];


export default function RecursosPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Centro de Recursos</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Encuentra videos, guías, herramientas y artículos para potenciar tus habilidades como agricultor.
        </p>
      </header>

      <Dialog>
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
                              <Link href={doc.url} target={doc.isExternal ? '_blank' : '_self'} rel={doc.isExternal ? 'noopener noreferrer' : ''}>
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
            <div className="space-y-6 max-w-4xl mx-auto">
              {articles.map((article) => (
                <Card key={article.id} className="flex flex-col sm:flex-row items-center justify-between p-6">
                  <CardHeader className="p-0 flex-grow">
                    <CardTitle className="text-xl font-headline text-primary">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedArticle(article)}>Leer Artículo</Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedArticle && (
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-headline text-primary mb-4">{selectedArticle.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 prose dark:prose-invert max-w-none">
              {selectedArticle.content.map((paragraph, pIndex) => (
                <p 
                  key={pIndex}
                  className="text-foreground/90"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
