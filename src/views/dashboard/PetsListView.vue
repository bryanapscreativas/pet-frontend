<template>
  <v-container>
    <v-card class="mx-auto" max-width="1200">
      <v-card-title>
        <v-row>
          <v-col cols="6">
            <h1 class="text-h5 font-weight-bold mt-2">Mis Mascotas</h1>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="primary"
              :to="'/dashboard/pets/new'"
            >
              Nueva Mascota
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <!-- Lista de mascotas -->
          <v-col cols="12">
            <v-list density="compact">
              <v-list-item
                v-for="pet in filteredPets"
                :key="pet?.id"
                :to="`/dashboard/pets/${pet?.id}`"
                class="mb-2"
              >
                <v-list-item-title>
                  <v-row align="center">
                    <v-col cols="auto">
                      <v-icon icon="mdi-paw" class="mr-2"></v-icon>
                      {{ pet?.name }}
                    </v-col>
                    <v-col cols="auto">
                      <span class="text-caption">{{ pet?.breed }} • {{ getPetAge(pet?.birth_date).display }}</span>
                    </v-col>
                  </v-row>
                </v-list-item-title>
                
                <v-list-item-subtitle>
                  <v-row>
                    <v-col cols="12" sm="6" class="mt-3">
                      <h3>Padecimientos</h3>
                      <v-chip-group column>
                        <v-chip
                          v-for="disease in pet?.diseases"
                          :key="disease?.id"
                          color="warning"
                          size="small"
                          class="mb-1"
                        >
                          {{ disease?.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <h3>Tratamientos</h3>
                      <v-chip-group column>
                        <v-chip
                          v-for="treatment in pet?.treatments"
                          :key="treatment?.id"
                          :color="treatment?.pivot?.is_completed ? 'success' : 'info'"
                          size="small"
                          class="mb-1"
                        >
                          {{ treatment?.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    icon
                    size="small"
                    :to="`/dashboard/pets/${pet?.id}/edit`"
                    class="ml-2"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserPets } from '@/repositories/API_PET.js';
import { getPetAge } from '@/helpers/Index.js';
import { useUserStore } from '@/stores/Auth';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loading = ref(true);
const errors = ref(null);
const pets = ref([]);
const search = ref('');

onMounted(async () => {
  try {
    const response = await getUserPets({ id: user.value?.id });
    pets.value = response?.data?.pets;
  } catch (error) {
    errors.value = error?.response?.data?.errors || 'Error al cargar las mascotas';
  } finally {
    loading.value = false;
  }
});

const filteredPets = computed(() => {
  if (!search.value) return pets.value;
  const searchTerm = search.value.toLowerCase();
  return pets.value.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm) ||
    pet.breed.toLowerCase().includes(searchTerm) ||
    pet.species.toLowerCase().includes(searchTerm)
  );
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

.v-chip {
  font-size: 0.75rem;
}
</style>
