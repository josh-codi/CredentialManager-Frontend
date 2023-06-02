<template>
    <Wrapper>
        <template v-slot:left>
            <div></div>
        </template>
        <template v-slot:middle>
            <Detail/>
        </template>
        <template v-slot:right>
            <div></div>
        </template>
    </Wrapper>
    
</template>

<script>
import Detail from '@/components/detail/Detail.vue';
import Wrapper from '@/components/wrapper/Wrapper.vue';

export default {
    name: "Details",
    components: {
        Detail, Wrapper
    }
}
</script>

<style>

</style>