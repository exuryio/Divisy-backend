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
TO_EMAIL=rts@divisy.co
FRONTEND_URL=http://localhost:3000
```

3. Ejecutar servidor:
```bash
npm run dev
```

## Despliegue en Railway

1. Conecta tu repositorio a Railway
2. Selecciona la carpeta `backend-api` como raíz del proyecto
3. Configura las variables de entorno en Railway:
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `TO_EMAIL`
   - `FRONTEND_URL` (URL de tu sitio en GoDaddy)
4. Railway detectará automáticamente Node.js y desplegará

## Endpoints

- `GET /health` - Health check
- `POST /api/submit-form` - Envío de formularios

## Variables de Entorno

- `PORT` - Puerto del servidor (Railway lo asigna automáticamente)
- `RESEND_API_KEY` - API key de Resend
- `FROM_EMAIL` - Email remitente
- `TO_EMAIL` - Email destinatario
- `FRONTEND_URL` - URL del frontend (para CORS)

