
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecursosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Recursos</h1>
        <p className="text-muted-foreground mt-2">Esta sección está en construcción.</p>
      </header>
      <Card className="text-center py-20">
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Aquí encontrarás guías, artículos y recursos útiles para tus cultivos.</p>
        </CardContent>
      </Card>
    </div>
  );
}
