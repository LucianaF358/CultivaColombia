import type { Crop } from '@/types';

const crops: Crop[] = [
  { 
    id: '1', 
    nombre: 'Maíz',
    nombreCientifico: 'Zea mays',
    familia: 'Poaceae',
    region: 'Andina', 
    clima: 'Templado', 
    descripcionDetallada: 'El maíz es uno de los cereales más cultivados del mundo. Requiere riego moderado, pleno sol y es bastante adaptable a diferentes condiciones. Es fundamental para la alimentación en Colombia.',
    temporada: 'Marzo - Mayo',
    tipoDeSuelo: 'Franco, rico en materia orgánica y con buen drenaje.',
    tiempoSiembra: '1-2 semanas para germinar.',
    tiempoCosecha: '3-4 meses desde la siembra.',
    plagasComunes: 'Gusano cogollero, araña roja.',
    imageUrl: 'https://images.pexels.com/photos/13168947/pexels-photo-13168947.jpeg', 
    dataAiHint: 'corn field'
  },
  { 
    id: '2', 
    nombre: 'Papa',
    nombreCientifico: 'Solanum tuberosum',
    familia: 'Solanaceae',
    region: 'Andina', 
    clima: 'Frío', 
    descripcionDetallada: 'La papa es un tubérculo fundamental en la dieta andina. Prefiere suelos bien drenados y sueltos. Es sensible a las heladas, por lo que se debe proteger en climas muy fríos.',
    temporada: 'Todo el año',
    tipoDeSuelo: 'Franco arenoso, rico en potasio.',
    tiempoSiembra: '3-4 semanas para brotar.',
    tiempoCosecha: '3-5 meses, dependiendo de la variedad.',
    plagasComunes: 'Gota (Phytophthora infestans), polilla guatemalteca.',
    imageUrl: 'https://images.pexels.com/photos/14899351/pexels-photo-14899351.jpeg', 
    dataAiHint: 'potato farm'
  },
  { 
    id: '3', 
    nombre: 'Café', 
    nombreCientifico: 'Coffea arabica',
    familia: 'Rubiaceae',
    region: 'Andina', 
    clima: 'Templado', 
    descripcionDetallada: 'El café colombiano es mundialmente famoso. Crece mejor en laderas de montañas con sombra parcial. Requiere alta humedad y suelos de origen volcánico ricos en nutrientes.',
    temporada: 'Septiembre - Diciembre',
    tipoDeSuelo: 'Volcánico, profundo y con buen drenaje.',
    tiempoSiembra: '6-12 meses en vivero antes de trasplantar.',
    tiempoCosecha: '3-4 años para la primera cosecha significativa.',
    plagasComunes: 'Broca del café, roya.',
    imageUrl: 'https://images.pexels.com/photos/1578332/pexels-photo-1578332.jpeg',
    dataAiHint: 'coffee plant'
  },
  { 
    id: '4', 
    nombre: 'Plátano',
    nombreCientifico: 'Musa paradisiaca',
    familia: 'Musaceae',
    region: 'Caribe', 
    clima: 'Cálido', 
    descripcionDetallada: 'El plátano es una base de la alimentación en las zonas cálidas. Necesita mucho sol, agua constante y suelos muy ricos en materia orgánica para prosperar.',
    temporada: 'Todo el año',
    tipoDeSuelo: 'Franco, profundo y rico en materia orgánica.',
    tiempoSiembra: 'Se propaga por cormos o hijuelos.',
    tiempoCosecha: '9-12 meses después de la siembra.',
    plagasComunes: 'Picudo negro, Sigatoka negra.',
    imageUrl: 'https://images.pexels.com/photos/2253634/pexels-photo-2253634.jpeg',
    dataAiHint: 'banana tree'
  },
  { 
    id: '5', 
    nombre: 'Yuca',
    nombreCientifico: 'Manihot esculenta',
    familia: 'Euphorbiaceae',
    region: 'Caribe', 
    clima: 'Cálido', 
    descripcionDetallada: 'La yuca es un arbusto perenne muy tolerante a la sequía y a suelos pobres. Requiere pleno sol y no necesita cuidados intensivos. Es una fuente importante de carbohidratos.',
    temporada: 'Todo el año',
    tipoDeSuelo: 'Arenoso y bien drenado. Tolera suelos pobres.',
    tiempoSiembra: 'Se propaga por estacas del tallo.',
    tiempoCosecha: '8-12 meses.',
    plagasComunes: 'Ácaros, mosca blanca.',
    imageUrl: 'https://images.pexels.com/photos/8994347/pexels-photo-8994347.jpeg',
    dataAiHint: 'cassava plant'
  },
  { 
    id: '6', 
    nombre: 'Cacao',
    nombreCientifico: 'Theobroma cacao',
    familia: 'Malvaceae',
    region: 'Pacífica', 
    clima: 'Húmedo', 
    descripcionDetallada: 'El cacao crece en el sotobosque de selvas húmedas. Necesita sombra, especialmente en sus primeras etapas, protección del viento y suelos profundos y bien drenados.',
    temporada: 'Abril - Junio',
    tipoDeSuelo: 'Franco arcilloso, rico en materia orgánica.',
    tiempoSiembra: '4-6 meses en vivero.',
    tiempoCosecha: '3-5 años para la primera cosecha.',
    plagasComunes: 'Monilia, escoba de bruja.',
    imageUrl: 'https://images.pexels.com/photos/5945722/pexels-photo-5945722.jpeg',
    dataAiHint: 'cacao pod'
  },
  { 
    id: '7', 
    nombre: 'Arroz',
    nombreCientifico: 'Oryza sativa',
    familia: 'Poaceae',
    region: 'Orinoquía', 
    clima: 'Cálido', 
    descripcionDetallada: 'El arroz es un cereal semiacuático que se cultiva tradicionalmente en campos inundados. Requiere altas temperaturas y un suministro constante de agua durante su ciclo de crecimiento.',
    temporada: 'Abril - Junio',
    tipoDeSuelo: 'Arcilloso, impermeable para retener el agua.',
    tiempoSiembra: 'Directa o por trasplante desde semilleros.',
    tiempoCosecha: '4-6 meses.',
    plagasComunes: 'Sogata, Piricularia.',
    imageUrl: 'https://images.pexels.com/photos/235925/pexels-photo-235925.jpeg',
    dataAiHint: 'rice paddy'
  },
  { 
    id: '8', 
    nombre: 'Sacha Inchi',
    nombreCientifico: 'Plukenetia volubilis',
    familia: 'Euphorbiaceae',
    region: 'Amazonía', 
    clima: 'Húmedo', 
    descripcionDetallada: 'Conocido como el "maní del inca", es una planta trepadora (enredadera) originaria de la Amazonía. Necesita tutores o soporte para poder crecer verticalmente y producir sus frutos ricos en Omega 3.',
    temporada: 'Todo el año',
    tipoDeSuelo: 'Franco, con buen drenaje y materia orgánica.',
    tiempoSiembra: 'Por semilla, germina en 1-2 semanas.',
    tiempoCosecha: 'A partir de los 8 meses.',
    plagasComunes: 'Relativamente resistente, pero susceptible a hongos por exceso de humedad.',
    imageUrl: 'https://images.pexels.com/photos/13214808/pexels-photo-13214808.jpeg',
    dataAiHint: 'sacha inchi'
  },
  { 
    id: '9', 
    nombre: 'Frijol',
    nombreCientifico: 'Phaseolus vulgaris',
    familia: 'Fabaceae',
    region: 'Andina', 
    clima: 'Templado', 
    descripcionDetallada: 'El frijol es una leguminosa clave en la dieta colombiana. Existen variedades de arbusto y trepadoras. Requiere pleno sol, riego regular y un suelo bien drenado.',
    temporada: 'Variable',
    tipoDeSuelo: 'Franco y bien drenado.',
    tiempoSiembra: 'Directa, germina en 1 semana.',
    tiempoCosecha: '2-3 meses para variedades de arbusto.',
    plagasComunes: 'Pulgones, mosca blanca, antracnosis.',
    imageUrl: 'https://images.pexels.com/photos/6022839/pexels-photo-6022839.jpeg',
    dataAiHint: 'beanstalk'
  },
  { 
    id: '10', 
    nombre: 'Aguacate',
    nombreCientifico: 'Persea americana',
    familia: 'Lauraceae',
    region: 'Andina', 
    clima: 'Templado', 
    descripcionDetallada: 'El aguacate es un árbol que requiere un excelente drenaje; no tolera el encharcamiento. Es sensible a los vientos fuertes y a las heladas cuando es joven.',
    temporada: 'Mayo - Septiembre',
    tipoDeSuelo: 'Franco arenoso, profundo y bien drenado.',
    tiempoSiembra: 'Se suele injertar para asegurar la calidad del fruto.',
    tiempoCosecha: '3-5 años para la primera cosecha en árboles injertados.',
    plagasComunes: 'Tristeza del aguacatero (hongo), barrenadores del tallo.',
    imageUrl: 'https://images.pexels.com/photos/557738/pexels-photo-557738.jpeg',
    dataAiHint: 'avocado tree'
  },
  { 
    id: '11', 
    nombre: 'Mango',
    nombreCientifico: 'Mangifera indica',
    familia: 'Anacardiaceae',
    region: 'Caribe', 
    clima: 'Cálido', 
    descripcionDetallada: 'Árbol tropical que necesita pleno sol y mucho espacio para su desarrollo. Una poda anual después de la cosecha ayuda a mantener su forma y a mejorar la producción del siguiente año.',
    temporada: 'Mayo - Agosto',
    tipoDeSuelo: 'Profundo y bien drenado. Tolera varios tipos de suelo.',
    tiempoSiembra: 'Se propaga por injerto.',
    tiempoCosecha: '3-5 años para la primera cosecha.',
    plagasComunes: 'Mosca de la fruta, antracnosis.',
    imageUrl: 'https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg',
    dataAiHint: 'mango tree'
  },
  { 
    id: '12', 
    nombre: 'Chontaduro',
    nombreCientifico: 'Bactris gasipaes',
    familia: 'Arecaceae',
    region: 'Pacífica', 
    clima: 'Húmedo', 
    descripcionDetallada: 'El chontaduro es una palmera nativa de las regiones tropicales de América. Requiere alta humedad, temperaturas cálidas y suelos fértiles para un buen crecimiento. Su fruto es muy nutritivo.',
    temporada: 'Enero - Abril',
    tipoDeSuelo: 'Franco, rico en materia orgánica.',
    tiempoSiembra: 'Por semilla, la germinación puede tardar meses.',
    tiempoCosecha: '3-5 años para empezar a producir.',
    plagasComunes: 'Picudo de la palma, Gualpa.',
    imageUrl: 'https://images.pexels.com/photos/13444747/pexels-photo-13444747.jpeg',
    dataAiHint: 'peach palm'
  },
];

// In a real app, this function would fetch data from a Firestore collection.
export async function getCrops(): Promise<Crop[]> {
  // Simulate network delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 200));
  return crops;
}

// In a real app, this would fetch a specific crop by its ID from Firestore.
export async function getCropById(id: string): Promise<Crop | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return crops.find(crop => crop.id === id);
}
