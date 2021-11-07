import {UPDATE_APP_TITLE} from "./CommonConstants";


const initialState = {
    app_title: 'Ma TodoList'
}

export function commonReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_APP_TITLE:
            return {...state,  app_title: action.payload}
        default:
            return state
    }
}
