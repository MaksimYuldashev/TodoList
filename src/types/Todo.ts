// Создание Interface для Задач/Задачи и дальнейшего использования в компонентах

export interface Todo {
    id: number,
    title: string,
    text: string,
    completed: boolean
}