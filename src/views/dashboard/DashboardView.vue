<template>
  <div class="dashboard-container">
    <!-- Header with greeting -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" sm="8">
        <h1 class="text-body-1 font-weight-bold mb-1">Bienvenido, {{ user?.full_name || 'Usuario' }} 👋</h1>
        <div class="d-flex flex-column flex-sm-row align-start">
          <div class="text-body-2 text-medium-emphasis">
            {{ user?.email }}
            <template v-if="user?.pets && user?.pets.length > 0">
              <br class="d-block d-sm-none">
              <span class="text-caption">{{ user?.pets.length }} mascota{{ user?.pets.length !== 1 ? 's' : '' }} registrada{{ user?.pets.length !== 1 ? 's' : '' }}</span>
            </template>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="text-sm-right">
        <v-chip
          color="primary"
          variant="tonal"
          size="small"
          prepend-icon="mdi-calendar"
          class="mt-n2 mt-sm-0"
        >
          {{ new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </v-chip>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mb-6 mt-n6">
      <!-- Pets Card -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="h-100" elevation="2" :ripple="false">
          <v-card-text class="pa-4">
            <v-row no-gutters align="center">
              <v-col cols="auto" class="mr-4">
                <v-avatar color="primary" size="48" class="elevation-1">
                  <v-icon icon="mdi-paw" size="24" color="white"></v-icon>
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-subtitle-2 text-medium-emphasis">Mascotas registradas</div>
                <div class="d-flex align-center">
                  <span class="text-h5 font-weight-bold mr-2">{{ stats.pets || 0 }}</span>
                  <v-chip
                    v-if="stats.petsGrowth"
                    :color="stats.petsGrowth >= 0 ? 'success' : 'error'"
                    size="x-small"
                    class="font-weight-bold"
                  >
                    {{ stats.petsGrowth >= 0 ? '+' : '' }}{{ stats.petsGrowth }}%
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="px-4 py-2 bg-grey-lighten-4">
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              size="small"
              to="/dashboard/pets"
              density="comfortable"
            >
              Ver todas
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mascotas recientes -->
    <v-row class="mb-6 mt-n6">
      <v-col cols="12">
        <v-card elevation="1" rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">Mis Mascotas</span>
            <v-btn
              color="primary"
              variant="tonal"
              size="small"
              prepend-icon="mdi-plus"
              @click="gotoPets()"
            >
              Agregar Mascota
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row v-if="!loading && pets.length > 0">
              <v-col
                v-for="pet in pets.slice(0, 4)"
                :key="pet?.id"
                cols="12"
                sm="6"
                md="3"
              >
                <v-card class="h-100 elevation-1 mt-n3">
                  <v-card-title class="text-h6 mb-2">
                    <div class="d-flex align-center">
                      <span class="mr-2">{{ pet?.name }}</span>
                      <v-chip
                        size="small"
                        :color="getPetTypeColor(pet?.species)"
                        class="text-white"
                      >
                        {{ pet?.species }}
                      </v-chip>
                    </div>
                  </v-card-title>
                  <v-card-text class="pb-0">
                    <v-row dense>
                      <v-col cols="12" class="pb-0">
                        <div class="d-flex align-center">
                          <v-icon small class="mr-2">mdi-cake-variant</v-icon>
                          <span>{{ getPetAge(pet?.birth_date).display }}</span>
                        </div>
                      </v-col>
                      <v-col cols="12" class="pb-0">
                        <div class="d-flex align-center">
                          <v-icon small class="mr-2">mdi-dog-side</v-icon>
                          <span>{{ pet?.breed }}</span>
                        </div>
                      </v-col>
                      <v-col cols="12" class="pb-0">
                        <div class="d-flex align-center">
                          <v-icon small class="mr-2">mdi-gender-male-female</v-icon>
                          <span>{{ pet?.gender }}</span>
                        </div>
                      </v-col>
                      <v-col cols="12" class="pb-0">
                        <div class="d-flex align-center">
                          <v-icon small class="mr-2">mdi-information-outline</v-icon>
                          <span>{{ pet?.description || 'Sin descripción' }}</span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider class="my-2"></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      size="small"
                      variant="text"
                      :to="`/dashboard/pets/${pet?.id}`"
                      class="text-primary mt-n5"
                    >
                      <v-icon small class="mr-1">mdi-chevron-right</v-icon>
                      Ver más
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col v-if="pets.length > 4" cols="12" class="text-center">
                <v-btn
                  variant="text"
                  color="primary"
                  to="/dashboard/pets"
                  class="mt-2"
                >
                  Ver todas las mascotas ({{ pets.length }})
                </v-btn>
              </v-col>
            </v-row>
            <v-alert
              v-else
              type="info"
              variant="tonal"
              class="my-4"
            >
              No tienes mascotas registradas. 
              <router-link to="/dashboard/pets/new">Agrega tu primera mascota</router-link>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { getUserPets } from '@/repositories/API_PET';
import { useUserStore } from '@/stores/Auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { getPetAge } from '@/helpers/Index.js';

const { mobile } = useDisplay();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const router = useRouter(); 

const loading = ref(true);
const error = ref(null);
const pets = ref([]);

const gotoPets = () => {
  router.push({name: 'NewPet'});
};

// Stats
const stats = computed(() => ({
  pets: pets.value.length,
  petsGrowth: 0,
}));

const getPetTypeColor = (type) => {
  const colors = {
    'Perro': 'blue',
    'Gato': 'orange',
    'Ave': 'green',
    'Pez': 'cyan',
    'Roedor': 'brown',
    'Reptil': 'teal',
    'Otro': 'grey'
  };
  return colors[type] || 'grey';
};

// Load dashboard data
const loadDashboardData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await getUserPets({ id: user.value?.id });
    pets.value = response?.data?.pets || [];
  } catch (err) {
    error.value = err.message || 'Error al cargar las mascotas';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDashboardData();
});
</script>