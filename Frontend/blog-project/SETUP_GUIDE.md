# 🚀 GUÍA DE CONFIGURACIÓN RÁPIDA - 4 HORAS

## ⏱️ CRONOGRAMA

### HORA 1: Setup y Primeros Pasos (0:00 - 1:00)
- ✅ Proyecto Vite ya creado
- [ ] Copiar todos los archivos creados
- [ ] Instalar dependencias
- [ ] Configurar APIs

### HORA 2: Configuración de Firebase (1:00 - 2:00)
- [ ] Crear proyecto Firebase
- [ ] Configurar Authentication
- [ ] Configurar Firestore
- [ ] Probar autenticación

### HORA 3: Testing y Ajustes (2:00 - 3:00)
- [ ] Probar todas las funcionalidades
- [ ] Ajustar estilos si es necesario
- [ ] Verificar responsive design
- [ ] Commit intermedio

### HORA 4: Deploy y Documentación (3:00 - 4:00)
- [ ] Crear repositorio GitHub
- [ ] Deploy a GitHub Pages
- [ ] Verificar .env compartido
- [ ] Commit final

---

## 📋 PASO 1: OBTENER APP-ID DE DUMMYAPI (5 minutos)

1. Ve a https://dummyapi.io/
2. Click en "Get Started" o "Sign Up"
3. Completa el registro
4. En el dashboard, copia tu `app-id`
5. Guárdalo, lo necesitarás para el `.env`

---

## 📋 PASO 2: CONFIGURAR FIREBASE (15-20 minutos)

### A. Crear Proyecto
1. Ve a https://console.firebase.google.com/
2. Click "Add project" / "Agregar proyecto"
3. Nombre: "blog-technical-test" (o el que prefieras)
4. Desactiva Google Analytics (opcional, acelera el proceso)
5. Click "Create project"

### B. Habilitar Authentication
1. En el menú lateral → "Authentication" / "Autenticación"
2. Click "Get started" / "Comenzar"
3. Pestaña "Sign-in method" / "Método de acceso"
4. Click en "Google"
5. Habilitar (toggle ON)
6. Selecciona tu email de soporte
7. Click "Save" / "Guardar"

### C. Habilitar Firestore
1. En el menú lateral → "Firestore Database"
2. Click "Create database" / "Crear base de datos"
3. Selecciona "Start in test mode" (para desarrollo rápido)
4. Ubicación: usa-central (o la más cercana)
5. Click "Enable"

### D. Configurar Reglas de Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### E. Obtener Credenciales
1. Click en el ícono de configuración (⚙️) → "Project settings"
2. Scroll down hasta "Your apps"
3. Click en el ícono web `</>`
4. Nombre de app: "blog-web"
5. NO marques "Firebase Hosting"
6. Click "Register app"
7. **COPIA TODO EL OBJETO firebaseConfig** 

Deberías ver algo como:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx"
};
```

---

## 📋 PASO 3: CREAR ARCHIVO .env (2 minutos)

Crea un archivo `.env` en la raíz del proyecto con:

```env
# DummyAPI
VITE_DUMMYAPI_APP_ID=tu_app_id_de_dummyapi

# Firebase
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANTE:** Guarda este archivo para enviarlo por correo después.

---

## 📋 PASO 4: INSTALAR DEPENDENCIAS (3-5 minutos)

```bash
npm install
```

---

## 📋 PASO 5: INICIAR DESARROLLO (1 minuto)

```bash
npm run dev
```

Abre http://localhost:5173

---

## ✅ VERIFICACIÓN DE FUNCIONALIDADES

### 1. Posts (Página Principal)
- [ ] Se cargan los posts con imágenes
- [ ] Se muestran los tags de cada post
- [ ] Se ve el autor con foto
- [ ] Paginación funciona

### 2. Filtros por Tags
- [ ] Se cargan todos los tags disponibles
- [ ] Al hacer click en un tag, filtra los posts
- [ ] "All Posts" restaura todos los posts

### 3. Modal de Comentarios
- [ ] Al hacer click en un post se abre el modal
- [ ] Se cargan los comentarios
- [ ] Se puede cerrar con X o clic fuera

