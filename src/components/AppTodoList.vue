<script lang="ts">
import { defineComponent, PropType } from "vue";
import AppTodoItem from "./AppTodoItem.vue";
import { Todo } from "../types/Todo.ts";

export default defineComponent({
    components: { AppTodoItem },                                       // Импортируем компонент
    props: {
        todos: {                                                      // Определяем пропс todos
            type: Array as PropType<Todo[]>,                         // Тип пропса - массив объектов типа Todo
            required: true,                                         // Делаем что бы пропс был обязателен для передачи в компонент
        },
    },
    setup(_, { emit }) {
        const toggleTodo = (id: number) => {
            emit('toggleTodo', id);                                // Отправляем событие toggleTodo с id
        };

        const removeTodo = (id: number) => {
            emit('removeTodo', id);                               // Отправляем событие toggleTodo с id
        };

        return {
            toggleTodo, // Возвращаем события
            removeTodo, // Возвращаем события
        };
    },
});
</script>

<template>
    <ul class="w-full grid gap-6">
        <!-- Покдлючаем компонент и передаем ему события. Так по циклу отображаем каждую задачу из массива и передаем уникальный ключ для каждой задачи -->
        <AppTodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @removeTodo="removeTodo"
        />
    </ul>
</template>
