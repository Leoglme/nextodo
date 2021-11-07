export const todosSelector = ({todos}) => todos
export const todosRemainingSelector = (state, index) => state.todos[index].tasks.filter(task => !task.completed)
export const todosTitleSelector = (state, index) => state.todos[index].title
export const filterBoxSelector = (state, index) => state.todos[index].filter
export const todosCompletedSelector = ({todos}) => todos.filter(todo => todo.completed)

export const filteredTodosSelector = ({todos, filter}) => {
    if (filter === null) {
        return todos
    }
    return todos.filter(todo => todo.tasks.find(task => task.completed === filter))
}
