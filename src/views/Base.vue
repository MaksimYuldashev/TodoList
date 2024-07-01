<!-- Главный компонент который подключается по пути router/index.ts -->

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({

})
</script>

<template>
    <div class="max-w-[800px] mx-auto px-5 flex flex-col justify-center items-center">
        <!-- Подключение router-view для отображения страниц -->
        <router-view/>
    </div>
</template>
