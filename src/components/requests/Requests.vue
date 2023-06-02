<template>
    <div class="topics flex v-flex j-c-b w-100">
        <aside class="flex v-flex w-100 border" style="max-height: 400px;overflow-y: auto">
            <aside v-for="(file, id) in requestedFiles" :key="id" class="navItem flex v-flex j-c-b w-100">
                <b>@{{file.creator.email}}</b>
                <small class="mt-1 mb-1">{{file.fileName}}</small>

                <aside class="flex j-c-b w-100">
                    <button @click="respond(file.id, 'grant')" class="flex j-c-c p-1 mt-2" style="min-width: 50%; height: 35px; border-radius: 3px;">Allow</button>
                    <button @click="respond(file.id, 'deny')" class="flex j-c-c p-1 mt-2" style="min-width: 50%; height: 35px; border-radius: 3px; background: rgb(255, 50,50, .5); color: white;">Reject</button>
                </aside>
            </aside>
            <aside v-if="requestedFiles.length<1" class="navItem flex v-flex j-c-b w-100">
                <small>No Requests Yet</small>
            </aside>

        </aside>

        <div class="otherfile2">
            <OthersVue />
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
import { useFileStore } from '@/store/file';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: "Requests",
    components: {
        OthersVue
    },
    setup() {
        const store = useAuthStore();
        const userStore = useUserStore();
        const fileStore = useFileStore();
        const requestedFiles = ref([])
        const router = useRouter()
        

        watch(fileStore, ()=>{
            requestedFiles.value = fileStore.getRequestedFiles
        })

        const respond = (id, action) => {
            let detail = {
                user_id: userStore.user.user_id, 
                action: action
            }
            axios.post(`${store.baseUrl}files/${id}/respond/`, detail, {
                headers: {
                    'Authorization': `Token ${userStore.user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(res=>{
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
        }


        const logout = () => {
            if (confirm("Are you sure you want to leave?")) {
                useAuthStore().load()

                useAuthStore().logout()
                useAuthStore().stopLoading()
                router.push('/login')
            }

        }

        return {
            logout, requestedFiles, respond
        }
    }

}
</script>

<style scoped>
@import url('./request.css');
</style>