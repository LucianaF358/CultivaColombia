"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/lib/firebase/config';
import { createSession } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const auth = getAuth(app);
    try {
      const userCredential =
        mode === 'login'
          ? await signInWithEmailAndPassword(auth, values.email, values.password)
          : await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      const idToken = await userCredential.user.getIdToken();
      const sessionResult = await createSession(idToken);
      
      if (sessionResult.success) {
        toast({
            title: mode === 'login' ? '¡Bienvenido de nuevo!' : '¡Cuenta creada con éxito!',
            description: "Has iniciado sesión correctamente.",
        });
        router.push('/');
      } else {
        throw new Error(sessionResult.message || 'Error al crear la sesión');
      }

    } catch (error: any) {
        let errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
        if (error.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = 'Correo o contraseña incorrectos.';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Este correo electrónico ya está en uso.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'El correo electrónico no es válido.';
                    break;
                default:
                    errorMessage = 'Error de autenticación. Por favor, verifica tus datos.';
            }
        }
        toast({
            title: 'Error de autenticación',
            description: errorMessage,
            variant: 'destructive',
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@correo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {mode === 'login' ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
              <Link href={mode === 'login' ? '/signup' : '/login'} className="font-semibold text-primary hover:underline">
                {mode === 'login' ? 'Regístrate' : 'Inicia Sesión'}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
