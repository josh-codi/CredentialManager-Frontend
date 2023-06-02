<template>
  <div class="flex v-flex w-100">
    <router-link v-for="(file, id) in fileStore.files" :key="id"  :to="'detail/'+file.id" class="filePost flex v-flex mb-3 w-100 p-3 shadow" style="border-radius: 5px">
        <div class="flex j-c-b w-100 mb-2 border-bottom" style="padding: 0 0 0.7rem 0">
            <aside class="flex">
                <div class="postAvatar round shadow mr-1" style="width: 40px; height: 40px">
                    <img src="https://media.licdn.com/dms/image/C4E03AQEHtfxb7i8Ckw/profile-displayphoto-shrink_800_800/0/1660656098725?e=2147483647&v=beta&t=ordJONiGc0PGZ8fKqT50tWshPlYTq8INmwpH74FWLPQ" alt="" class="img-fit">
                </div>
                <small>@{{ file.creator.email }}</small>
            </aside>
            <small>{{ file.time_since_created }}</small>
        </div>
        <div class="postContent mt-1 mb-2 w-100 flex v-flex" style="min-height: 90px;">
            <b>{{ file.fileName }}</b>
        </div>
        <div class="flex j-c-b">
            <section class="flex">
                <i class="fa fa-user"></i>
                <div class="flex ml-1">
                    <small>{{ file.access_requests.length }} Joined</small>
                </div>
            </section>
        </div>
    </router-link>
    <section v-if="fileStore.files.length<1" class="filePost flex v-flex mb-3 w-100 p-3 shadow" style="border-radius: 5px">
        <small>No files Yet</small>
    </section>

  </div>
</template>

<script>
import { useFileStore } from '@/store/file';
import { onMounted, ref } from 'vue';
export default  {
    props: {
        setTotal:{
            type: Function
        }
    },
    setup(props){
        const fileStore = useFileStore();
        const files = ref(fileStore.files)
        
        return {
            fileStore, files,fileStore
        }
    }

}
</script>

<style>
@import url('./allfiles.css');

</style>