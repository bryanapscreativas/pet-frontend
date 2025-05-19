<template>
  <v-container fluid class="fill-height bg-gradient-primary">
    <v-responsive class="d-flex align-center justify-center">
      <v-card class="elevation-4" max-width="450" width="100%">
        <!-- Logo y título -->
        <v-card-text class="text-center pt-6">
          <router-link to="/" class="text-decoration-none">
            <v-avatar size="80" color="white" class="elevation-4 mb-3">
              <v-icon size="48" color="primary">mdi-paw</v-icon>
            </v-avatar>
          </router-link>
          <h1 class="text-h5 font-weight-bold mb-1">Iniciar sesión</h1>
          <p class="text-body-2 text-medium-emphasis">Ingresa a tu cuenta</p>
        </v-card-text>

        <!-- Formulario -->
        <v-form ref="form" @submit.prevent="loadLogin()" class="px-6 pb-6">
          <v-container fluid class="pa-0">
            <!-- Email -->
            <v-text-field
              v-model="formData.email"
              label="Correo electrónico"
              type="email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-email-outline"
              class="mb-2"
              required
              validate-on="blur"
              :error-messages="errors?.email"
            ></v-text-field>

            <!-- Contraseña -->
            <v-text-field
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              class="mb-2"
              required
              validate-on="blur"
              :error-messages="errors?.password"
            ></v-text-field>

            <div class="d-flex justify-end mb-2 mt-n3">
              <router-link 
                to="/forgot-password" 
                class="text-caption text-decoration-none"
              >
                ¿Olvidaste tu contraseña?
              </router-link>
            </div>

            <!-- Botón de inicio de sesión -->
            <div class="d-flex justify-center">
              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                :loading="loading"
                :disabled="loading"
                class="mt-4 mb-4"
              >
                Iniciar sesión
              </v-btn>
            </div>

            <!-- Enlace a registro -->
            <div class="text-center">
              <span class="text-caption text-medium-emphasis">
                ¿No tienes una cuenta?
                <router-link 
                  to="/register" 
                  class="text-primary text-decoration-none font-weight-medium"
                >
                  Regístrate
                </router-link>
              </span>
            </div>
          </v-container>
        </v-form>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/Auth';
import { login } from '@/repositories/API_PET';
import { ElMessage } from 'element-plus';

const router = useRouter();
const store = useUserStore();

const form = ref(null);
const formData = ref({
  email: null,
  password: null,
});

const showPassword = ref(false);
const loading = ref(false);
const errors = ref(null);

const loadLogin = async () => {
  try {
    loading.value = true;
    const response = await login(formData.value);
    store.setUser(response.data);
    ElMessage.success('¡Bienvenido de nuevo!');
    await router.push('/dashboard');
  } catch (error) {
    errors.value = error?.response?.data?.errors;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}
</style>
