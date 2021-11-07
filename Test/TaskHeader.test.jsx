import React from "react";
import {render, cleanup, act} from "@testing-library/react";
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import {useEditing, useOpen} from "../Hooks/hook";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import TaskHeader from "../components/TaskHeader";

afterEach(cleanup);

const mockStore = configureMockStore();
const store = mockStore({todos: [{title: ''}]});
function renderMockStore(component) {
    return render(<Provider store={store}>{component}</Provider>)
}

describe('TaskHeader Components Tests', () => {
    it("renders correctly", () => {
        const { asFragment } = renderMockStore(<TaskHeader index={0}/>);
    });
    it("if count props work and is same task_count content", () => {
        const { getByText  } = renderMockStore(<TaskHeader index={0} count={5}/>)
        expect(getByText(5)).toBeInTheDocument();
    });


    describe('Editing Hook Tests', () => {
        it("if default editing value is false", () => {
            const { result } = renderHook(() => useEditing())
            expect(result.current.isEditing).toBe(false)
        });
        it("if editing is false, not find header with active className", () => {
            const { container } = renderMockStore(<TaskHeader index={0}/>)
            expect(container.getElementsByClassName('active').length).toBe(0);
        });
        it("if editing is false, find box_header--action className", () => {
            const { container } = renderMockStore(<TaskHeader index={0}/>)
            expect(container.getElementsByClassName('box_header--action').length).toBe(1);
        });
        it("if editing is false, find task_count className", () => {
            const { container } = renderMockStore(<TaskHeader index={0}/>)
            expect(container.getElementsByClassName('task_count').length).toBe(1);
        });
        it("if set editing hook work", () => {
            const { result } = renderHook(() => useEditing())
            act(() => {
                result.current.setIsEditing(true)
            })
            expect(result.current.isEditing).toBe(true)
        });
    })

    describe('Open Hook Tests', () => {
        it("if default open value is false", () => {
            const { result } = renderHook(() => useOpen())
            expect(result.current.open).toBe(false)
        });
        it("if set open hook work", () => {
            const { result } = renderHook(() => useOpen())
            act(() => {
                result.current.setOpen(true)
            })
            expect(result.current.open).toBe(true)
        });
    })
})
