<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-fade-transition>
        <v-overlay v-if="loading" class="align-center justify-center" opacity="0.8" z-index="10">
          <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        </v-overlay>
      </v-fade-transition>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" lg="10" xl="8">
        <v-card class="elevation-4 overflow-hidden">
          <!-- Encabezado con foto y datos principales -->
          <v-card-title class="primary white--text pa-6">
            <v-avatar color="white" size="100" class="elevation-4 mr-6">
              <v-img v-if="pet.photo_url" :src="pet.photo_url" cover></v-img>
              <v-icon v-else color="primary" size="48">mdi-paw</v-icon>
            </v-avatar>
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <h1 class="text-h4 font-weight-bold mr-2">{{ pet.name }}</h1>
                <v-chip v-if="pet.is_lost" color="error" class="ml-2" small>
                  <v-icon small left>mdi-alert</v-icon> Perdido
                </v-chip>
              </div>
              <div class="text-h6 mt-1">{{ formatSpecies(pet.species) }} • {{ formatBreed(pet.breed) }}</div>
              
              <!-- Info rápida -->
              <div class="d-flex flex-wrap mt-2">
                <div class="d-flex align-center mr-4 mb-1" v-if="pet.gender">
                  <v-icon small class="mr-1">mdi-gender-{{ pet.gender === 'Macho' ? 'male' : 'female' }}</v-icon>
                  <span class="text-caption mt-1">{{ pet.gender ?? 'No especificado' }}</span>
                </div>
              </div>
            </div>
          </v-card-title>

          <!-- Contenido principal -->
          <v-card-text class="pa-6">
            <!-- Sección de información detallada -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-card variant="outlined" class="h-100">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    <v-icon left>mdi-information</v-icon>
                    Información detallada
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-list density="comfortable" class="py-0">
                      <v-list-item v-if="pet.birth_date">
                        <template v-slot:prepend>
                          <v-icon icon="mdi-calendar" class="me-4" color="primary"></v-icon>
                        </template>
                        <v-list-item-title>Fecha de nacimiento</v-list-item-title>
                        <v-list-item-subtitle>{{ formatDate(pet.birth_date) }}</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-needle" class="me-4" color="primary"></v-icon>
                        </template>
                        <v-list-item-title>Esterilizado</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip :color="pet.sterilized ? 'success' : 'grey'" size="small" text-color="white">
                            {{ pet.sterilized ? 'Sí' : 'No' }}
                          </v-chip>
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card variant="outlined" class="h-100">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    <v-icon left>mdi-card-account-details</v-icon>
                    Contacto del dueño
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-list v-if="pet.user" density="comfortable" class="py-0">
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-icon icon="mdi-account" class="me-4" color="primary"></v-icon>
                        </template>
                        <v-list-item-title>Nombre</v-list-item-title>
                        <v-list-item-subtitle>{{ pet.user.full_name }}</v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item v-if="pet.user.phone">
                        <template v-slot:prepend>
                          <v-icon icon="mdi-phone" class="me-4" color="primary"></v-icon>
                        </template>
                        <v-list-item-title>Teléfono</v-list-item-title>
                        <v-list-item-subtitle>
                          <a :href="'tel:' + pet.user.phone" class="text-decoration-none">
                            {{ pet.user.phone }}
                          </a>
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item v-if="pet.user.email">
                        <template v-slot:prepend>
                          <v-icon icon="mdi-email" class="me-4" color="primary"></v-icon>
                        </template>
                        <v-list-item-title>Correo</v-list-item-title>
                        <v-list-item-subtitle>
                          <a :href="'mailto:' + pet.user.email" class="text-decoration-none">
                            {{ pet.user.email }}
                          </a>
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                    <v-alert v-else type="info" variant="tonal" class="mt-2">
                      Información de contacto no disponible
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Sección de salud -->
            <v-row class="mb-6">
              <!-- Padecimientos -->
              <v-col cols="12" md="6">
                <v-card v-if="pet.diseases && pet.diseases.length > 0" variant="outlined" class="h-100">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    <v-icon left color="error">mdi-heart-pulse</v-icon>
                    Padecimientos
                    <v-chip size="small" class="ml-2">{{ pet.diseases.length }}</v-chip>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text class="pa-0">
                    <v-list lines="two" density="comfortable" class="py-0">
                      <v-list-item v-for="(disease, index) in pet.diseases" :key="'disease-'+index" class="border-b">
                        <template v-slot:prepend>
                          <v-avatar color="red-lighten-5" size="40" class="me-4">
                            <v-icon color="error">mdi-heart-broken</v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-medium">{{ disease.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <div v-if="disease.pivot.diagnosis_date" class="text-caption">
                            <v-icon x-small>mdi-calendar</v-icon> {{ formatDate(disease.pivot.diagnosis_date) }}
                          </div>
                          <div v-if="disease.pivot.treatment" class="mt-1">
                            <span class="text-caption font-weight-bold">Tratamiento:</span>
                            <span class="text-caption"> {{ disease.pivot.treatment }}</span>
                          </div>
                        </v-list-item-subtitle>
                        <template v-slot:append v-if="disease.pivot.notes">
                          <v-btn
                            size="small"
                            variant="text"
                            icon="mdi-information"
                            color="info"
                            @click="showNotes(disease.pivot.notes, 'Notas del padecimiento')"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
                <v-alert v-else type="info" variant="tonal" class="mt-4">
                  No se han registrado padecimientos para esta mascota.
                </v-alert>
              </v-col>

              <!-- Tratamientos -->
              <v-col cols="12" md="6">
                <v-card v-if="pet.treatments && pet.treatments.length > 0" variant="outlined" class="h-100">
                  <v-card-title class="text-subtitle-1 font-weight-bold">
                    <v-icon left color="primary">mdi-medical-bag</v-icon>
                    Tratamientos
                    <v-chip size="small" class="ml-2">{{ pet.treatments.length }}</v-chip>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text class="pa-0">
                    <v-list lines="two" density="comfortable" class="py-0">
                      <v-list-item 
                        v-for="(treatment, index) in pet.treatments" 
                        :key="'treatment-'+index" 
                        class="border-b"
                      >
                        <template v-slot:prepend>
                          <v-avatar :color="getTreatmentStatus(treatment.pivot.end_date) ? 'green-lighten-5' : 'blue-lighten-5'" size="40" class="me-4">
                            <v-icon :color="getTreatmentStatus(treatment.pivot.end_date) ? 'success' : 'primary'">
                              {{ getTreatmentStatus(treatment.pivot.end_date) ? 'mdi-check' : 'mdi-progress-clock' }}
                            </v-icon>
                          </v-avatar>
                        </template>
                        <v-list-item-title class="font-weight-medium">
                          {{ treatment.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <div class="d-flex flex-wrap align-center" style="gap: 4px">
                            <v-chip 
                              v-if="treatment.pivot.start_date" 
                              size="x-small" 
                              color="primary" 
                              text-color="white"
                              class="mr-1"
                            >
                              <v-icon start size="small">mdi-calendar-start</v-icon>
                              {{ formatDate(treatment.pivot.start_date) }}
                            </v-chip>
                            <v-chip 
                              v-if="treatment.pivot.end_date" 
                              size="x-small" 
                              :color="getTreatmentStatus(treatment.pivot.end_date) ? 'success' : 'warning'" 
                              text-color="white"
                            >
                              <v-icon start size="small">mdi-calendar-end</v-icon>
                              {{ formatDate(treatment.pivot.end_date) }}
                            </v-chip>
                          </div>
                          <div v-if="treatment.pivot.dosage || treatment.pivot.frequency" class="mt-1">
                            <v-chip v-if="treatment.pivot.dosage" size="x-small" class="mr-1">
                              <v-icon start size="small">mdi-numeric</v-icon>
                              {{ treatment.pivot.dosage }}
                            </v-chip>
                            <v-chip v-if="treatment.pivot.frequency" size="x-small">
                              <v-icon start size="small">mdi-update</v-icon>
                              {{ treatment.pivot.frequency }}
                            </v-chip>
                          </div>
                        </v-list-item-subtitle>
                        <template v-slot:append v-if="treatment.pivot.notes">
                          <v-btn
                            size="small"
                            variant="text"
                            icon="mdi-information"
                            color="info"
                            @click="showNotes(treatment.pivot.notes, 'Notas del tratamiento')"
                          ></v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
                <v-alert v-else type="info" variant="tonal" class="mt-4">
                  No se han registrado tratamientos para esta mascota.
                </v-alert>
              </v-col>
            </v-row>

            <!-- Acciones -->
            <v-card variant="flat" class="elevation-2 rounded-lg mb-4">
              <v-card-actions class="d-flex justify-space-between pa-4">
                <v-btn 
                  variant="elevated" 
                  color="primary" 
                  prepend-icon="mdi-printer"
                  @click="printPage"
                  class="text-none"
                >
                  Imprimir ficha
                </v-btn>
                
                <div class="d-flex" style="gap: 8px">
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon
                        color="green-darken-1"
                        variant="tonal"
                        size="large"
                        :href="whatsappLink"
                        target="_blank"
                      >
                        <v-icon>mdi-whatsapp</v-icon>
                      </v-btn>
                    </template>
                    <span>Compartir por WhatsApp</span>
                  </v-tooltip>
                  
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        icon
                        color="blue-darken-1"
                        variant="tonal"
                        size="large"
                        @click="copyLink"
                      >
                        <v-icon>mdi-link-variant</v-icon>
                      </v-btn>
                    </template>
                    <span>Copiar enlace</span>
                  </v-tooltip>
                </div>
              </v-card-actions>
            </v-card>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Diálogo para mostrar notas -->
  <v-dialog v-model="dialog.visible" max-width="500">
    <v-card>
      <v-card-title class="text-h6">{{ dialog.title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-4">
        {{ dialog.content }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dialog.visible = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Snackbar para notificaciones -->
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="30%"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <span>{{ dialog.content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialog.visible = false">
          Cerrar
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- Notificación de Element Plus -->
  <el-button v-show="false" ref="notificationBtn" @click="showNotification"></el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getPet } from '@/repositories/API_PET';
import { ElNotification } from 'element-plus';

const route = useRoute();
const pet = ref({});
const loading = ref(true);
const dialog = ref({
  visible: false,
  title: '',
  content: ''
});

const notificationBtn = ref(null);

const showNotification = (options = {}) => {
  const defaultOptions = {
    title: 'Notificación',
    message: '',
    type: 'success',
    duration: 3000,
    showClose: true,
    position: 'bottom-right'
  };
  
  ElNotification({
    ...defaultOptions,
    ...options
  });
};

// Formateadores
const formatDate = (dateString) => {
  if (!dateString) return 'No especificada';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  } catch (e) {
    return dateString; // Si hay un error, devolver el string original
  }
};

const formatSpecies = (species) => {
  if (!species) return 'No especificada';
  return species.charAt(0).toUpperCase() + species.slice(1);
};

const formatBreed = (breed) => {
  return breed || 'Raza no especificada';
};

// Verificar si un tratamiento está completo
const getTreatmentStatus = (endDate) => {
  if (!endDate) return false;
  try {
    return new Date(endDate) < new Date();
  } catch (e) {
    return false;
  }
};

// Mostrar notas en un diálogo
const showNotes = (content, title = 'Notas') => {
  dialog.value = {
    visible: true,
    title,
    content
  };
};

// Acciones
const printPage = () => {
  window.print();
};

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showNotification({
      title: 'Éxito',
      message: 'Enlace copiado al portapapeles',
      type: 'success'
    });
  }).catch(err => {
    console.error('Error al copiar el enlace:', err);
    showNotification({
      title: 'Error',
      message: 'No se pudo copiar el enlace',
      type: 'error'
    });
  });
};

// Enlace de WhatsApp
const whatsappLink = computed(() => {
  const petName = pet.value?.name || 'esta mascota';
  const text = `Mira la información de ${petName} en PetBase: ${window.location.href}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
});

// Cargar datos de la mascota
const loadPet = async () => {
  try {
    loading.value = true;
    const data = await getPet(route.params.id);
    pet.value = data;
  } catch (error) {
    ElNotification({
      message: 'No se pudo cargar la información de la mascota',
      type: 'error'
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadPet();
});
</script>

<style scoped>
/* Estilos específicos para la vista de impresión */
@media print {
  .v-application {
    background: white !important;
  }
  
  .v-card {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
  }
  
  .v-btn {
    display: none !important;
  }
  
  .v-expansion-panel-title {
    min-height: auto !important;
    padding: 8px 16px !important;
  }
  
  .v-expansion-panel-text__wrapper {
    padding: 0 !important;
  }
}
</style>
