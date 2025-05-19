import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  getters: {
    getUser: (state) => state.user,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  actions: {
    setUser(user) {
      this.user = user;
      if (Object.keys(user).length !== 0) {
        localStorage.setItem('pet-user', JSON.stringify(user));
      }
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setError(error) {
      this.error = error;
    },
    logout() {
      this.user = null;
      localStorage.removeItem('pet-user');
    },
  }
});
