<script lang="ts">
import {defineComponent} from "vue";
import AppHeader from "./components/AppHeader.vue";

export default defineComponent({
    components: {AppHeader}
})
</script>

<template>
    <app-header/>
    <router-view/>
</template>

<style scoped>

</style>
