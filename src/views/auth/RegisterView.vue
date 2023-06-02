<template>
      <div class="authContainer flex a-i-s">
        <section class="authleft">
            <img src="https://images.unsplash.com/photo-1581092568395-d68050c2ab43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" alt="" class="img-fit">
        </section>
        <section class="authright flex v-flex a-i-c j-c-c">
            <h1>Register</h1><br><br>
                <form @submit.prevent="register" action="" class=" flex v-flex a-i-c">
                    <small class="" style="width: 80%">Register by providing the following informations to join</small>
                    <br>
                    <div class="flex mb-4">
                        <i class="fa fa-user auth-icon"></i>
                        <input v-model="details.username" type="text" class="input-border flex j-c-c" placeholder="Username">
                    </div>
                    <div class="flex mb-4">
                        <i class="fa fa-envelope auth-icon"></i>
                        <input v-model="details.email" type="email" class="input-border flex j-c-c" placeholder="Email">
                    </div>
                    <div class="flex mb-4">
                        <i class="fa fa-lock auth-icon"></i>
                        <input v-model="details.password" type="password" class="input-border flex j-c-c" placeholder="Password">
                    </div>
                    <div class="flex mb-3 w-50">
                        <button class="btn btn-outline-primary w-100">Register</button>
                    </div>
                </form>
                <p>Already having account? <router-link to="/login">Login</router-link></p>
        </section>
      </div>
</template>

<script>
import axios from 'axios'
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default ({
    name: 'RegisterView',
    components: {

    },
    setup() {
        const store = useAuthStore();
        const details = ref({ "email": '', "password": '', "username":'' })

        const router = useRouter()
        const register = (e) => {
            e.preventDefault()
            store.load();

            const userDetails = {
                username: details.value.username,
                email: details.value.email,
                password: details.value.password,
            };

            axios.post('http://127.0.0.1:8000/api/register/', userDetails)
                .then(response => {
                    store.stopLoading();
                    router.push('/login')
                })
                .catch(error => {
                    store.stopLoading();
                    console.error(error);
                });
        }


        return {
            details: details.value,
            register
        };
    },
});
</script>

<style>
@import url('./style.css');

</style>