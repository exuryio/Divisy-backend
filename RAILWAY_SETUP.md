# Railway Deployment Setup Guide

## Step-by-Step Railway Configuration

### 1. Create Project in Railway
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway → Select `Divisy-backend` repository

### 2. Configure Environment Variables (REQUIRED)
Go to your service → **"Variables"** tab → Click **"New Variable"**

Add these 4 variables:

```
RESEND_API_KEY = re_BG1uV6W1_FFx8XxXm7HZeNYZTQhF3fAmX
FROM_EMAIL = onboarding@resend.dev
TO_EMAIL = direccion@exury.io
FRONTEND_URL = https://your-frontend-domain.com
```

**Important:** Replace `your-frontend-domain.com` with your actual frontend URL!

### 3. Service Settings (Auto-Configured)
Railway automatically detects:
- ✅ **Build Command:** `npm install` (from railway.json)
- ✅ **Start Command:** `npm start` (from package.json)
- ✅ **Node Version:** >=18.0.0 (from package.json engines)
- ✅ **Port:** Automatically assigned (your app uses `process.env.PORT`)

**You don't need to change these!**

### 4. Optional: Health Check (Recommended)
1. Go to **Settings** → **Healthcheck**
2. Set **Healthcheck Path:** `/health`
3. This helps Railway monitor your app

### 5. Optional: Custom Domain
1. Go to **Settings** → **Networking** → **Custom Domain**
2. Add your domain (e.g., `api.divisy.co`)
3. Follow DNS configuration instructions

### 6. Deploy
- Railway will automatically deploy when you:
  - First connect the repo
  - Push changes to your main branch
- Watch the deployment in the **"Deployments"** tab
- Get your public URL from the **"Settings"** → **"Networking"** section

## Verification

After deployment:
1. Visit: `https://divisy-backend-production.up.railway.app/health`
2. Should return: `{"status":"ok","service":"divisy-api"}`
3. Test form submission to verify emails are sent to `direccion@exury.io`

## Your Backend API URL

**Backend URL:** `https://divisy-backend-production.up.railway.app`

### API Endpoints:
- **Health Check:** `GET https://divisy-backend-production.up.railway.app/health`
- **Submit Form:** `POST https://divisy-backend-production.up.railway.app/api/submit-form`

### Important Notes:
- Use this URL in your **frontend** to make API calls
- The `FRONTEND_URL` environment variable should be your **frontend domain** (not this backend URL)
- This allows CORS to work properly when your frontend calls this backend

## Troubleshooting

- **Build fails?** Check the "Deployments" tab for error logs
- **Emails not sending?** Verify `RESEND_API_KEY` is correct and `direccion@exury.io` is verified in Resend
- **CORS errors?** Make sure `FRONTEND_URL` matches your actual frontend domain

