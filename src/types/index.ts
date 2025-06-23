export type Crop = {
  id: string;
  nombre: string;
  region: string;
  clima: string;
  cuidados: string;
  temporada: string;
  imageUrl: string;
  dataAiHint?: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};
