<template>
  <div class="addFile flex j-c-c">
    <section class="flex v-flex p-2 a-i-c" style="width: 500px;">
        <h4>Create File</h4>
        <form action="" @submit.prevent="createFile">
            <div class="flex v-flex form-group mb-3">
                <label for="">File Name</label>
                <input type="text" id="fileName" v-model="fileData.fileName" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="flex v-flex form-group mb-3">
                <label for="">Secret Code</label>
                <input type="password" id="secretCode" v-model="fileData.secret_code" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="flex v-flex form-group mb-3">
                <label for="">Choose File</label>
                <div class="relative w-100 border flex v-flex j-c-c" style="height: 40px; padding-left: 1rem">
                    <small>Select...</small>
                    <input type="file" accept=".png, .jpg, .jpeg, .pdf" style="border: none; height: 100%; opacity: 0 " class="absolute form-control w-100" id="file" @change="onFileChange" >
                </div>
                <small id="emailHelp" class="form-text text-muted">Select the file to be saved as part of your submition</small>
            </div>
            <div class="flex v-flex form-group mb-3">
                <label for="isPublic">Is Public:</label>
                <input type="checkbox" id="isPublic" v-model="fileData.is_public" />
            </div>

            <div class="flex">
                <div @click="store.cancel" class="p-3 w-50 border flex j-c-c mr-1">Cancle</div>
                <button class="p-3 w-50 border flex j-c-c">Add File</button>
            </div>

        </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
export default {

    setup(){
        const store = useAuthStore()
        const userStore = useUserStore()
        const fileData = ref({
            fileName: '',
            file: null,
            secret_code: '',
            is_public: false,
        })
        const onFileChange = (event) => {
            fileData.value.file = event.target.files[0];
        }

        const createFile = () => {
            store.load()
            const formData = new FormData();
            formData.append('fileName', fileData.value.fileName);
            formData.append('file', fileData.value.file);
            formData.append('secret_code', fileData.value.secret_code);
            formData.append('is_public', fileData.value.is_public);

            axios.post(`${store.baseUrl}files/create/`, formData, {
                    headers: {
                        'Authorization': `Token ${userStore.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log(response.data);
                    window.location.reload();
                    store.stopLoading();
                })
                .catch(error => {
                    store.stopLoading();
                    console.error(error);
                });
        }

        return{
            fileData: fileData.value,
            onFileChange,
            createFile,
            store

        }
    }

}
</script>

<style scoped>
    @import url('./addfile.css');
</style>