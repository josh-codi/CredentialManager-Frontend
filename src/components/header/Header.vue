<template>
  <div class="header flex j-c-b p-3 w-100">
    <section class="flex">
        <div class="round" style="width: 40px; height: 40px; overflow: hidden; margin-right: 0.5rem;">
            <img src="https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" class="img-fit">
        </div>
        <h4>CredMag</h4>
        <div class="flex header-search">
            <div class="flex j-c-c search-icon">
                <i class="fa fa-search"></i>
            </div>
        
            <input type="text" placeholder="Search...">
        </div>
    </section>
    <section class="flex">
        <div class="avatar round">
            <img src="https://media.licdn.com/dms/image/C4E03AQEHtfxb7i8Ckw/profile-displayphoto-shrink_800_800/0/1660656098725?e=2147483647&v=beta&t=ordJONiGc0PGZ8fKqT50tWshPlYTq8INmwpH74FWLPQ" alt="" class="img-fit">
        </div>
        <div class="flex v-flex">
            <h5>{{ userStore.user?.username ?? 'User'}}</h5>
            <small>@{{ userStore.user?.email ?? 'user@email.com'}}</small>
        </div>
    </section>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user';
export default {
    props:{
        
    },
    setup(){
        const userStore = useUserStore();

        return {
            userStore
        }
    }
}
</script>

<style scoped>
@import url('./header.css');



</style>