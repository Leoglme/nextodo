import {createStore} from "redux";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import {commonReducer} from "../../store/CommonStore/CommonReducer";
import {appTitleSelector, commonSelectors} from "../../store/CommonStore/CommonSelectors";
import {updateAppTitle} from "../../store/CommonStore/CommonActions";

function renderWithRedux(
    component,
    {initialState, store = createStore(commonReducer, initialState)} = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>)
    };
}

const common = {
    app_title: 'Ma TodoList 2'
}


describe('Common redux tests', () => {
    it('should return the initial state', () => {
        expect(commonReducer(common, {})).toEqual(common)
    })
    describe('Selectors Testing', () => {
        it('Common selector should select all state', () => {
            expect(commonSelectors({common})).toEqual(common)
        })
        it('app title selector should select app title', () => {
            expect(appTitleSelector({common})).toEqual('Ma TodoList 2')
        })
    })
    describe('Action Testing', () => {
        it('should handle app title being updated', () => {
            const mockPayload = {title: 'testing', index: 0}
            expect(commonReducer(common, updateAppTitle(mockPayload)))
                .toEqual({app_title: mockPayload})
        })
    })
})
