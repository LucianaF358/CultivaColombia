export type Crop = {
  id: string;
  nombre: string;
  nombreCientifico: string;
  familia: string;
  tipo: string;
  region: string;
  clima: string;
  descripcionDetallada: string;
  temporada: string;
  tipoDeSuelo: string;
  tiempoSiembra: string;
  tiempoCosecha: string;
  plagasComunes: string;
  imageUrl: string;
  dataAiHint?: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};
