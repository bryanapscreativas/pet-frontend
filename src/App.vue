<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from './stores/Auth';

const userStore = useUserStore();

// Verificar autenticación al cargar la aplicación
onMounted(() => {
  const user = localStorage.getItem('pet-user');
  if (user) {
    userStore.setUser(JSON.parse(user));
  }
});
</script>

<style>
/* Estilos globales */
:root {
  --v-layout-top: 0px !important;
}

* {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  height: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
}

/* Asegurar que la aplicación ocupe toda la altura de la pantalla */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Mejoras para móviles */
@media (max-width: 600px) {
  .v-container {
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
  
  .v-card {
    border-radius: 0 !important;
  }
}

/* Estilos para inputs en iOS */
input, textarea, button, select, a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

/* Mejorar la legibilidad en móviles */
.v-field__input {
  font-size: 16px !important; /* Evita el zoom en iOS */
}

/* Asegurar que los botones sean fáciles de tocar */
.v-btn {
  min-height: 44px !important;
  min-width: 44px !important;
}

/* Mejorar el espaciado en móviles */
.v-card-text {
  padding: 16px !important;
}

@media (max-width: 600px) {
  .v-card-text {
    padding: 12px !important;
  }
}

/* Ajustes para el teclado en móviles */
.v-overlay__content {
  max-height: 100% !important;
}

/* Mejorar el rendimiento de animaciones */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>