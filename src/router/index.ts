import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Base from "../views/Base.vue";
import TodoPage from "../views/TodoPage.vue";
import EditTodoPage from '../views/EditTodoPage.vue';

// Создаем объект routes, добавляем в него страницы для возможности перехода
const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: Base,
        children: [
            {
                path: '',
                component: TodoPage,
                name: 'todo_page'
            },
            {
                path: '/edit/:id',
                component: EditTodoPage,
                name: 'edit_page'
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(), // Получаем историю браузера
    routes, // Передаем сам объект
});

export default router;