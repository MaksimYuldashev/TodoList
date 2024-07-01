<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import AppTodoItem from "../components/AppTodoItem.vue";
import AppModalConfirm from "../components/AppModalConfirm.vue";

export default defineComponent({
    components: {AppModalConfirm, AppTodoItem }, // Импорт компонентов Vue
    setup() {
        const store = useStore() // Получение доступа к хранилищу Vuex
        const route = useRoute() // Получение доступа к роутеру
        const taskId = Number(route.params.id) // Присваиваем к переменной айди из роутера и переводим в type Number(число)
        const todo = store.getters.getTodoById(taskId) // Достаем из Vuex хранилище все todo

        // Функции для взаимодействия с задачами через хранилище Vuex
        const toggleTodo = (id: number) => {
            store.dispatch('toggleTodo', id)
        }
        const removeTodo = (id: number) => {
            store.dispatch('removeTodo', id)
        };

        // Возвращаемые значения setup() для использования в шаблоне
        return {
            todo, // Список задач
            toggleTodo, // Функция для переключения состояния задачи
            removeTodo, // Функция для удаления задачи
        };
    },
});
</script>

<template>
    <main class="w-full grid gap-6">
        <div class="flex justify-center">
            <router-link :to="{name: 'todo_page'}" class="border border-gray-500 rounded-md w-[6rem] text-center font-medium py-1 hover:bg-gray-500 hover:text-white transition duration-500">На главную</router-link>
        </div>
        <!-- Подключение компонента одной задачи и передача данных и методов через Props и события -->
        <app-todo-item v-if="todo" :todo="todo" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
    </main>
</template>
