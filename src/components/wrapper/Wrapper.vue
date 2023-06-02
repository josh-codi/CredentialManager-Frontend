<template>
    <div class="wrapper flex a-i-s j-c-b">
        <div class="left flex v-flex a-i-c" >
            <aside class="headerTopic flex w-100" style="height: 50px;">
                <h5>Requests</h5>
            </aside>
            <slot name="left"></slot>
        </div>
        <div class="middle flex v-flex a-i-c">
            <section class="flex j-c-b w-100 mb-3">
                <div class="flex v-flex">
                    <h5>YourFiles</h5>
                    <small>{{ fileStore.files.length ?? 0 }} Files Available</small>
                </div>
                <button @click="store.add" class="btn btn-info">
                    Add File
                </button>
            </section>
            <slot name="middle"></slot>
        </div>
        <div class="right flex v-flex a-i-c">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useFileStore } from '@/store/file';
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/store/user';
export default {
    props:{
        total: Number
    },
    setup({total}){
        const store = useAuthStore();
        const userStore = useUserStore()
        const fileStore = useFileStore();
        const base = store.baseUrl;

        onMounted(()=>{
            console.log('total', total)

            axios.get(`${base}user/files/${userStore.user.user_id}/`)
            .then(res=>{
                fileStore.setFiles(res.data)
            }).catch(e=>{
                console.log(e)
            })
        })
        

        return {
            fileStore,
            total: total,
            store
        }
    }

}
</script>

<style scoped>
@import url('./wrapper.css');

</style>