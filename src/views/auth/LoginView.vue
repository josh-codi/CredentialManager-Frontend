<template>
  <div class="authContainer flex a-i-s">
    <section class="authleft">
        <img src="https://images.unsplash.com/photo-1581092568395-d68050c2ab43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="" class="img-fit">
    </section>
    <section class="authright flex v-flex a-i-c j-c-c">
        <h1>Login</h1><br><br>
        <form @submit.prevent="login" action="" class="login flex v-flex a-i-c">
            <h4>Welcome Back</h4>
            <br>
            <div class="flex mb-3">
                <i class="fa fa-envelope auth-icon"></i>
                <input v-model="details.email" type="email" class="input-border flex j-c-c" placeholder="Enter email">
            </div>
            <div class="flex mb-5">
                <i class="fa fa-lock auth-icon"></i>
                <input v-model="details.password" type="password" class="input-border flex j-c-c" placeholder="Enter password">
            </div>
            <div class="flex mb-3 w-50">
                <button class="btn btn-outline-primary w-100">Login</button>
            </div>
        </form>

        <p>Not having an account yet? <router-link to="/register">Register</router-link></p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user'
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default ({
    name: 'LoginView',
    components: {

    },
    setup() {
        const store = useAuthStore();
        const userStore = useUserStore();

        const isLogin = store.isLogin;
        const router = useRouter()
        const route = useRoute()
        
        const details = ref({"email": '', "password": ''})

        // watch(() => route.fullPath, (newUrl) =>{
        //     let auths = ['/login', '/register']
        //     if (store.isLogin && auths.includes(route.path)) {
        //         router.back();
        //     }
        // })
        onMounted(()=>{
            localStorage.clear()
            store.logout()
        })

        const login = (e) => {
            e.preventDefault()
            store.load();

            const userDetails = {
                "email": details.value.email,
                "password": details.value.password,
            };
            axios.post(`${store.baseUrl}login/`, userDetails)
                .then(res => {
                    store.login();
                    userStore.setUser(res.data)

                    store.stopLoading();
                    router.push('/')
                })
                .catch(error => {
                    console.error(error);
                    store.stopLoading();
                });
        }


        return {
            isLogin,
            details: details.value,
            login
        };
    },
});
</script>

<style scoped>
@import url('./style.css');
.login *{
    background: transparent;
}
input{
    background: blue !important;
}

</style>