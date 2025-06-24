import type { Crop } from '@/types';

const crops: Crop[] = [
  { id: '1', nombre: 'Maíz', region: 'Andina', clima: 'Templado', cuidados: 'Riego moderado, pleno sol. Resistente y adaptable.', temporada: 'Marzo - Mayo', imageUrl: 'https://images.pexels.com/photos/1473663/pexels-photo-1473663.jpeg', dataAiHint: 'corn field' },
  { id: '2', nombre: 'Papa', region: 'Andina', clima: 'Frío', cuidados: 'Suelo bien drenado, proteger de heladas intensas.', temporada: 'Todo el año', imageUrl: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg', dataAiHint: 'potato farm' },
  { id: '3', nombre: 'Café', region: 'Andina', clima: 'Templado', cuidados: 'Sombra parcial, alta humedad y suelo volcánico.', temporada: 'Septiembre - Diciembre', imageUrl: 'https://images.pexels.com/photos/1429167/pexels-photo-1429167.jpeg', dataAiHint: 'coffee plant' },
  { id: '4', nombre: 'Plátano', region: 'Caribe', clima: 'Cálido', cuidados: 'Mucho sol y agua, suelo rico en materia orgánica.', temporada: 'Todo el año', imageUrl: 'https://images.pexels.com/photos/2280927/pexels-photo-2280927.jpeg', dataAiHint: 'banana tree' },
  { id: '5', nombre: 'Yuca', region: 'Caribe', clima: 'Cálido', cuidados: 'Tolerante a la sequía, pleno sol. No requiere mucho cuidado.', temporada: 'Todo el año', imageUrl: 'https://images.pexels.com/photos/8968416/pexels-photo-8968416.jpeg', dataAiHint: 'cassava plant' },
  { id: '6', nombre: 'Cacao', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Necesita sombra, protección del viento y suelo bien drenado.', temporada: 'Abril - Junio', imageUrl: 'https://images.pexels.com/photos/776092/pexels-photo-776092.jpeg', dataAiHint: 'cacao pod' },
  { id: '7', nombre: 'Arroz', region: 'Orinoquía', clima: 'Cálido', cuidados: 'Requiere inundación o riego constante durante su crecimiento.', temporada: 'Abril - Junio', imageUrl: 'https://images.pexels.com/photos/2347011/pexels-photo-2347011.jpeg', dataAiHint: 'rice paddy' },
  { id: '8', nombre: 'Sacha Inchi', region: 'Amazonía', clima: 'Húmedo', cuidados: 'Es una enredadera que necesita soporte para crecer adecuadamente.', temporada: 'Todo el año', imageUrl: 'https://images.pexels.com/photos/3338499/pexels-photo-3338499.jpeg', dataAiHint: 'sacha inchi' },
  { id: '9', nombre: 'Frijol', region: 'Andina', clima: 'Templado', cuidados: 'Pleno sol, riego regular y suelo con buen drenaje.', temporada: 'Variable', imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg', dataAiHint: 'beanstalk' },
  { id: '10', nombre: 'Aguacate', region: 'Andina', clima: 'Templado', cuidados: 'Buen drenaje es crucial. Proteger de vientos fuertes.', temporada: 'Mayo - Septiembre', imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg', dataAiHint: 'avocado tree' },
  { id: '11', nombre: 'Mango', region: 'Caribe', clima: 'Cálido', cuidados: 'Pleno sol y espacio para crecer. Poda anual recomendada.', temporada: 'Mayo - Agosto', imageUrl: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg', dataAiHint: 'mango tree' },
  { id: '12', nombre: 'Chontaduro', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Palmera que requiere alta humedad y suelos fértiles.', temporada: 'Enero - Abril', imageUrl: 'https://images.pexels.com/photos/10188481/pexels-photo-10188481.jpeg', dataAiHint: 'peach palm' },
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
