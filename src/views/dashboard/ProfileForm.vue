<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <h2>Mi perfil</h2>
      <v-btn
        v-if="!isEditing"
        color="primary"
        @click="toggleEdit"
        prepend-icon="mdi-pencil"
      >
        Editar
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div v-if="!isEditing">
            <div class="d-flex align-center mb-2">
              <v-icon>mdi-account</v-icon>
              <span class="ml-2">{{ user.full_name }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon>mdi-email</v-icon>
              <span class="ml-2">{{ user.email }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon>mdi-phone</v-icon>
              <span class="ml-2">{{ user.phone }}</span>
            </div>
            <div class="d-flex align-center mb-2">
              <v-icon>mdi-whatsapp</v-icon>
              <span class="ml-2">{{ user.whatsapp }}</span>
            </div>
          </div>
          <v-form @submit.prevent="updateUser()" v-else>
            <v-text-field
              v-model="formData.full_name"
              label="Nombre completo"
              :error-messages="errors.full_name"
              required
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              label="Correo electrónico"
              type="email"
              :error-messages="errors.email"
              required
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="formData.phone"
              label="Teléfono"
              type="tel"
              :error-messages="errors.phone"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>

            <v-text-field
              v-model="formData.whatsapp"
              label="WhatsApp"
              type="tel"
              :error-messages="errors.whatsapp"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            ></v-text-field>
          </v-form>
        </v-col>

        <v-col cols="12" md="6" class="mt-n6">
          <v-card v-if="isEditing" class="mb-4">
            <v-card-title>Cambiar contraseña</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="formData.password"
                label="Contraseña actual"
                type="password"
                :error-messages="errors.password"
                variant="outlined"
                density="comfortable"
                class="mb-2"
              ></v-text-field>

              <v-text-field
                v-model="formData.password_confirmation"
                label="Confirmar nueva contraseña"
                type="password"
                :error-messages="errors.password_confirmation"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-card-text>
          </v-card>

          <v-card>
            <v-card-title>Foto de perfil</v-card-title>
            <v-card-text>
              <v-file-input
                v-if="isEditing"
                v-model="formData.profile_picture"
                label="Seleccionar imagen"
                class="mb-2"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                variant="outlined"
                density="comfortable"
                :error-messages="errors.profile_picture"
              ></v-file-input>

              <template v-if="!isEditing && formData?.profile_picture_path">
                <v-img
                  :src="formData?.profile_picture_url"
                  max-height="200"
                  class="mt-n4 rounded"
                ></v-img>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions v-if="isEditing" class="pa-4">
      <v-spacer></v-spacer>
      <v-btn
        variant="text"
        @click="cancelEdit"
        prepend-icon="mdi-cancel"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="primary"
        @click="updateUser"
        :loading="loading"
        prepend-icon="mdi-content-save"
      >
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/Auth';
import { ElMessage } from 'element-plus';
import { getUser, updateProfile } from '@/repositories/API_PET';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();
const loading = ref(false);
const errors = ref({});

const user = computed(() => store.getUser);
const isEditing = ref(false);

const formData = ref({});

const toggleEdit = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const updateUser = async () => {
  loading.value = true;
  errors.value = {};
  
  try {
    await updateProfile({
      id: user.value.id,
      ...formData.value,
    });
    ElMessage({
      message: 'Perfil actualizado exitosamente',
      type: 'success'
    });
    router.push({ name: 'Dashboard' });
  } catch (error) {
    errors.value = error.response?.data?.errors || {};
  } finally {
    loading.value = false;
  }
};

const loadUser = async () => {
  if (!user.value.id) return;
  const response = await getUser(user.value.id);
  formData.value = response.data;
};

onMounted(async () => {
  await loadUser();
});
</script>
