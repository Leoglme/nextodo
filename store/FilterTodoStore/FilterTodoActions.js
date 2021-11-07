import {UPDATE_FILTER} from "./FilterTodoConstants";

export const setFilterAction = (state) => ({
    type: UPDATE_FILTER,
    payload: state
})
