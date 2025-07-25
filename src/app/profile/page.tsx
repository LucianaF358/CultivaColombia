
"use client";

import { useAuth } from "@/lib/firebase/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/lib/actions";
import { sendPasswordReset, deleteUserAccount } from "@/lib/firebase/authActions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, KeyRound, Trash2, ShieldAlert } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isPasswordResetting, setIsPasswordResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handlePasswordReset = async () => {
    if (!user || !user.email) return;

    setIsPasswordResetting(true);
    const result = await sendPasswordReset(user.email);
    setIsPasswordResetting(false);

    if (result.success) {
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para cambiar la contraseña.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "No se pudo enviar el correo de restablecimiento.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    if(deleteConfirmation !== 'DELETE') return;

    setIsDeleting(true);
    const result = await deleteUserAccount();
    setIsDeleting(false);

    if (result.success) {
      toast({
        title: "Cuenta Eliminada",
        description: "Tu cuenta ha sido eliminada permanentemente.",
      });
      // The logout action will handle the redirect
    } else {
       toast({
        title: "Error al eliminar la cuenta",
        description: result.error || "No se pudo completar la operación. Puede que necesites iniciar sesión de nuevo.",
        variant: "destructive",
      });
    }
  }

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <header className="text-center mb-8">
                <div className="h-10 bg-muted w-1/2 mx-auto rounded-md" />
                <div className="h-4 bg-muted w-3/4 mx-auto rounded-md mt-4" />
            </header>
            <div className="max-w-lg mx-auto space-y-8">
                <Card>
                    <CardHeader className="items-center text-center">
                         <div className="h-24 w-24 bg-muted rounded-full mb-4" />
                         <div className="h-6 w-32 bg-muted rounded-md" />
                         <div className="h-4 w-48 bg-muted rounded-md mt-2" />
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader>
                        <div className="h-6 w-48 bg-muted rounded-md" />
                        <div className="h-4 w-full bg-muted rounded-md mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-10 w-48 bg-muted rounded-md" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <div className="h-6 w-48 bg-muted rounded-md" />
                        <div className="h-4 w-full bg-muted rounded-md mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-10 w-48 bg-muted rounded-md" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Mi Perfil</h1>
        <p className="text-muted-foreground mt-2">Gestiona la información de tu cuenta y la configuración de seguridad.</p>
      </header>

      <div className="max-w-lg mx-auto space-y-8">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4 text-3xl">
              <AvatarFallback>{user.email?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.displayName || "Usuario"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
           <CardContent className="text-center">
            <Button variant="ghost" onClick={() => logout()}>
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><KeyRound className="text-primary"/> Seguridad</CardTitle>
            <CardDescription>
              Gestiona tu contraseña y la seguridad de tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handlePasswordReset} disabled={isPasswordResetting}>
              {isPasswordResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Cambiar Contraseña
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
                Se enviará un enlace a tu correo para restablecer tu contraseña.
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><ShieldAlert /> Zona de Peligro</CardTitle>
            <CardDescription>
              La siguiente acción es permanente y no se puede deshacer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Eliminar Mi Cuenta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos tus datos asociados, incluyendo los cultivos favoritos y el seguimiento de plantas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2 py-2">
                    <Label htmlFor="delete-confirm">Para confirmar, escribe <strong className="text-destructive">DELETE</strong> a continuación:</Label>
                    <Input 
                        id="delete-confirm"
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="DELETE"
                        className="border-destructive focus-visible:ring-destructive"
                    />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeleteConfirmation('')}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Eliminar permanentemente
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
