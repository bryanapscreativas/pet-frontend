<template>
  <v-app-bar
    color="white"
    elevation="1"
    density="compact"
    class="px-3"
    :class="{ 'mobile-navbar': mobile }"
  >
    <!-- Logo -->
    <v-app-bar-title class="d-flex align-center">
      <v-avatar size="35" class="border-primary">
        <v-icon size="24" color="primary">mdi-paw</v-icon>
      </v-avatar>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Menú de usuario -->
    <v-menu
      location="bottom"
      transition="slide-y-transition"
      offset="16"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none"
          min-width="auto"
        >
          <v-avatar
            size="36"
            class="mr-2"
          >
            <v-img
              :src="user.profile_picture_path || 'https://ui-avatars.com/api/?name=' + user.full_name"
              alt="Avatar"
              cover
            ></v-img>
          </v-avatar>
          <span class="text-body-2 font-weight-medium">{{ user.full_name }}</span>
        </v-btn>
      </template>

      <v-list density="compact" class="py-2">
        <v-list-item
          prepend-icon="mdi-paw"
          title="Dashboard"
          to="/dashboard"
          class="px-4"
        >
          <template v-slot:prepend>
            <v-icon size="24">mdi-paw</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="Mi perfil"
          :to="{ name: 'Profile' }"
          class="px-4 mb-2"
        />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar sesión"
          @click="logout()"
          class="px-4"
        >
          <template v-slot:prepend>
            <v-icon size="24">mdi-logout</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/Auth';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const router = useRouter();
const store = useUserStore();
const user = computed(() => store.getUser || { full_name: 'Usuario' });

const logout = () => {
  store.logout();
  router.push({name: 'Home'});
};
</script>

<style scoped>
.v-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.mobile-navbar {
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
}

.border-primary {
  border: 2px solid #000000;
}

.v-list-item {
  min-height: 48px !important;
}

.v-list-item__title {
  font-size: 0.95rem !important;
}

.v-list-item__subtitle {
  font-size: 0.85rem !important;
}

.v-app-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
}

.v-app-bar .v-btn {
  min-width: 0 !important;
}

.v-app-bar .v-menu {
  min-width: 0 !important;
}

.v-list-item {
  min-height: 48px !important;
}

.v-list-item__title {
  font-size: 0.95rem !important;
}

.v-list-item__subtitle {
  font-size: 0.85rem !important;
}
</style>