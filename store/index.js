import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todosReducer} from './TodoStore/TodoReducer'
import {FilterTodoReducer} from './FilterTodoStore/FilterTodoReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {commonReducer} from "./CommonStore/CommonReducer";

const store = createStore(
    combineReducers({
        todos: todosReducer,
        filter: FilterTodoReducer,
        common: commonReducer
    }),
    composeWithDevTools(
        applyMiddleware(),
    )
)

export default store
