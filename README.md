# 📱 NBA Rookie App

Aplicación híbrida desarrollada con **Ionic + Angular** que permite explorar jugadores de la NBA, ver detalles, marcar favoritos, usar funcionalidades nativas como cámara y compartir, y guardar datos en Firebase.

---

## 🚀 Tecnologías usadas

- **Ionic + Angular**
- **Capacitor (Camera y Share)**
- **Firebase (Firestore)**
- **API externa**: https://www.balldontlie.io/

---

## 🧩 Estructura del proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── home/
│   │   ├── player-list/
│   │   ├── player-detail/
│   │   ├── favorites/
│   │   └── jugador.model.ts
│   ├── services/
│   │   └── nba.service.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── app.routes.ts
│   ├── app.component.ts
├── assets/
│   ├── img/
│   └── sounds/
├── environments/
├── theme/
└── index.html
```

---

## 🔧 Instalación y configuración

### 1. Clonar repositorio y entrar en el proyecto
```bash
git clone <url-del-repo>
cd m08-UF01-PR01-2-nuriarodriguezvindel
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase (en `src/environments/environment.ts`)
```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT>.firebaseapp.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    appId: "<APP_ID>"
  }
};
```

### 4. Build + Sync con Capacitor
```bash
npm run build
npx cap sync
```

---

## ✨ Funcionalidades implementadas

### ✅ Nivel 1: Login / Registro
- Login con Firebase Auth
- Registro con validación de formulario
- Guardado de usuario y protección con AuthGuard

### ✅ Nivel 2: API externa
- Consumo de la API https://www.balldontlie.io/
- Muestra de jugadores reales junto a 3 fijos (LeBron, Curry, Doncic)

### ✅ Nivel 3: Persistencia
- Guardado de favoritos en **Firestore** (Firebase)
- Consulta y eliminación de favoritos

### ✅ Nivel 4: Funcionalidades nativas
- Cámara (sacar o seleccionar imagen)
- Compartir jugador (modal nativo)
- Sonidos personalizados
- Toasts para acciones

---

## 🔐 Autenticación
- Login / Registro gestionado por Firebase
- Páginas protegidas por AuthGuard

---

## 📲 Plugins Capacitor usados
```bash
npm install @capacitor/camera
npm install @capacitor/share
```

---

## 📷 Assets usados
- Imágenes en `assets/img/`
- Sonidos en `assets/sounds/`

---

## 🧪 Pruebas
- Navegación funcionando correctamente
- Favoritos se guardan y recuperan
- Botón de "Ver detalles" redirige a la ficha del jugador
- Cámara y compartir funcionan como funcionalidades nativas

---

## 📦 Build y despliegue
```bash
npm run build
npx cap sync
npx cap open android # o ios si corresponde
```

---

## 👩🏻 Nuria Rodríguez Vindel
**Asignatura:** M08 - Programación Multimedia y Dispositivos Móviles  
**Práctica:** ICC0008-UF1-PR01.2  
**App:** NBA Rookie App

