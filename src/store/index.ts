import { Commit, createStore, Store } from "vuex";
import { Todo } from '../types/Todo.ts';

// Определяем тип состояния
interface State {
    todos: Todo[],       // Массив задач
    undo: Todo | null,  // Данные для отмены последнего действия
    redo: Todo[]       // Данные для повтора отменённого действия
}

// Получаем сохранённые задачи из localStorage или устанавливаем пустой массив
const savedTodos = localStorage.getItem('todos');
const initialState: State = {
    todos: savedTodos ? JSON.parse(savedTodos) : [], // Используем сохранённые данные или пустой массив
    undo: null,                                      // Начальное значение для отмены
    redo: []                                         // Начальное значение для повтора
};

// Создаём и экспортируем хранилище Vuex
export const store: Store<State> = createStore<State>({
    state: initialState, // Начальное состояние
    mutations: {
        // Мутации для изменения состояния todos и других данных
        toggleTodo(state: State, id: number) {
            const targetTodo = state.todos.find(todo => todo.id === id) // Находим задачу по id
            if (targetTodo) {
                state.undo = { ...targetTodo }                                                 // Сохраняем текущее состояние задачи для отмены
                targetTodo.completed = !targetTodo.completed                                   // Переключаем состояние выполнения задачи
                localStorage.setItem('todos', JSON.stringify(state.todos))                     // Сохраняем обновлённые данные в localStorage
            }
        },
        removeTodo(state: State, id: number) {
            state.todos = state.todos.filter(todo => todo.id !== id)                    // Фильтруем задачи, удаляем задачу с указанным id
            localStorage.setItem('todos', JSON.stringify(state.todos))                         // Сохраняем обновлённые данные в localStorage
        },
        addTodo(state: State, todo: Todo) {
            state.todos.push(todo)                                                             // Добавляем новую задачу в конец массива задач
            localStorage.setItem('todos', JSON.stringify(state.todos))                         // Сохраняем обновлённые данные в localStorage
        },
        editTodo(state: State, updatedTodo: Todo) {
            const todoToUpdate = state.todos.find(todo => todo.id === updatedTodo.id) // Находим задачу по id
            if (todoToUpdate) {
                state.undo = { ...todoToUpdate }                                               // Сохраняем текущее состояние задачи для отмены
                Object.assign(todoToUpdate, updatedTodo)                                       // Обновляем данные задачи
                localStorage.setItem('todos', JSON.stringify(state.todos))                     // Сохраняем обновлённые данные в localStorage
            }
        },
        undoTodo(state: State) {
            const editedTodo = state.undo;                                          // Присваиваем к переменной массив
            if (editedTodo) {
                const todoToUpdate = state.todos.find(todo => todo.id === editedTodo.id) // Находим задачу по id
                if (todoToUpdate) {
                    state.redo.push({ ...todoToUpdate })                                       // Добавляем отменённую задачу в массив redo для возможности повтора
                    Object.assign(todoToUpdate, editedTodo)                                    // Восстанавливаем отменённое состояние задачи
                    state.undo = null                                                          // Сбрасываем данные для отмены
                    localStorage.setItem('todos', JSON.stringify(state.todos))                 // Сохраняем обновлённые данные в localStorage
                }
            }
        },
        redoTodo(state: State) {
            const lastUndoneTodo = state.redo.pop()                            // Извлекаем последнюю отменённую задачу из массива
            if (lastUndoneTodo) {
                const todoToRedo = state.todos.find(todo => todo.id === lastUndoneTodo.id) // Находим задачу по id
                if (todoToRedo) {
                    state.undo = { ...todoToRedo }                                             // Сохраняем текущее состояние задачи для возможности отмены
                    Object.assign(todoToRedo, lastUndoneTodo)                                  // Восстанавливаем отменённое состояние задачи
                    localStorage.setItem('todos', JSON.stringify(state.todos))                 // Сохраняем обновлённые данные в localStorage
                }
            }
        }
    },
    actions: {
        // Вызываем соответстующие мутации через commit
        toggleTodo({ commit }: { commit: Commit }, id: number) {
            commit('toggleTodo', id)
        },
        removeTodo({ commit }: { commit: Commit }, id: number) {
            commit('removeTodo', id)
        },
        addTodo({ commit }: { commit: Commit }, todo: Todo) {
            commit('addTodo', todo)
        },
        editTodo({ commit }: { commit: Commit }, updatedTodo: Todo) {
            commit('editTodo', updatedTodo)
        },
        undoTodo({ commit }: { commit: Commit }) {
            commit('undoTodo')
        },
        redoTodo({ commit }: { commit: Commit }) {
            commit('redoTodo')
        }
    },
    getters: {
        // Способы для получения данных без изменения, для использования в компонентах
        getTodoById: (state: State) => (id: number) => {
            return state.todos.find(todo => todo.id === id)
        },
        todos: (state: State) => state.todos,
        editedTodoData: (state: State) => state.undo
    }
});
