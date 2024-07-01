<script lang="ts">
import {computed, defineComponent} from "vue";
import AppTodoList from "../components/AppTodoList.vue";
import AppAddTodo from "../components/AppAddTodo.vue";
import { Todo } from "../types/Todo.ts"; // Импорт типа Todo
import {useStore} from "vuex"; // Импорт хранилища Vuex

export default defineComponent({
    components: { AppAddTodo, AppTodoList }, // Импорт компонентов Vue
    setup() {
        const store = useStore() // Получение доступа к хранилищу Vuex

        // Вычисляемое свойство todos, получаем задачи из геттера хранилищ
        const todos = computed(() => store.getters.todos)

        // Функции для взаимодействия с задачами через хранилище Vuex
        const toggleTodo = (id: number) => {
            store.dispatch('toggleTodo', id)
        };
        const removeTodo = (id: number) => {
            store.dispatch('removeTodo', id)
        };
        const addTodo = (todo: Todo) => {
            store.dispatch('addTodo', todo)
        };

        // Возвращаемые значения setup() для использования в шаблоне
        return {
            todos, // Список задач
            toggleTodo, // Функция для переключения состояния задачи
            removeTodo, // Функция для удаления задачи
            addTodo, // Функция для добавления новой задачи
        };
    },
});
</script>

<template>
    <main class="w-full grid gap-6">
        <!-- Подключение компонентов и передача им данных и методов через props и события -->
        <AppTodoList :todos="todos" @toggleTodo="toggleTodo" @removeTodo="removeTodo"/>
        <AppAddTodo @addTodo="addTodo"/>
    </main>
</template>
