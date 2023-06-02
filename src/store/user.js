import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) ?? null
  }),
  getters: {
    getUser() {
      return this.user
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
});
