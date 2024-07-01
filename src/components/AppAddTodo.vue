<script lang="ts">
import { defineComponent, ref } from "vue";
import { Todo } from "../types/Todo.ts";

// Определение интерфейса для состояния компонента
interface State {
    isFormVisible: boolean;     // Флаг видимости формы добавления задачи
    todoTitle: string;         // Заголовок новой задачи
    todoText: string;         // Описание новой задачи
}

export default defineComponent({
    setup(_, {emit}) {

        // Инициализация реактивной переменной для состояния компонента
        const state = ref<State>({
            isFormVisible: false,       // По умолчанию форма не видима
            todoTitle: '',             // Пустой заголовок задачи
            todoText: ''              // Пустое описание задачи
        });

        // Функции для отображения формы и закрытия формы
        const showForm = () => {state.value.isFormVisible = true}
        const closeForm = () => {state.value.isFormVisible = false}

        // Функция для добавления новой задачи
        const addTodo = () => {
            // Создаем новый объект
            const newTodo: Todo = {
                id: Date.now(),                        //  Уникальный индентификатор задачи
                title: state.value.todoTitle,         //   Название задачи из состояния
                text: state.value.todoText,          //    Описание задачи из состояния
                completed: false                    //     При создании задача не выполнена
            };
            // Очищаем поля input после добавления задачи
            state.value.todoTitle = ''
            state.value.todoText = ''

            state.value.isFormVisible = false       // Устанавливаем значение переменной false для автоматического закрытия формы
            emit('addTodo', newTodo)               // Генерируем событие addTodo с новой задачей
        };

        // Возвращаем переменные и функции из Setup
        return {
            state,
            showForm,
            closeForm,
            addTodo,
        };
    },
    emits: ['addTodo']          // Определение выходного события addTodo с типом Todo
});
</script>

<template>
    <section class="grid gap-6">
        <form v-if="state.isFormVisible" @submit.prevent="addTodo" class="grid gap-6 py-4 px-8 border shadow-custom rounded-xl">
            <button class="justify-self-end text-4xl" type="button" @click="closeForm">
                <i class="bx bx-x"></i>
            </button>
            <div class="flex flex-col items-center gap-y-2 py-1 px-2">
                <input v-model="state.todoTitle" class="w-full py-1 px-2 border shadow-custom rounded-md outline-none" placeholder="Название"/>
                <textarea v-model="state.todoText" class="w-full py-1 px-2 border shadow-custom rounded-md outline-none" placeholder="Описание дела"></textarea>
            </div>
            <div class="w-full flex justify-center items-center">
                <button type="submit" class="font-medium border border-gray-500 py-1 px-2 hover:bg-orange-600 hover:text-white transition duration-500 rounded-md">Добавить задачу</button>
            </div>
        </form>
        <button v-else class="grid-cols-1 justify-items-center py-4 px-5 border shadow-custom text-orange-500 text-3xl rounded-xl" @click="showForm">
            <i class='bx bx-plus'></i>
        </button>
    </section>
</template>
