<template>
    <header class="flex justify-center items-center p-6">
        <span class="text-2xl font-medium text-orange-600">{{isEditPage ? 'Редактирование задачи' : 'Задачи'}}</span>
    </header>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useRoute} from "vue-router";

export default defineComponent({
    setup() {
        const route = useRoute()    // Используем текущий маршрут

        // Вычисляем, находится ли страница на редактировании
        const isEditPage = computed(() => route.path.includes('/edit'))

        // Возвращаем переменную с Setup
        return {isEditPage}
    }
})
</script>
