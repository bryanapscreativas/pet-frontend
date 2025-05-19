<template>
  <v-app>
    <v-main>
      <Navbar />
      <v-container fluid class="pa-6">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Navbar from '@/components/dashboard/Navbar.vue';


</script>

<style scoped>
.v-container {
  max-width: 1400px;
}
</style>