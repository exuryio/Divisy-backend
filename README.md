# Divisy API Backend

Backend API separado para manejar formularios y envío de emails. Desplegado en Railway.

## Configuración Local

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env`:
```env
PORT=3001
RESEND_API_KEY=re_tu_api_key_aqui
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=direccion@exury.io
FRONTEND_URL=http://localhost:3000
```

3. Ejecutar servidor:
```bash
npm run dev
```

## Configuración de Resend (REQUERIDO)

**SÍ, necesitas crear una cuenta en Resend para enviar emails.** Aquí te explico cómo:

### Paso 1: Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Haz clic en **"Sign Up"** o **"Get Started"**
3. Crea una cuenta (puedes usar GitHub, Google, o email)

### Paso 2: Obtener tu API Key
1. Una vez dentro del dashboard de Resend
2. Ve a la sección **"API Keys"** (en el menú lateral)
3. Haz clic en **"Create API Key"**
4. Dale un nombre (ej: "Divisy Backend")
5. Selecciona los permisos necesarios (generalmente "Sending access")
6. **Copia el API Key** (empieza con `re_` y solo se muestra una vez)
   - ⚠️ **IMPORTANTE:** Guárdalo en un lugar seguro, no podrás verlo de nuevo

### Paso 3: Verificar un dominio (Opcional pero Recomendado)
Para producción, deberías verificar tu propio dominio:

1. En Resend, ve a **"Domains"**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: `divisy.co`)
4. Sigue las instrucciones para agregar los registros DNS
5. Una vez verificado, puedes usar emails como `noreply@divisy.co`

**Para desarrollo/pruebas:**
- Puedes usar el dominio de prueba: `onboarding@resend.dev` (ya está configurado por defecto)
- Este dominio solo funciona para enviar a direcciones que hayas verificado en Resend

### Paso 4: Verificar tu email (Para recibir emails de prueba)
1. En Resend, ve a **"Audiences"** → **"Contacts"**
2. Agrega el email donde quieres recibir los formularios (ej: `direccion@exury.io`)
3. Verifica el email siguiendo las instrucciones

**Listo!** Ahora tienes tu `RESEND_API_KEY` que necesitas para configurar en Railway.

## Despliegue en Railway

### Paso 1: Crear cuenta en Railway
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta o inicia sesión con GitHub

### Paso 2: Crear un nuevo proyecto
1. En el dashboard de Railway, haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza Railway para acceder a tu cuenta de GitHub
4. Selecciona el repositorio `Divisy-backend`

### Paso 3: Configurar el proyecto
Railway detectará automáticamente que es un proyecto Node.js y configurará el build.

### Paso 4: Configurar Variables de Entorno
**⚠️ IMPORTANTE:** Asegúrate de tener tu `RESEND_API_KEY` listo (ver sección "Configuración de Resend" arriba)

1. En tu proyecto de Railway, ve a la pestaña **"Variables"**
2. Haz clic en **"New Variable"** y agrega las siguientes variables de entorno:

   | Variable | Valor | Descripción |
   |----------|-------|-------------|
   | `RESEND_API_KEY` | `re_xxxxx...` | Tu API Key de Resend (obtenida en el paso anterior) |
   | `FROM_EMAIL` | `onboarding@resend.dev` | Email remitente (o tu dominio verificado) |
   | `TO_EMAIL` | `direccion@exury.io` | Email donde recibirás los formularios |
   | `FRONTEND_URL` | `https://tu-dominio.com` | URL de tu frontend (para CORS) |

   **Notas:** 
   - `PORT` se configura automáticamente por Railway (no necesitas agregarlo)
   - Reemplaza `FRONTEND_URL` con la URL real de tu frontend en producción
   - Si verificaste tu dominio en Resend, puedes cambiar `FROM_EMAIL` a algo como `noreply@divisy.co`

### Paso 5: Desplegar
1. Railway comenzará a desplegar automáticamente cuando detecte cambios en tu repositorio
2. Puedes ver el progreso en la pestaña **"Deployments"**
3. Una vez completado, Railway te dará una URL pública (algo como: `https://tu-proyecto.up.railway.app`)

### Paso 6: Configurar dominio personalizado (Opcional)
1. En la pestaña **"Settings"** de tu servicio
2. Ve a **"Networking"** → **"Custom Domain"**
3. Agrega tu dominio personalizado y sigue las instrucciones para configurar DNS

### Verificar el despliegue
- Visita `https://tu-url.up.railway.app/health` para verificar que el servidor está funcionando
- Deberías ver: `{"status":"ok","service":"divisy-api"}`

### Actualizaciones automáticas
Railway despliega automáticamente cada vez que haces push a la rama principal de tu repositorio en GitHub.

## Endpoints

- `GET /health` - Health check
- `POST /api/submit-form` - Envío de formularios

## Variables de Entorno

- `PORT` - Puerto del servidor (Railway lo asigna automáticamente)
- `RESEND_API_KEY` - API key de Resend
- `FROM_EMAIL` - Email remitente
- `TO_EMAIL` - Email destinatario
- `FRONTEND_URL` - URL del frontend (para CORS)

