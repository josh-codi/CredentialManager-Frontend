<template>
  <div :key="store.isLoading" class="otherfiles w-100">
    <aside class="otherHeader w-100 flex j-c-c">
        <h5>Other Files</h5>
    </aside>
    <aside class="flex p-2" style="text-align: left">
        <small class="w-100">You can request for other files from other users</small>
    </aside>
    <section class="flex v-flex p-3">
        <div v-for="(file, id) in unrequestedPublicFiles" :key="id" class="thefile flex v-flex w-100 p-2" style="border-radius: 5px;">
            <div class="w-100 flex">
                <aside class="round shadow mr-1" style="width: 30px; height: 30px;">
                    <img src="https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" class="img-fit">
                </aside>
                <small> By: {{file.creator.username}}</small>
            </div>
            <b>{{ file.fileName }}</b>
            
            <div :key="update" class="flex j-c-b w-100 mt-1">
                <small style="font-size: 0.7rem; text-align: left">{{ file.time_since_created }}</small>
                <div @click="request(file.id)" style="width: 100px; height: 30px;border-radius: 3px;" class="bg-success flex j-c-c">Request</div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { computed, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/store/user'
export default {
    setup() {
        const store = useAuthStore();
        const userStore = useUserStore();
        const base = store.baseUrl;
        let files = ref([]);
        let update = ref(0)

        const request = (id) => {
            store.load()
            axios.post(`${store.baseUrl}files/${id}/request/`, {}, {
                headers: {
                    'Authorization': `Token ${userStore.user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res=>{
                console.log(res)
                store.stopLoading()
                update.value += 1
            }).catch(e=>{
                store.stopLoading()
                console.log(e)
            })
        }
        const unrequestedPublicFiles = computed(() => {
            return files.value.filter(file => !file.access_requests.includes(userStore.user.email) && file.creator.email !== userStore.user.email)

        });

        onMounted(() => {
            axios.get(`${base}files/public/`)
                .then(res => {
                    files.value = res.data
                })
                .catch(error => {
                    console.error(error);
                });
        });

        return {
            files, request, store, userStore, unrequestedPublicFiles, update
        };
    },
}
</script>

<style scoped>
@import url('./other.css');
</style>