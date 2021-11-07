import {
    ADD_BOX_ACTION,
    ADD_TODO_ACTION,
    DELETE_BOX_ACTION,
    DELETE_COMPLETED_TODO_ACTION,
    DELETE_TODO_ACTION,
    TOGGLE_TODO_ACTION,
    UPDATE_TASKS_ACTION,
    UPDATE_TODO_ACTION,
    UPDATE_TODO_TITLE,
    UPDATE_BOX_POSITION_ACTION, FILTER_BOX_ACTION, FILTER_APP_ACTION, DELETE_COMPLETED_APP_ACTION
} from './TodoConstants';

const initialState = []


export function todosReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    const id = todo.tasks.length + 1
                    todo.tasks.push({
                        id: id,
                        completed: false,
                        name: action.payload.value,
                        description: action.payload.description
                    })
                    return todo
                }
                return todo
            })
        case TOGGLE_TODO_ACTION:
            const {task, index} = action.payload;
            return state.map((todo, i) => {
                if (i === index) {
                    const indexById = todo.tasks.findIndex((obj => obj.id === task.id))
                    todo.tasks[indexById] = task;
                    return todo
                }
                return todo
            })
        case UPDATE_TODO_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    const findTask = todo.tasks.find(task => task === action.payload.task);
                    todo.tasks[todo.tasks.indexOf(findTask)] = {
                        id: action.payload.updated.id,
                        name: action.payload.updated.name,
                        description: action.payload.updated.description,
                    };
                    return todo;
                }
                return todo
            })
        case UPDATE_TASKS_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    todo.tasks = action.payload.tasks
                    return todo;
                }
                return todo
            })
        case UPDATE_BOX_POSITION_ACTION:
            let newBox = state[action.payload.newIndex]
            let oldBox = state[action.payload.oldIndex]
            return state.map((todo, i) => {
                if (i === action.payload.newIndex) {
                    todo = oldBox;
                    return todo;
                }
                if (i === action.payload.oldIndex) {
                    todo = newBox;
                    return todo;
                }
                return todo
            })
        case DELETE_TODO_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    return {...todo, tasks: todo.tasks.filter(e => e !== action.payload.task)}
                }
                return todo
            })
        case DELETE_COMPLETED_TODO_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload) {
                    return {...todo, tasks: todo.tasks.filter(todo => !todo.completed)}
                }
                return todo
            })
        case DELETE_COMPLETED_APP_ACTION:
            return state.map((todo) => {
                return {...todo, tasks: todo.tasks.filter(todo => !todo.completed)}
            })
        case UPDATE_TODO_TITLE:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    return {...todo, title: action.payload.title}
                }
                return todo
            })
        case FILTER_BOX_ACTION:
            return state.map((todo, i) => {
                if (i === action.payload.index) {
                    return {...todo, filter: action.payload.filter}
                }
                return todo
            })
        case FILTER_APP_ACTION:
            return state.map((todo) => {
                return {...todo, filter: action.payload}
            })
        case ADD_BOX_ACTION:
            return [...state, action.payload]
        case DELETE_BOX_ACTION:
            return [
                ...state.slice(0, action.payload),
                ...state.slice(action.payload + 1)
            ];
        default:
            return state
    }
}
