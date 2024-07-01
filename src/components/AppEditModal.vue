<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {Todo} from "../types/Todo.ts";

export default defineComponent({
    props: {
        show: {                               // Создаем пропс для показа модального окна
            type: Boolean,                   // Объявляем тип пропса
            required: true                  //  Делаем обязательным для передачи в компонент
        },
        todo: {                            // Определяем пропс todo
            type: Object as () => Todo,   // Тип пропса - объект типа Todo
            required: true,              //  Делаем обязательным для передачи в компонент
        }
    },
    emits: ['saveEdit', 'closeEdit'],   // Создаем массив emits куда складываем все пользовательские события
    setup(props, {emit}) {
        const title = ref(props.todo.title) // Создаем переменную для названия задачи
        const text = ref(props.todo.text)  // Создаем переменную для описания задачи

        // Встроенная функция Vue для отслеживания изменений в свойстве props.todo, где todo это один объект задачи
        watch(() => props.todo, () => {
            title.value = props.todo.title;
            text.value = props.todo.text;
        })

        // Функция для сохранения измененой задачи где в качестве параметра принимает объект с новыми данными
        const saveEdit = () => {
            emit('saveEdit', {id: props.todo.id, title: title.value, text: text.value})
        }

        // Функция для закрытия модального окна
        const closeEdit = () => {emit('closeEdit')}

        // Возвращаем переменные и функции с Setup
        return {
            saveEdit,
            closeEdit,
            title,
            text
        }
    }
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 px-5 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="w-[400px] bg-white p-6 rounded-xl shadow-md">
            <h2 class="text-center text-xl">Изменение задачи</h2>
            <form @submit.prevent="saveEdit" class="flex flex-col gap-y-5 py-5 px-4">
                <div class="flex flex-col">
                    <label for="title" class="">Название</label>
                    <input v-model="title" class="outline-none border-b-2 border-gray-500 py-1 px-2" type="text" id="title">
                </div>
                <div class="flex flex-col">
                    <label for="text">Задача</label>
                    <input v-model="text" class="outline-none border-b-2 border-gray-500 py-1 px-2" type="text" id="text">
                </div>
                <div class="flex gap-x-2">
                    <button class="border-2 border-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 w-2/4" type="submit">Сохранить</button>
                    <button class="border-2 border-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 w-2/4" @click="closeEdit">Отмена</button>
                </div>
            </form>
        </div>
    </div>
</template>

