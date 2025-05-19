<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="text-h5 font-weight-bold primary--text">
        {{ isEditing ? 'Editar Mascota' : 'Nueva Mascota' }}
      </v-card-title>
      
      <v-form @submit.prevent="createOrUpdatePet()" ref="form">
        <v-card-text>
          <v-row>
            <!-- Nombre -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="pet.name"
                label="Nombre"
                required
                variant="outlined"
                density="comfortable"
                class="mb-2"
                prepend-inner-icon="mdi-paw"
                clearable
                :error-messages="errors?.name"
              ></v-text-field>
            </v-col>

            <!-- Especie -->
            <v-col cols="12" md="6">
             <v-text-field
                v-model="pet.species"
                label="Especie"
                required
                variant="outlined"
                density="comfortable"
                class="mb-2"
                prepend-inner-icon="mdi-paw"
                clearable
                :error-messages="errors?.species"
              ></v-text-field>
            </v-col>


            <!-- Fecha de Nacimiento -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="pet.birth_date"
                label="Fecha de Nacimiento"
                type="date"
                variant="outlined"
                density="comfortable"
                class="mb-2"
                prepend-inner-icon="mdi-calendar"
                clearable
                :error-messages="errors?.birth_date"
                @click:clear="pet.birth_date = null"
              ></v-text-field>
            </v-col>


            <!-- Raza -->
            <v-col cols="12" md="6">
              <v-text-field
                v-model="pet.breed"
                label="Raza"
                required
                variant="outlined"
                density="comfortable"
                class="mb-2"
                prepend-inner-icon="mdi-paw"
                clearable
                :error-messages="errors?.breed"
              ></v-text-field>
            </v-col>


            <!-- Género -->
            <v-col cols="12" md="6">
              <v-select
                v-model="pet.gender"
                :items="['Macho', 'Hembra']"
                label="Género"
                required
                variant="outlined"
                density="comfortable"
                class="mb-2"
                prepend-inner-icon="mdi-gender-male-female"
                clearable
                :error-messages="errors?.gender"
              ></v-select>
            </v-col>


            <!-- Esterilizado -->
            <v-col cols="12" md="6">
              <v-switch
                v-model="pet.sterilized"
                :label="`Esterilizado: ${pet.sterilized ? 'Sí' : 'No'}`"
                inset
                color="primary"
              ></v-switch>
            </v-col>


            <!-- Descripción -->
            <v-col cols="12">
              <v-textarea
                v-model="pet.description"
                label="Descripción"
                placeholder="Cuéntanos de tu mascota"
                rows="3"
                variant="outlined"
                density="comfortable"
                class="mb-2"
                clearable
                :error-messages="errors?.description"
                persistent-placeholder
              >
                <template v-slot:placeholder>
                  <div class="text-medium-emphasis">Cuéntanos de tu mascota</div>
                </template>
              </v-textarea>
            </v-col>


            <!-- Padecimientos -->
            <v-col cols="12">
              <v-card outlined class="mb-4">
                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Padecimientos
                </v-card-title>
                <v-card-text>
                  <v-row v-for="(condition, index) in pet.conditions" :key="'condition-'+index" class="mb-2 align-center" no-gutters>
                    <v-col cols="10" sm="11" class="pr-2">
                      <v-text-field
                        v-model="condition.name"
                        :label="`Padecimiento ${index + 1}`"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-account-heart"
                        clearable
                        :error-messages="errors?.conditions?.[index]?.name"
                        hide-details="auto"
                        class="w-100"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="1" class="d-flex justify-center">
                      <v-btn
                        v-if="pet.conditions.length > 1 || condition.description"
                        color="error"
                        icon
                        size="small"
                        variant="tonal"
                        @click="removeCondition(index)"
                        class="my-0"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    color="primary"
                    variant="tonal"
                    size="small"
                    @click="addCondition"
                    class="mt-2 w-100"
                    prepend-icon="mdi-plus"
                  >
                    Agregar Padecimiento
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Tratamientos -->
            <v-col cols="12">
              <v-card outlined class="mb-4">
                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Tratamientos
                </v-card-title>
                <v-card-text>
                  <v-row v-for="(treatment, index) in pet.treatments" :key="'treatment-'+index" class="mb-2 align-center" no-gutters>
                    <v-col cols="10" sm="11" class="pr-2">
                      <v-text-field
                        v-model="treatment.name"
                        :label="`Tratamiento ${index + 1}`"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-medical-bag"
                        clearable
                        :error-messages="errors?.treatments?.[index]?.name"
                        hide-details="auto"
                        class="w-100"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" sm="1" class="d-flex justify-center">
                      <v-btn
                        v-if="pet.treatments.length > 1 || treatment.description"
                        color="error"
                        icon
                        size="small"
                        variant="tonal"
                        @click="removeTreatment(index)"
                        class="my-0"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    color="primary"
                    variant="tonal"
                    size="small"
                    @click="addTreatment"
                    class="mt-2 w-100"
                    prepend-icon="mdi-plus"
                  >
                    Agregar Tratamiento
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            class="mr-2"
            variant="tonal"
            @click="$router.go(-1)"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            type="submit"
            :loading="loading"
            variant="tonal"
          >
            {{ isEditing ? 'Actualizar' : 'Guardar' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storePet, updatePet, getPet } from '@/repositories/API_PET';
import { useUserStore } from '@/stores/Auth';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const form = ref(null);
const menu = ref(false);
const loading = ref(false);
const isEditing = ref(false);
const errors = ref(null);
const dateMenu = ref(false);

const store = useUserStore();

const user = computed(() => store.user);

const pet = reactive({
  id: null,
  name: null,
  species: null,
  breed: null,
  gender: null,
  birth_date: null,
  description: null,
  sterilized: false,
  conditions: [{ name: null }],
  treatments: [{ name: null }]
});

const addCondition = () => {
  pet.conditions.push({ name: null });
};

const removeCondition = (index) => {
  if (pet.conditions.length > 1) {
    pet.conditions.splice(index, 1);
  } else if (pet.conditions[0]?.description) {
    pet.conditions[0].name = null;
  }
};

const addTreatment = () => {
  pet.treatments.push({ name: null });
};

const removeTreatment = (index) => {
  if (pet.treatments.length > 1) {
    pet.treatments.splice(index, 1);
  } else if (pet.treatments[0]?.description) {
    pet.treatments[0].name = null;
  }
};

const createOrUpdatePet = async () => {
  loading.value = true;
  try {
    isEditing.value ? await updatePet({
      ...pet,
      user_id: user.value.id
    }) : await storePet({
      ...pet,
      user_id: user.value.id
    });
    ElMessage({
      message: isEditing.value ? 'Mascota actualizada exitosamente' : 'Mascota creada exitosamente',
      type: 'success'
    });
    router.push({ name: 'Dashboard' });
  } catch (error) {
    errors.value = error.response?.data?.errors || {};
    ElMessage({
      message: isEditing.value ? 'Error al actualizar la mascota' : 'Error al crear la mascota',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};

const setPet = (petData) => {
  Object.assign(pet, {
    id: petData.id,
    name: petData.name,
    species: petData.species,
    breed: petData.breed,
    gender: petData.gender,
    birth_date: petData.birth_date ? new Date(petData.birth_date).toISOString().split('T')[0] : null,
    description: petData.description,
    sterilized: petData.sterilized,
    conditions: petData.diseases.map(disease => ({
      name: disease.name,
      treatment: disease.pivot.treatment,
      diagnosis_date: disease.pivot.diagnosis_date ? new Date(disease.pivot.diagnosis_date).toISOString().split('T')[0] : null,
      notes: disease.pivot.notes
    })) || [{ name: null }],
    treatments: petData.treatments.map(treatment => ({
      name: treatment.name,
      start_date: treatment.pivot.start_date ? new Date(treatment.pivot.start_date).toISOString().split('T')[0] : null,
      end_date: treatment.pivot.end_date ? new Date(treatment.pivot.end_date).toISOString().split('T')[0] : null,
      dosage: treatment.pivot.dosage,
      frequency: treatment.pivot.frequency,
      notes: treatment.pivot.notes,
      is_completed: treatment.pivot.is_completed
    })) || [{ name: null }]
  });
};

const loadPet = async (petId) => {
  try {
    const data = await getPet(petId);
    setPet(data);
  } catch (error) {
    ElMessage({
      message: 'Error al cargar los datos de la mascota',
      type: 'error'
    });
    router.go(-1);
  }
};

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    await loadPet(route.params.id);
  }
});

onBeforeUnmount(() => {
  pet.value = {
    id: null,
    name: null,
    species: null,
    breed: null,
    gender: null,
    birth_date: null,
    description: null,
    sterilized: false,
    conditions: [{ name: null }],
    treatments: [{ name: null }]
  };
});
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.v-card__title {
  border-bottom: 1px solid #e0e0e0;
}

.v-card__actions {
  border-top: 1px solid #e0e0e0;
}
</style>
