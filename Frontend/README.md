# Blog - Prueba Técnica React

![Vista previa del diseño](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=400&fit=crop)

Aplicación web moderna de blog construida con React, Vite, Tailwind CSS y Firebase. Incluye navegación de posts, filtrado por tags, autenticación con Google y directorio de usuarios.

## 🎨 Inspiración de Diseño

**Estilo:** Minimalista & Profesional con Glass Morphism  
**Paleta de Colores:**

- Fondo: Degradado azul-morado (#667eea a #764ba2)
- Tarjetas: Efecto glass con transparencia
- Primario: Azul (#2563EB) a Morado (#764ba2)
- Texto: Blanco sobre degradado, gris oscuro en tarjetas

**Referencia:** Diseño moderno inspirado en Dribbble y Behance con énfasis en efectos glass morphism, sombras suaves y transiciones fluidas.

## 🚀 Funcionalidades

### ✅ Implementadas

1. **Listado de Posts**
   - Visualización de posts con imagen principal, tags y autor
   - Layout responsive en grid
   - Paginación
   - Contador de likes

2. **Modal de Comentarios**
   - Click en cualquier post para ver comentarios
   - Modal con animaciones suaves
   - Fotos de perfil y timestamps
   - Manejo de posts sin comentarios

3. **Filtrado por Tags**
   - Visualización de todos los tags disponibles
   - Filtrar posts por tag seleccionado
   - Opción "All Posts" para resetear filtro
   - Feedback visual para tag activo

4. **Autenticación Google**
   - Rutas protegidas con Firebase Auth
   - Integración con Google Sign-In
   - Estado de login persistente
   - Funcionalidad de logout

5. **Directorio de Usuarios (Protegido)**
   - Requiere autenticación para acceder
   - Grid layout de perfiles de usuario
   - Fotos de perfil e información básica
   - Paginación para lista de usuarios

6. **Persistencia en Firestore**
   - Guardado automático de usuarios en Firebase
   - Base de datos no relacional
   - Timestamps de registro

## 🛠️ Tecnologías Utilizadas

- **React 18.2** - Librería UI
- **Vite** - Herramienta de build y servidor de desarrollo
- **React Router DOM** - Enrutamiento del lado del cliente
- **Tailwind CSS** - Framework CSS utility-first
- **Firebase** - Autenticación y base de datos Firestore
- **DummyJSON** - API de posts y datos de usuarios
- **GitHub Pages** - Despliegue

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/blog-technical-test.git
cd blog-technical-test/Frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del directorio Frontend:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## 🔧 Configuración

### Firebase Setup

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear un nuevo proyecto
3. Habilitar Authentication → Google Sign-In
4. Habilitar Firestore Database
5. Obtener configuración desde Project Settings
6. Agregar credenciales al archivo `.env`

**Reglas de Firestore importantes:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

### API DummyJSON

La aplicación utiliza [DummyJSON](https://dummyjson.com/) que no requiere API key. Endpoints utilizados:

- `GET /posts` - Listado de posts
- `GET /posts/tag/{tag}` - Posts por tag
- `GET /comments/post/{id}` - Comentarios de un post
- `GET /users` - Listado de usuarios

## 📁 Estructura del Proyecto

```
Frontend/
├── src/
│   ├── components/
│   │   ├── CommentsModal.jsx    # Modal para mostrar comentarios
│   │   ├── Navbar.jsx           # Barra de navegación
│   │   ├── PostCard.jsx         # Tarjeta individual de post
│   │   └── TagFilter.jsx        # Componente de filtrado por tags
│   ├── pages/
│   │   ├── Home.jsx             # Página principal con posts
│   │   ├── Login.jsx            # Página de autenticación Google
│   │   └── Users.jsx            # Directorio de usuarios (protegida)
│   ├── context/
│   │   └── AuthContext.jsx      # Contexto de autenticación Firebase
│   ├── config/
│   │   └── firebase.js          # Configuración de Firebase
│   ├── services/
│   │   └── api.js               # Funciones de servicio API
│   ├── App.jsx                  # Componente principal con rutas
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales y Tailwind
├── .env                         # Variables de entorno (no commitear)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

│ │ └── api.js # DummyAPI service functions
│ ├── App.jsx # Main app component with routing
│ ├── main.jsx # App entry point
│ └── index.css # Tailwind CSS imports
├── .env.example # Environment variables template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md

````

## 🚢 Despliegue a GitHub Pages

**GitHub Pages** es un servicio gratuito de GitHub que publica tu sitio web directamente desde tu repositorio. Es perfecto para proyectos frontend estáticos.

### Pasos para Desplegar:

1. **Actualizar vite.config.js** con el nombre de tu repositorio:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/nombre-de-tu-repo/', // Ejemplo: '/blog-technical-test/'
});
````

2. **Instalar gh-pages** (si no lo tienes):

```bash
npm install --save-dev gh-pages
```

3. **Agregar scripts en package.json**:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. **Build y Deploy**:

```bash
npm run deploy
```

5. **Habilitar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: selecciona la rama `gh-pages`
   - ¡Tu sitio estará en: `https://tuusuario.github.io/nombre-repo/`

## 📝 Notas de Desarrollo

### Commits por Hora

Este proyecto fue desarrollado siguiendo mejores prácticas con commits cada hora:

- **Hora 1:** Setup inicial, integración API, estructura básica
- **Hora 2:** Listado de posts, filtrado por tags, modal de comentarios
- **Hora 3:** Setup de Firebase, autenticación, rutas protegidas
- **Hora 4:** Directorio de usuarios, integración Firestore, refinamiento de estilos

### Decisiones Clave

1. **Modal vs Ruta para Comentarios:** Modal elegido para mejor UX
2. **Tailwind CSS:** Desarrollo rápido con diseño consistente
3. **Firebase:** Autenticación confiable y capacidades de base de datos en tiempo real
4. **Glass Morphism:** Diseño moderno con efectos de transparencia y blur
5. **DummyJSON:** API sin necesidad de API key, perfecta para prototipos

### Desafíos Resueltos

- Configuración correcta de Firebase con variables de entorno
- Implementación de rutas protegidas con Context API
- Llamadas eficientes a API con manejo de errores
- Diseño responsive en todos los tamaños de dispositivo
- Sincronización de basename entre Vite y React Router

## 🎯 Mejoras Futuras

- [ ] Funcionalidad de búsqueda de posts
- [ ] Perfiles de usuario con información detallada
- [ ] Guardar posts favoritos
- [ ] Soporte para modo oscuro
- [ ] Infinite scroll en lugar de paginación
- [ ] Editor de texto enriquecido para comentarios
- [ ] Funciones de compartir en redes sociales
- [ ] Implementar i18n para múltiples idiomas

## 📧 Variables de Entorno

**Importante:** El archivo `.env` debe compartirse por correo según lo solicitado en la prueba técnica. **Nunca** hacer commit de este archivo al repositorio.

Contenido del `.env`:

```env
VITE_FIREBASE_API_KEY="AIzaSyAB2QZk-0fpSSg6w4jNSBKBfUfPTggxH7U"
VITE_FIREBASE_AUTH_DOMAIN="blog-test-3b271.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="blog-test-3b271"
VITE_FIREBASE_STORAGE_BUCKET="blog-test-3b271.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="605970548410"
VITE_FIREBASE_APP_ID="1:605970548410:web:4859375473b6ecd36ba483"
```

## 🎨 Decisiones de Diseño

**Inspiración Visual:** [Enlace a Dribbble/Behance aquí]

El diseño utiliza:

- **Glass Morphism:** Efecto de vidrio esmerilado para tarjetas
- **Degradados:** Fondo azul-morado vibrante
- **Sombras Suaves:** Para profundidad y elevación
- **Transiciones:** Animaciones suaves en hover
- **Tipografía:** Clara y legible con jerarquía visual

## 🙏 Agradecimientos

- [DummyJSON](https://dummyjson.com/) - Por proveer datos de prueba
- [Picsum Photos](https://picsum.photos/) - Imágenes placeholder
- [Pravatar](https://i.pravatar.cc/) - Avatares de usuarios
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Firebase](https://firebase.google.com/) - Servicios de autenticación y base de datos

## 📄 Licencia

Este proyecto fue creado como prueba técnica y está disponible para propósitos de revisión.

---

**Desarrollador:** Ivana  
**Fecha:** Enero 2026  
**Tiempo Total de Desarrollo:** 4 horas  
**Demo en Vivo:** [Agregar link de GitHub Pages después del deploy]
