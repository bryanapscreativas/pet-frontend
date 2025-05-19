<template>
  <v-container class="fill-height pa-4" fluid>
    <v-responsive class="d-flex align-center justify-center" max-width="1200">
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <!-- Logo -->
          <v-avatar 
            size="100" 
            size-sm="120"
            class="elevation-4 mb-4 mb-sm-6"
          >
            <v-icon size="60" size-sm="80" color="primary">mdi-paw</v-icon>
          </v-avatar>

          <!-- Título -->
          <h1 class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 font-weight-bold mb-2 mb-sm-3">
            Bienvenido a <span class="text-primary">Tu mascota</span>
          </h1>
          
          <p class="text-body-2 text-sm-subtitle-1 text-medium-emphasis mb-6 mb-sm-8">
            Tu mejor compañero en la salud de tus mascotas.
          </p>

          <!-- Botones -->
          <v-row justify="center" class="px-2">
            <v-col cols="12" sm="auto" class="py-1">
              <v-btn
                to="/login"
                color="primary"
                size="x-large"
                block
                class="px-sm-8"
                elevation="0"
                height="48"
              >
                Iniciar sesión
              </v-btn>
            </v-col>
            
            <v-col cols="12" sm="auto" class="py-1">
              <v-btn
                to="/register"
                variant="outlined"
                color="primary"
                size="x-large"
                block
                class="px-sm-8"
                elevation="0"
                height="48"
              >
                Registrarse
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  const userSession = window.localStorage.getItem("pet-user");
  if (userSession) {
    router.push("/dashboard");
  }
});

</script>

<style scoped>
/* Ajustes para pantallas pequeñas */
@media (max-width: 600px) {
  .v-container {
    padding: 16px !important;
  }
  
  .v-btn {
    font-size: 1rem !important;
    letter-spacing: normal !important;
  }
}

/* Asegurar que el contenedor ocupe toda la altura */
.fill-height {
  min-height: calc(100vh - 64px); /* Resta la altura del app-bar si lo tienes */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
