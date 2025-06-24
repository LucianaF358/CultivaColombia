import type { Crop } from '@/types';

const crops: Crop[] = [
  { id: '1', nombre: 'Maíz', region: 'Andina', clima: 'Templado', cuidados: 'Riego moderado, pleno sol. Resistente y adaptable.', temporada: 'Marzo - Mayo', imageUrl: 'https://images.unsplash.com/photo-1598165500249-912720436577', dataAiHint: 'corn field' },
  { id: '2', nombre: 'Papa', region: 'Andina', clima: 'Frío', cuidados: 'Suelo bien drenado, proteger de heladas intensas.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1592394533039-35a14031631a', dataAiHint: 'potato farm' },
  { id: '3', nombre: 'Café', region: 'Andina', clima: 'Templado', cuidados: 'Sombra parcial, alta humedad y suelo volcánico.', temporada: 'Septiembre - Diciembre', imageUrl: 'https://images.unsplash.com/photo-1551030173-194164b38a7c', dataAiHint: 'coffee plant' },
  { id: '4', nombre: 'Plátano', region: 'Caribe', clima: 'Cálido', cuidados: 'Mucho sol y agua, suelo rico en materia orgánica.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1596426179991-8a9d18e88c07', dataAiHint: 'banana tree' },
  { id: '5', nombre: 'Yuca', region: 'Caribe', clima: 'Cálido', cuidados: 'Tolerante a la sequía, pleno sol. No requiere mucho cuidado.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1619572626909-6a3f6a6c2a8f', dataAiHint: 'cassava plant' },
  { id: '6', nombre: 'Cacao', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Necesita sombra, protección del viento y suelo bien drenado.', temporada: 'Abril - Junio', imageUrl: 'https://images.unsplash.com/photo-1582390895288-3449323533ba', dataAiHint: 'cacao pod' },
  { id: '7', nombre: 'Arroz', region: 'Orinoquía', clima: 'Cálido', cuidados: 'Requiere inundación o riego constante durante su crecimiento.', temporada: 'Abril - Junio', imageUrl: 'https://images.unsplash.com/photo-1536964120152-9f33b369502a', dataAiHint: 'rice paddy' },
  { id: '8', nombre: 'Sacha Inchi', region: 'Amazonía', clima: 'Húmedo', cuidados: 'Es una enredadera que necesita soporte para crecer adecuadamente.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1627854344567-3c35b542031a', dataAiHint: 'sacha inchi' },
  { id: '9', nombre: 'Frijol', region: 'Andina', clima: 'Templado', cuidados: 'Pleno sol, riego regular y suelo con buen drenaje.', temporada: 'Variable', imageUrl: 'https://images.unsplash.com/photo-1585803273799-1a79a6332155', dataAiHint: 'beanstalk' },
  { id: '10', nombre: 'Aguacate', region: 'Andina', clima: 'Templado', cuidados: 'Buen drenaje es crucial. Proteger de vientos fuertes.', temporada: 'Mayo - Septiembre', imageUrl: 'https://images.unsplash.com/photo-1601035902409-c32f0b1a4371', dataAiHint: 'avocado tree' },
  { id: '11', nombre: 'Mango', region: 'Caribe', clima: 'Cálido', cuidados: 'Pleno sol y espacio para crecer. Poda anual recomendada.', temporada: 'Mayo - Agosto', imageUrl: 'https://images.unsplash.com/photo-1591073139393-27c958c21827', dataAiHint: 'mango tree' },
  { id: '12', nombre: 'Chontaduro', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Palmera que requiere alta humedad y suelos fértiles.', temporada: 'Enero - Abril', imageUrl: 'https://images.unsplash.com/photo-1629837240379-31742742a045', dataAiHint: 'peach palm' },
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
