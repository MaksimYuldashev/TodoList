<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    props: {
        show: {                               // Создаем пропс для показа модального окна
            type: Boolean,                   // Объявляем тип пропса
            required: true,                 //  Делаем обязательным для передачи в компонент
        },
        message: {                         // Создаем пропс для текста в модальном окне
            type: String,                 // Объявляем тип пропса
            required: true,              //  Делаем обязательным для передачи в компонент
        },
    },
    emits: ['confirm', 'cancel'],       // Создаем массив emits куда складываем все пользовательские события
    setup(_, {emit}) {

        // Создаем пользовательские функции(emit события)
        const confirm = () => {emit('confirm');};
        const cancel = () => {emit('cancel');};

        // Возвращаем все функции с Setup
        return {
            confirm,
            cancel,
        };
    },
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-xl shadow-md">
            <p class="text-lg">{{ message }}</p>
            <div class="flex justify-end mt-4">
                <button class="px-4 py-2 mr-4 bg-gray-300 rounded-lg hover:bg-gray-400" @click="cancel">Отмена</button>
                <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" @click="confirm">Удалить</button>
            </div>
        </div>
    </div>
</template>