### 4. Autenticación
- [ ] Click en "Sign In" redirige a /login
- [ ] "Continue with Google" abre popup de Google
- [ ] Después de login, redirige a /users
- [ ] Navbar muestra foto y nombre del usuario
- [ ] "Logout" funciona correctamente

### 5. Directorio de Usuarios (Protegido)
- [ ] Solo accesible después de login
- [ ] Muestra grid de usuarios con fotos
- [ ] Paginación funciona
- [ ] Datos se guardan en Firestore

---

## 📋 PASO 6: PREPARAR GITHUB (10 minutos)

### A. Crear Repositorio
1. Ve a https://github.com/new
2. Nombre: "blog-technical-test"
3. Público o Privado (según preferencia)
4. **NO** inicialices con README
5. Click "Create repository"

### B. Conectar y Subir
```bash
git init
git add .
git commit -m "Initial commit - Hour 1: Project setup and basic structure"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/blog-technical-test.git
git push -u origin main
```

### C. Commits por Hora (IMPORTANTE)
```bash
# Después de 1 hora
git add .
git commit -m "Hour 1: Setup, API integration, post listing"
git push

# Después de 2 horas
git add .
git commit -m "Hour 2: Tag filtering, comments modal, UI improvements"
git push

# Después de 3 horas
git add .
git commit -m "Hour 3: Firebase auth, protected routes, user directory"
git push

# Al terminar (4 horas)
git add .
git commit -m "Hour 4: Firestore integration, final styling, documentation"
git push
```

---

## 📋 PASO 7: DEPLOY A GITHUB PAGES (5 minutos)

### A. Actualizar vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/blog-technical-test/', // Cambia esto al nombre de tu repo
});
```

### B. Deploy
```bash
npm run build
npm run deploy
```

### C. Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: "gh-pages" branch
4. Save
5. Espera 1-2 minutos
6. Tu app estará en: https://TU_USUARIO.github.io/blog-technical-test/

---

## 📧 PASO 8: COMPARTIR .env (2 minutos)

Envía tu archivo `.env` por correo al evaluador con el asunto:
"Credenciales - Blog Technical Test - [Tu Nombre]"

---

## 🎨 DISEÑO UTILIZADO

**Referencia visual:** Diseño minimalista inspirado en Medium/Dev.to

**Características:**
- Cards con sombras suaves
- Espaciado generoso (white space)
- Tipografía clara y legible
- Paleta de colores profesional (azul/gris)
- Responsive en todos los dispositivos
- Animaciones sutiles en hover

**URL de referencia para README:**
https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=400&fit=crop

---

## ⚡ TIPS PARA OPTIMIZAR TIEMPO

1. **No te obsesiones con detalles visuales** - El diseño ya está optimizado
2. **Usa las herramientas de desarrollo** - Console para debug rápido
3. **Commits cada hora** - Pone alarma para no olvidar
4. **Firebase en modo test** - Más rápido para desarrollo
5. **Lee los errores** - La consola te dirá exactamente qué falta

---

## 🆘 TROUBLESHOOTING RÁPIDO

### "Firebase: Error (auth/popup-closed-by-user)"
- Normal, el usuario cerró el popup
- Intenta de nuevo

### "Network request failed"
- Verifica tu `.env`
- Confirma que VITE_DUMMYAPI_APP_ID es correcto

### "Firebase: Firebase App named '[DEFAULT]' already exists"
- Recarga la página
- Firebase ya está inicializado

### Posts no cargan
- Verifica VITE_DUMMYAPI_APP_ID en .env
- Reinicia el servidor de desarrollo

### Deploy falla
- Verifica que `base` en vite.config.js coincida con tu repo
- Asegúrate de tener permisos en el repositorio

---

## ✅ CHECKLIST FINAL

Antes de entregar, verifica:

- [ ] README.md está completo
- [ ] Todos los commits están pusheados
- [ ] GitHub Pages está funcionando
- [ ] .env enviado por correo
- [ ] Todas las funcionalidades probadas
- [ ] Responsive en mobile/tablet/desktop
- [ ] No hay console.errors en producción
- [ ] Links del README funcionan

---

**¡Éxito en tu prueba técnica! 🚀**
