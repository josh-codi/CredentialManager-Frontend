<template>
    <div class="flex v-flex j-c-b w-100">
        <section v-if="file" class="filePost flex v-flex mb-3 w-100 p-3 shadow" style="border-radius: 5px">
            <div class="flex j-c-b w-100">
                <h5 class="">{{ file.fileName }}</h5>
                <a :href="`${getFileUrl()}`"><h5>Open File</h5></a>
            </div>
            <div class="flex v-flex border w-100 mt-5">
                <div v-if="isPdfFile" class="mt-3 mb-5" style="min-width: 100%; height: 300px">
                    <iframe :src="getFileUrl()" class="img-fit"></iframe>
                </div>
                <div v-else class="mt-3 mb-5" style="min-width: 100%; height: 300px">
                    <img :src="getFileUrl()" alt="" class="img-fit">
                </div>
            </div>
            <hr>
            <div class="flex j-c-b w-100">
                <div class="flex v-flex">
                    <div class="flex j-c-c btn btn-success mb-3">
                        <h4>Requested Users</h4>
                    </div>
                    
                    <h5 v-for="(file, id) in file.access_requests" :key="id">{{id+1}}. {{ file }}</h5>
                </div>
            </div>
        </section>
        <section v-if="file" class="filePost flex j-c-b mb-3 w-100 p-3 shadow" style="border-radius: 5px">
            <button @click="deleteFile" class="btn btn-danger">Delete</button>
        </section>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFileStore } from '@/store/file';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

export default {
    setup() {
        const store = useAuthStore();
        const fileStore = useFileStore();
        const route = useRoute();
        const router = useRouter()
        const file = ref({});
        let isPdfFile = ref(false);

        const getFileUrl = () => {
            return `${store.fileAccessUrl}${file.value.file}`;
        };

        const checkFileType = () => {
            isPdfFile.value = getFileUrl().includes('pdf');
        };

        const deleteFile = () => {
            if(confirm('Are you sure you want to delete this file?')){
                axios.post(`${store.baseUrl}files/${route.params.id}/delete/`, {
                    headers: store.headers
                }).then(res=>{
                    alert('File Deleted')
                    router.back()
                }).catch(e=>{
                    console.log(e);
                    alert('An error occured, try again')
                })
            }
            
        }

        onBeforeMount(() => {
            store.load();
            axios
                .get(`${store.baseUrl}files/${route.params.id}/`, {
                    headers: store.headers,
                })
                .then((res) => {
                    console.log(res);
                    file.value = res.data;
                    checkFileType();
                    store.stopLoading();
                })
                .catch((e) => {
                    store.stopLoading();
                    console.log(e);
                });
        });

        return {
            file,
            getFileUrl,
            isPdfFile,
            deleteFile
        };
    },
};
</script>

<style scoped>
@import url('./detail.css');
</style>
