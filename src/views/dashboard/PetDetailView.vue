<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5 font-weight-bold primary--text">
        Detalles Mascota
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              color="primary"
              variant="tonal"
              size="small"
              :to="`/dashboard/pets/${pet.id}/edit`"
              class="mt-2 w-100"
              prepend-icon="mdi-pencil"
            >
              Editar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <!-- Nombre -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Nombre</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-paw" class="mr-2"></v-icon>
                {{ pet.name }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Especie -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Especie</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-paw" class="mr-2"></v-icon>
                {{ pet.species }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Fecha de Nacimiento -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Fecha de Nacimiento</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-calendar" class="mr-2"></v-icon>
                {{ getPetAge(pet?.birth_date).display }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Raza -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Raza</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-paw" class="mr-2"></v-icon>
                {{ pet.breed }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Género -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Género</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-gender-male-female" class="mr-2"></v-icon>
                {{ pet.gender }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Esterilizado -->
          <v-col cols="12" md="6">
            <v-list-item>
              <v-list-item-title>Esterilizado</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-toggle-switch" class="mr-2" :class="{ 'text-primary': pet.sterilized }"></v-icon>
                {{ pet.sterilized ? 'Sí' : 'No' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Descripción -->
          <v-col cols="12">
            <v-list-item>
              <v-list-item-title>Descripción</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon icon="mdi-note-text" class="mr-2"></v-icon>
                {{ pet.description }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>

          <!-- Padecimientos -->
          <v-col cols="12">
            <v-card class="mb-2">
              <v-card-title>Padecimientos</v-card-title>
              <v-card-text class="mt-n6">
                <v-list density="compact">
                  <v-list-item
                    v-for="(disease, index) in pet.diseases"
                    :key="disease.id"
                  >
                    <v-list-item-title>#{{ index + 1 }} {{ disease.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Tratamientos -->
          <v-col cols="12">
            <v-card>
              <v-card-title>Tratamientos</v-card-title>
              <v-card-text class="mt-n6">
                <v-list density="compact">
                  <v-list-item
                    v-for="(treatment, index) in pet.treatments"
                    :key="treatment.id"
                  >
                    <v-list-item-title>#{{ index + 1 }} {{ treatment.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPet } from '@/repositories/API_PET.js';
import { getPetAge } from '@/helpers/Index.js';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const pet = ref({});

onMounted(async () => {
  try {
    const data = await getPet(route.params.id);
    pet.value = data;
  } catch (error) {
    ElMessage.error('No se pudo cargar la información de la mascota');
    router.push('/dashboard/pets');
  }
});

</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

.v-card-item {
  padding: 16px;
}

.v-card-text {
  padding: 16px;
}

.v-list-item {
  padding: 8px 16px;
}
</style>
