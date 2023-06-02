<template>
  <div class="mainContainer container border flex v-flex p-0">
    <Header v-if="store.isHeader"/>
    <router-view/>

    <div v-if="store.isLoading" class="loading flex v-flex a-i-c j-c-c w-100">
      <div class="spinner-border text-primary mb-3" role="status">
        <span style="font-size: larger;" class="sr-only">Loading...</span>
      </div>
      <button class="btn btn-outline-primary" @click="store.stopLoading">Cancel</button>
    </div>

    <AddFile v-if="store.isAdd"/>

  </div>
  
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue';
import WrapperVue from '@/components/wrapper/Wrapper.vue'
import AddFile from './components/AddFile/AddFile.vue';
import { useAuthStore } from './store/auth';
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';


export default {
  name: 'AppView',
  components: {
    Header, WrapperVue, AddFile
  },
  setup(){
    const store = useAuthStore();
    
    const load = ()=>store.load();
    const stopLoading = ()=>store.stopLoading();

    const router = useRouter();
    const route = useRoute();

    // onMounted(() => {
    //   if (!store.isLogin) {
    //     router.push('/login');
    //   }
    //   if(route.path === '/login'){
    //     store.hideHeader()
    //   }
    // });
    watch(() => route.fullPath, (newUrl) => {
      let auths = ['/login','/register']
      // if (!store.isLogin && !auths.includes(route.path)) {
      //   router.push('/login');
      // }
      switch(route.path){
        case '/login':
          store.hideHeader()
          break;
        case '/register':
          store.hideHeader()
          break;
        default:
          store.showHeader()
      }
    });

    return {
      load, stopLoading,store
    }
  }

}
</script>

<style>
.mainContainer{
  height: 100vh;
  width: 100%;
}
@media only screen and (max-width: 992px){
  .mainContainer{
    min-width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
  }
}
.loading{
  position: fixed;
  height: 100vh;
  background: rgba(0, 7, 48, 0.7);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
