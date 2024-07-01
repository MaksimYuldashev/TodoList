<script lang="ts">
import {defineComponent, computed, ref, onBeforeUnmount, onMounted} from "vue";
import {Todo} from "../types/Todo.ts";
import {useRoute, useRouter} from "vue-router";
import AppModalConfirm from "./AppModalConfirm.vue";
import AppEditModal from "./AppEditModal.vue";
import {useStore} from "vuex";

export default defineComponent({
    components: {AppEditModal, AppModalConfirm},    // Импортируем компоненты
    props: {
        todo: {                                    // Определяем пропс todo
            type: Object as () => Todo,           // Тип пропса - объект типа Todo
            required: true,                      // Делаем пропс обязательным для передачи в компонент
        },
    },
    setup(props, {emit}) {
        const store = useStore()                   // Используем Vuex store
        const route = useRoute()                  // Используем текущий маршрут
        const router = useRouter()               // Используем роутер Vue Router
        const isEditPage = computed(() => route.path.includes('/edit')) // Вычисляем, находится ли страница на редактировании

        // Реактивные переменные для управления видимостью модалок
        const showConfirmModal = ref(false)
        const showModalEdit = ref(false)


        // Функции для открытия и закрытия модалок
        const openModal = () => {showConfirmModal.value = true}
        const closeModal = () => {showConfirmModal.value = false}
        const openEditModal = () => {showModalEdit.value = true}
        const closeEditModal = () => {showModalEdit.value = false}

        // Функция для сохранения изменений в редакторе задач
        const saveEdit = (editTodo: Todo) => {
            store.dispatch('editTodo', editTodo)        // Вызываем экшн editTodo из Vuex store
            closeEditModal()                                // Закрываем модалку редактирования
        }

        // Функция для удаления задачи
        const removeTodo = () => {
            emit('removeTodo', props.todo.id)              // Отправляем событие removeTodo с id задачи
            closeModal()                                  // Закрываем модалку подтверждения
            router.push({name: 'todo_page'})             // Переходим на страницу со всеми задачами
        }

        // Функция для переключения состояния задачи
        const toggleTodo = () => {emit('toggleTodo', props.todo.id)}

        // Функции для выполнения отмены и повтора действий с помощью клавиатуры и кнопок на самой задачи
        const undoTodo = () => {store.dispatch('undoTodo')}
        const redoTodo = () => {store.dispatch('redoTodo')}

        // Обработчик событий клавиатуры для отмены и повтора действий
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
                switch (event.key) {
                    case 'z':   // Клавиша "Ctrl + Z" или "Cmd + Z" для отмены
                        event.preventDefault()
                        undoTodo()
                        break;
                    case 'y':   // Клавиша "Ctrl + Y" или "Cmd + Y" для повтора
                        event.preventDefault()
                        redoTodo()
                        break;
                }
            }
        }

        // Добавляем слушатель события клавиатуры при монтировании компонента
        onMounted(() => {
            window.addEventListener('keydown', handleKeyDown)
        })

        // Удаляем слушатель события клавиатуры при демонтировании компонента
        onBeforeUnmount(() => {
            window.removeEventListener('keydown', handleKeyDown)
        })

        // Возвращаем все переменные и методы с функции Setup
        return {
            openModal,
            closeModal,
            toggleTodo,
            removeTodo,
            openEditModal,
            closeEditModal,
            saveEdit,
            undoTodo,
            redoTodo,
            isEditPage,
            showConfirmModal,
            showModalEdit,
        };
    },
});
</script>

<template>
    <li class="w-full flex items-center justify-between gap-6 py-6 px-8 border-2 shadow-custom rounded-xl"
        :class="{'todo-item--done': todo.completed}">
        <div v-if="isEditPage" class="flex justify-center items-center w-10 h-10 text-2xl" @click="toggleTodo">
            <i v-if="todo.completed" class='bx bx-checkbox-checked'></i>
            <i v-else class='bx bx-checkbox'></i>
        </div>
        <span class="text-lg todo-item__text">{{ todo.title }}</span>
        <span class="text-lg todo-item__text">{{ todo.text }}</span>
        <div class="flex items-center gap-x-2">
            <button class="text-2xl" @click.stop="openModal">
                <i class='bx bx-trash'></i>
            </button>
            <router-link v-if="!isEditPage" :to="{ name: 'edit_page', params: { id: todo.id }}" class="text-2xl">
                <i class='bx bx-cog'></i>
            </router-link>
            <div v-else class="flex gap-x-2">
                <button class="text-2xl" @click="openEditModal">
                    <i class='bx bx-pencil'></i>
                </button>
                <button class="text-2xl" @click="undoTodo">
                    <i class='bx bx-undo'></i>
                </button>
                <button class="text-2xl" @click="redoTodo">
                    <i class='bx bx-redo' ></i>
                </button>
                <router-link :to="{name: 'todo_page'}" class="text-2xl">
                    <i class='bx bx-save'></i>
                </router-link>
            </div>
        </div>

        <!-- Подключаем модальное окно для редактирования задачи -->
        <app-edit-modal :show="showModalEdit" :todo="todo" @save-edit="saveEdit" @close-edit="closeEditModal"/>

        <!-- Подключаем модальное окно для подтверждения -->
        <app-modal-confirm v-if="showConfirmModal" :show="showConfirmModal" message="Вы уверены, что хотите удалить эту задачу?" @confirm="removeTodo" @cancel="closeModal"/>
    </li>
</template>


<style scoped>
.todo-item--done .todo-item__text {
    position: relative;
    text-decoration: none;
}

.todo-item--done .todo-item__text::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
    transform: translateY(-50%);
}
</style>
