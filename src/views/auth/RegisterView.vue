<template>
  <v-container fluid class="fill-height bg-gradient-primary">
    <v-responsive class="d-flex align-center justify-center">
      <v-card class="elevation-4" max-width="500" width="100%">
        <!-- Logo y título -->
        <v-card-text class="text-center pt-6">
          <router-link to="/" class="text-decoration-none">
            <v-avatar size="80" color="white" class="elevation-4 mb-3">
              <v-icon size="48" color="primary">mdi-paw</v-icon>
            </v-avatar>
          </router-link>
          <h1 class="text-h5 font-weight-bold mb-1">Crear cuenta</h1>
          <p class="text-body-2 text-medium-emphasis">Completa el formulario para registrarte</p>
        </v-card-text>

        <!-- Formulario -->
        <v-form ref="form" @submit.prevent="registerUser()" class="px-6 pb-6">
          <v-container fluid class="pa-0">
            <!-- Nombre completo -->
            <v-text-field
              v-model="formData.full_name"
              :rules="[rules.required]"
              label="Nombre completo"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account-outline"
              class="mb-4"
              :disabled="loading"
              autocomplete="username"
              required
              validate-on="blur"
            ></v-text-field>

            <!-- Email -->
            <v-text-field
              v-model="formData.email"
              :rules="[rules.required, rules.email]"
              label="Correo electrónico"
              type="email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-email-outline"
              class="mb-4"
              :disabled="loading"
              autocomplete="email"
              required
              validate-on="blur"
            ></v-text-field>

            <!-- Teléfono -->
            <v-text-field
              v-model="formData.phone"
              label="Teléfono"
              type="number"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-phone-outline"
              class="mb-4"
              :disabled="loading"
              autocomplete="phone"
              required
              validate-on="blur"
            ></v-text-field>

            <v-text-field
              v-model="formData.whatsapp"
              label="Whatsapp"
              type="number"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-whatsapp"
              class="mb-4"
              :disabled="loading"
              autocomplete="phone"
              required
              validate-on="blur"
            ></v-text-field>

            <!-- Contraseña -->
            <v-text-field
              v-model="formData.password"
              :rules="[rules.required, rules.minLength]"
              :type="showPassword ? 'text' : 'password'"
              label="Contraseña"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              :disabled="loading"
              autocomplete="new-password"
              class="mb-2"
              required
              validate-on="blur"
              :hint="'Mínimo ' + rules.min + ' caracteres'"
            ></v-text-field>

            <!-- Confirmar contraseña -->
            <v-text-field
              v-model="formData.password_confirmation"
              :rules="[rules.required, rules.confirmPassword]"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Confirmar contraseña"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-lock-check-outline"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              :disabled="loading"
              autocomplete="new-password"
              class="mb-4"
              required
              validate-on="blur"
            ></v-text-field>

            <!-- Imagen de perfil -->
            <v-row class="mb-4">
              <v-col cols="12" class="text-center">
                <div class="text-subtitle-2 mb-2">Foto de perfil (opcional)</div>
                <v-avatar 
                  size="100" 
                  class="elevation-4 mb-2"
                  :class="{ 'cursor-pointer': !loading }"
                  @click="!loading && $refs.fileInput?.click()"
                  :style="{
                    border: '2px dashed #1976d2',
                    background: formData.profile_picture ? 'transparent' : '#f5f5f5',
                    transition: 'all 0.3s ease'
                  }"
                >
                  <v-img
                    v-if="formData.profile_picture"
                    :src="formData.profile_picture"
                    cover
                    :alt="'Foto de perfil de ' + formData.full_name"
                  >
                    <template v-slot:placeholder>
                      <v-skeleton-loader type="image" class="fill-height" />
                    </template>
                  </v-img>
                  <v-icon v-else size="32" color="primary">mdi-account-plus</v-icon>
                </v-avatar>
                
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg, image/webp"
                  style="display: none"
                  @change="handleFileUpload"
                  :disabled="loading"
                />
                
                <div class="mt-2">
                  <v-btn 
                    variant="text" 
                    color="primary" 
                    size="small" 
                    :disabled="loading"
                    @click="$refs.fileInput?.click()"
                  >
                    <v-icon start size="small">mdi-upload</v-icon>
                    {{ formData.profile_picture ? 'Cambiar imagen' : 'Subir imagen' }}
                  </v-btn>
                </div>
                <div class="text-caption text-medium-emphasis mt-1">
                  Formatos: JPG, PNG, JPEG, WebP (Máx. 8MB)
                </div>
              </v-col>
            </v-row>

            <!-- Botón de registro -->
            <div class="d-flex justify-center">
              <v-btn
                type="submit"
                block
                color="primary"
                size="large"
                :loading="loading"
                :disabled="loading"
                class="mb-4"
              >
                Registrarse
              </v-btn>
            </div>

            <!-- Enlace a inicio de sesión -->
            <div class="text-center">
              <span class="text-caption text-medium-emphasis">
                ¿Ya tienes una cuenta?
                <router-link 
                  to="/login" 
                  class="text-primary text-decoration-none font-weight-medium"
                >
                  Inicia sesión
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
import { useSnackbar } from '@/composables/useSnackbar';
import { register, login } from '@/repositories/API_PET';

const loading = ref(false);
const store = useUserStore();
const router = useRouter();
const { showSuccess, showError } = useSnackbar();

const form = ref(null);
const fileInput = ref(null);
const formData = ref({
  full_name: null,
  email: null,
  password: null,
  password_confirmation: null,
  phone: null,
  whatsapp: null,
  profile_picture: null,
});
const imageUpload = ref(null);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const rules = {
  required: value => !!value || 'Este campo es requerido',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Ingresa un correo electrónico válido';
  },
  min: 8,
  minLength: value => value.length >= 8 || `La contraseña debe tener al menos 8 caracteres`,
  confirmPassword: value => value === formData.value.password || 'Las contraseñas no coinciden'
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  imageUpload.value = file;
  if (!file) return;

  // Validar tamaño (máx 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    showError('La imagen no debe pesar más de 2MB');
    return;
  }

  // Validar tipo de archivo
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    showError('Formato de archivo no válido. Usa JPG o PNG');
    return;
  }

  // Crear URL temporal para previsualización
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.value.profile_picture = e.target.result;
  };
  reader.readAsDataURL(file);
};

const registerUser = async () => {
  try {
    loading.value = true;
    await register({
      ...formData.value,
      profile_picture: imageUpload.value
    });
    showSuccess('¡Registro exitoso!');
    await loadLogin();
  } catch (error) {
    errors.value = error?.response?.data?.errors;
  } finally {
    loading.value = false;
  }
};

const loadLogin = async () => {
  try {
    loading.value = true;
    const response = await login({
      email: formData.value.email,
      password: formData.value.password
    });
    store.setUser(response.data);
    router.push({ name: 'Dashboard' });
  } catch (error) {
    showError(error.response?.data?.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
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
