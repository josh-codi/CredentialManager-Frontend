import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFileStore = defineStore('fileStore', {
    state: () => ({
        files: []
    }),
    getters: {
        getFiles () {
        return this.files
        },
        getRequestedFiles () {
            let all_files = ref([...this.files]);
            return all_files.value.filter(val=>val.access_requests.length>0)
        },
        getOneFile (id){
            let all_files = ref([...this.files])
            return all_files.value.filter(val=>val.id===id)[0]
        },
    },
    actions: {
        setFiles(files) {
        this.files = files
        }
    },
});