# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Cómo colaborar y compartir este proyecto

La forma estándar de colaborar en proyectos de código es usando un sistema de control de versiones como Git y una plataforma de alojamiento de repositorios como GitHub.

Sigue estos pasos para compartir tu proyecto y permitir que otros lo modifiquen:

### 1. Prepara tu proyecto localmente
Si aún no lo has hecho, necesitas tener Git instalado en tu computadora. Luego, abre una terminal en la carpeta de tu proyecto y ejecuta los siguientes comandos:

```bash
# Inicializa un repositorio de Git en tu proyecto
git init -b main

# Agrega todos los archivos a Git
git add .

# Crea tu primer "commit" (una instantánea de tu código)
git commit -m "Primer commit del proyecto CultivaColombia"
```

### 2. Crea un repositorio en GitHub
1.  Ve a [GitHub](https://github.com) e inicia sesión o crea una cuenta.
2.  Haz clic en el botón "New" (Nuevo) para crear un nuevo repositorio.
3.  Dale un nombre a tu repositorio (por ejemplo, `cultiva-colombia-app`).
4.  Asegúrate de que sea **privado** si no quieres que cualquiera vea tu código.
5.  No inicialices el repositorio con un archivo README, .gitignore o licencia, ya que tu proyecto ya los tiene.
6.  Haz clic en "Create repository" (Crear repositorio).

### 3. Conecta y sube tu proyecto
GitHub te mostrará una serie de comandos. Usa los que son para "push an existing repository from the command line":

```bash
# Reemplaza la URL con la URL de TU repositorio de GitHub
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Sube tu código a GitHub
git push -u origin main
```

### 4. Invita a tus colaboradores
1.  En la página de tu repositorio en GitHub, ve a la pestaña "Settings" (Configuración).
2.  En el menú de la izquierda, haz clic en "Collaborators" (Colaboradores).
3.  Haz clic en el botón "Add people" (Añadir gente).
4.  Introduce el nombre de usuario de GitHub o el correo electrónico de la persona que quieres invitar.
5.  Tu colaborador recibirá una invitación por correo electrónico. Una vez que la acepte, podrá descargar el proyecto, hacer cambios y subirlos.
