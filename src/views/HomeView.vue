<template>
  <WrapperVue :total="4">
    <template v-slot:left>
      <!-- <TopicsVue/> -->
      <Requests/>
    </template>
    <template v-slot:middle>
      <AllFilesVue/>
    </template>
    <template v-slot:right>
      <OthersVue/>
    </template>
  </WrapperVue>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue';
import WrapperVue from '@/components/wrapper/Wrapper.vue'
import AllFilesVue from '@/components/AllFiles/AllFiles.vue'
import OthersVue from '@/components/otherFiles/Others.vue';
import TopicsVue from '@/components/topics/Topics.vue'
import Requests from '@/components/requests/Requests.vue';
import { reactive, ref } from 'vue';
import { useFileStore } from '@/store/file';

export default {
  name: 'HomeView',
  components: {
    Header, WrapperVue, AllFilesVue, OthersVue, TopicsVue, Requests
  },
  setup(){
    const fileStore = useFileStore()
    let vall = ref(0)

    const setTotal = (val)=>{
      vall.value = val;
      console.log(val)
    }

    return {
      setTotal,
      fileStore
    }
  }
}
</script>
