import { AuthForm } from '@/components/auth/AuthForm';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-headline text-primary">Crear Cuenta</h1>
          <p className="text-muted-foreground">Regístrate para empezar a construir tu huerta.</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
