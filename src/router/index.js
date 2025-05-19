import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import DashboardView from '../views/dashboard/DashboardView.vue';
import PetsView from '../views/dashboard/PetsView.vue';
import PetDetailView from '../views/dashboard/PetDetailView.vue';
import PetsListView from '../views/dashboard/PetsListView.vue';
import ProfileForm from '../views/dashboard/ProfileForm.vue';
import PetPublicView from '../views/public/PetPublicView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView
      },
      {
        path: 'pets',
        name: 'Pets',
        component: PetsListView
      },
      {
        path: 'pets/new',
        name: 'NewPet',
        component: PetsView
      },
      {
        path: 'pets/:id/edit',
        name: 'EditPet',
        component: PetsView,
        props: true
      },
      {
        path: 'pets/:id',
        name: 'PetDetail',
        component: PetDetailView,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileForm,
      },
    ],
  },
  {
    path: '/pet/:id',
    name: 'PetPublic',
    component: PetPublicView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard de navegación
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('pet-user');
  
  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && user) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;