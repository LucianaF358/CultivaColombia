
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Mapa Interactivo</h1>
        <p className="text-muted-foreground mt-2">Esta sección está en construcción.</p>
      </header>
      <Card className="text-center py-20">
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Estamos trabajando en un mapa interactivo para visualizar los cultivos por región.</p>
        </CardContent>
      </Card>
    </div>
  );
}
