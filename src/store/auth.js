import { defineStore } from 'pinia';
import { onMounted } from 'vue';
import { useUserStore } from './user';


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAdd: false,
    isHeader: true,
    isLoading: false,
    isLogin: Boolean(localStorage.getItem('isLogin')) ?? false,
    token: null,
    baseUrl: "https://cred.up.railway.app/api/",
    fileAccessUrl: "https://cred.up.railway.app",
    headers: {
              'Authorization': `Token ${useUserStore().user?.token}`,
              'Content-Type': 'multipart/form-data',
          },
  }),
  getters: {
    userLogin: (state) => state.isLogin,
    useToken: (state) => state.token
  },
  actions: {
    login() {
      this.isLogin = true;
      localStorage.setItem('isLogin', true)
    },
    logout() {
      this.isLogin = false;
      localStorage.setItem('isLogin', false)
    },
    setToken(token) {
      this.token = token;
    },
    load() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
    hideHeader() {
      this.isHeader = false;
    },
    showHeader() {
      this.isHeader = true;
    },
    add() {
      this.isAdd = true;
    },
    cancel() {
      this.isAdd = false;
    },
  },
});
