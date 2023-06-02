<template>
  <div class="topics flex v-flex j-c-b w-100">
    <aside class="flex v-flex w-100">
        <aside class="navItem flex j-c-b w-100">
            <b>All</b>
            <div class="flex j-c-c p-2" style="min-width: 35px; height: 35px; border-radius: 3px;">45</div>
        </aside>
        <aside class="navItem flex j-c-b w-100">
            <b>Python</b>
            <div class="flex j-c-c p-2" style="min-width: 35px; height: 35px; border-radius: 3px;">10450</div>
        </aside>
        <aside class="navItem flex j-c-b w-100">
            <b>Javascript</b>
            <div class="flex j-c-c p-2" style="min-width: 35px; height: 35px; border-radius: 3px;">28</div>
        </aside>
    </aside>
    
    <div class="otherfile2">
        <OthersVue/>
    </div>

    <div class="logout flex j-c-c w-100">
        <button @click="logout" class="btn btn-danger w-100">Logout</button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import OthersVue from '../otherFiles/Others.vue';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { onUpdated } from 'vue';

export default {
    name: "Topics",
    components: {
        OthersVue
    },
    setup(){
        const store = useAuthStore();
        const userStore = useUserStore();


        const logout = () => {
            if(confirm("Are you sure you want to leave?")){
                useAuthStore().load()
                axios.post(`${store.baseUrl}logout/`, {}, {
                    headers: {
                        Authorization: `Token ${userStore.user?.token}` 
                    }
                }).then(response => {
                        console.log('Logout successful');
                        useAuthStore().logout()
                        useAuthStore().stopLoading()
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Logout failed', error);
                        useAuthStore().stopLoading()
                        
                    });
                }
            
        }

        return {
            logout
        }
    }

}
</script>

<style scoped>
@import url('./topics.css');
</style>