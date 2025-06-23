import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-headline text-primary">Iniciar Sesión</h1>
          <p className="text-muted-foreground">Accede a tu cuenta para ver tus cultivos favoritos.</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
