import type { Crop } from '@/types';

const crops: Crop[] = [
  { id: '1', nombre: 'Maíz', region: 'Andina', clima: 'Templado', cuidados: 'Riego moderado, pleno sol. Resistente y adaptable.', temporada: 'Marzo - Mayo', imageUrl: 'https://images.unsplash.com/photo-1598153346414-8b143213251c', dataAiHint: 'corn field' },
  { id: '2', nombre: 'Papa', region: 'Andina', clima: 'Frío', cuidados: 'Suelo bien drenado, proteger de heladas intensas.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1590324831862-2d93b0a70195', dataAiHint: 'potato farm' },
  { id: '3', nombre: 'Café', region: 'Andina', clima: 'Templado', cuidados: 'Sombra parcial, alta humedad y suelo volcánico.', temporada: 'Septiembre - Diciembre', imageUrl: 'https://images.unsplash.com/photo-1511920183353-3c9c612586a5', dataAiHint: 'coffee plant' },
  { id: '4', nombre: 'Plátano', region: 'Caribe', clima: 'Cálido', cuidados: 'Mucho sol y agua, suelo rico en materia orgánica.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1603627708234-3e356d2e47c1', dataAiHint: 'banana tree' },
  { id: '5', nombre: 'Yuca', region: 'Caribe', clima: 'Cálido', cuidados: 'Tolerante a la sequía, pleno sol. No requiere mucho cuidado.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1620413038314-19a463b15b24', dataAiHint: 'cassava plant' },
  { id: '6', nombre: 'Cacao', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Necesita sombra, protección del viento y suelo bien drenado.', temporada: 'Abril - Junio', imageUrl: 'https://images.unsplash.com/photo-1579582133486-7411a51c4a85', dataAiHint: 'cacao pod' },
  { id: '7', nombre: 'Arroz', region: 'Orinoquía', clima: 'Cálido', cuidados: 'Requiere inundación o riego constante durante su crecimiento.', temporada: 'Abril - Junio', imageUrl: 'https://images.unsplash.com/photo-1536300099515-6c61b34ec2a8', dataAiHint: 'rice paddy' },
  { id: '8', nombre: 'Sacha Inchi', region: 'Amazonía', clima: 'Húmedo', cuidados: 'Es una enredadera que necesita soporte para crecer adecuadamente.', temporada: 'Todo el año', imageUrl: 'https://images.unsplash.com/photo-1520454129532-628a2a5dd1d3', dataAiHint: 'sacha inchi' },
  { id: '9', nombre: 'Frijol', region: 'Andina', clima: 'Templado', cuidados: 'Pleno sol, riego regular y suelo con buen drenaje.', temporada: 'Variable', imageUrl: 'https://images.unsplash.com/photo-1607590828283-3331b260e866', dataAiHint: 'beanstalk' },
  { id: '10', nombre: 'Aguacate', region: 'Andina', clima: 'Templado', cuidados: 'Buen drenaje es crucial. Proteger de vientos fuertes.', temporada: 'Mayo - Septiembre', imageUrl: 'https://images.unsplash.com/photo-1601035522588-5175e538466b', dataAiHint: 'avocado tree' },
  { id: '11', nombre: 'Mango', region: 'Caribe', clima: 'Cálido', cuidados: 'Pleno sol y espacio para crecer. Poda anual recomendada.', temporada: 'Mayo - Agosto', imageUrl: 'https://images.unsplash.com/photo-1591078455533-55c3c209d8d1', dataAiHint: 'mango tree' },
  { id: '12', nombre: 'Chontaduro', region: 'Pacífica', clima: 'Húmedo', cuidados: 'Palmera que requiere alta humedad y suelos fértiles.', temporada: 'Enero - Abril', imageUrl: 'https://images.unsplash.com/photo-1615694939886-c47d7a584e8a', dataAiHint: 'peach palm' },
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
