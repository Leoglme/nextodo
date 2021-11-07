import {createStore} from "redux";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import {FilterTodoReducer} from "../../store/FilterTodoStore/FilterTodoReducer";
import {filterTodoSelector} from "../../store/FilterTodoStore/FilterTodoSelectors";
import {setFilterAction} from "../../store/FilterTodoStore/FilterTodoActions";

function renderWithRedux(
    component,
    {initialState, store = createStore(FilterTodoReducer, initialState)} = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    };
}


describe('Filter redux tests', () => {
    it('should return the initial state', () => {
        expect(FilterTodoReducer(null, {})).toEqual(null)
    })
    describe('Selectors Testing', () => {
        it('Filter selector should select true', () => {
            expect(filterTodoSelector({filter: true})).toEqual(true)
        })
    })
    describe('Action Testing', () => {
        it('should handle filter being updated', () => {
            expect(FilterTodoReducer(true, setFilterAction(false)))
                .toEqual(false)
        })
    })
})
