# 🏀 NBA Rookie App – Nuria Rodríguez Vindel

Esta app híbrida desarrollada con **Ionic + Angular** permite explorar jugadores de la NBA, consultar su información personal, interactuar con botones de cámara y compartir, y ver el detalle completo de cada jugador.

## 📱 Funcionalidades implementadas (Nivel 1)

- ✅ **Login y registro de usuario**
- ✅ **Pantalla principal con lista de jugadores**
- ✅ **Datos personales de cada jugador (nombre, equipo, altura, peso, etc.)**
- ✅ **Botón de cámara** con efecto visual y sonido
- ✅ **Botón de compartir** con mensaje y sonido
- ✅ **Indicador de jugador favorito (estrella)**
- ✅ **Botón para ir a favoritos**
- ✅ **Página de detalle del jugador**, con:
  - Información adicional: país, número y posición
  - Botón para marcar como favorito desde el detalle
  - Botón para compartir desde el detalle
  - Botón para volver a la lista---

---

## 🧩 Funcionalidades implementadas

- ✅ Login y registro de usuario con validaciones.
- ✅ Lista de jugadores con:
  - Nombre, apellidos, altura, peso y equipo.
  - Botón 📸 cámara que simula captura (con sonido y texto).
  - Botón 📤 compartir (con sonido, mensaje y funcionalidad real con Capacitor).
- ✅ Página de detalle de cada jugador:
  - Información adicional: país, número y posición.
  - Imagen del jugador.
  - Botón para marcar como favorito.
- ✅ Soporte de temas claro/oscuro.
- ✅ Estilo responsive adaptado a móvil y escritorio.

---

## 🛠️ Tecnologías usadas

- **Ionic Framework** 7
- **Angular** 15+
- **Capacitor** (para cámara y compartir)
- SCSS con variables de Ionic
- Soporte nativo preparado para Android Studio

---

## 📲 Instalación y ejecución local

```bash
git clone https://github.com/NuriaRodvin/M08-UF1-PR01-nuriarodriguezvindel.git
cd M08-UF1-PR01-nuriarodriguezvindel
npm install
ionic serve


📦 Capacitor (para funcionalidades nativas)
bash

npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android



🔊 Recursos multimedia
Las imágenes de jugadores se encuentran en src/assets/img/

Los sonidos de los botones están en src/assets/sounds/ como:

camera.mp3

share.mp3

✨ Autora
Nuria Rodríguez Vindel
Proyecto desarrollado para el módulo M08 – Unidad UF1
Ciclo Formativo de Grado Superior


## 🛠️ Tecnologías usadas

- [Ionic Framework](https://ionicframework.com/)
- Angular
- Capacitor Plugins: `@capacitor/camera`, `@capacitor/share`
- HTML5 + SCSS


