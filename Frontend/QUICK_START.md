# ⚡ INICIO RÁPIDO - 5 MINUTOS

## 🎯 LO QUE DEBES HACER AHORA MISMO

### 1️⃣ OBTENER CREDENCIALES (10 min)

#### DummyAPI (2 minutos)
```
1. https://dummyapi.io/ → Sign Up
2. Copia tu app-id del dashboard
```

#### Firebase (8 minutos)
```
1. https://console.firebase.google.com/ → Add Project
2. Nombre: "blog-test"
3. Desactiva Analytics → Create
4. Authentication → Get Started → Google → Enable
5. Firestore → Create Database → Test mode → Enable
6. Settings ⚙️ → Project Settings → Your apps → Web </> 
7. Register app → COPIA firebaseConfig
```

### 2️⃣ CONFIGURAR PROYECTO (3 minutos)

Crea archivo `.env` en la raíz:
```env
VITE_DUMMYAPI_APP_ID=pega_aqui_tu_app_id

VITE_FIREBASE_API_KEY=pega_aqui
VITE_FIREBASE_AUTH_DOMAIN=pega_aqui.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pega_aqui
VITE_FIREBASE_STORAGE_BUCKET=pega_aqui.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=pega_aqui
VITE_FIREBASE_APP_ID=pega_aqui
```

### 3️⃣ INICIAR (2 minutos)

```bash
npm install
npm run dev
```

Abre: http://localhost:5173

---

## ✅ VERIFICACIÓN RÁPIDA

¿Funciona todo?
- [ ] Ves posts con imágenes? ✓
- [ ] Click en post abre comentarios? ✓
- [ ] Filtros por tag funcionan? ✓
- [ ] Login con Google funciona? ✓
- [ ] Ves usuarios después de login? ✓

Si todo ✓ → ¡ESTÁS LISTO! 🎉

---

## 📤 ENTREGAR (30 min al final)

### Crear repo GitHub
```bash
git init
git add .
git commit -m "Hour 1: Initial setup"
git remote add origin https://github.com/TU_USUARIO/blog-test.git
git push -u origin main
```

### Deploy a GitHub Pages
1. En `vite.config.js` cambia: `base: '/blog-test/'`
2. Ejecuta: `npm run deploy`
3. GitHub → Settings → Pages → Source: gh-pages

### Enviar .env por correo
Asunto: "Credenciales Blog Test - [Tu Nombre]"

---

## 🆘 PROBLEMAS COMUNES

**Posts no cargan:**
→ Verifica VITE_DUMMYAPI_APP_ID en .env
→ Reinicia servidor (Ctrl+C, npm run dev)

**Login no funciona:**
→ Verifica todas las variables VITE_FIREBASE_*
→ Confirma que Google está habilitado en Firebase Console

**Deploy falla:**
→ Verifica que `base` en vite.config.js = nombre de tu repo
→ Ejemplo: repo "mi-blog" → `base: '/mi-blog/'`

---

## 📋 COMMITS POR HORA

```bash
# Hora 1
git commit -m "Hour 1: Setup and structure"

# Hora 2  
git commit -m "Hour 2: Features and UI"

# Hora 3
git commit -m "Hour 3: Auth and database"

# Hora 4
git commit -m "Hour 4: Deploy and docs"
```

---

¿Dudas? Lee `SETUP_GUIDE.md` para detalles completos.

**¡Éxito! 🚀**
