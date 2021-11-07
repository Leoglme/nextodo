import {UPDATE_FILTER} from "./FilterTodoConstants";

export function FilterTodoReducer(state = true, action){
    switch (action.type){
        case UPDATE_FILTER:
            return action.payload
        default: {
            return state
        }
    }
}
