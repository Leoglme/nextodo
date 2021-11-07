import React from "react";
import {cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import FilterTodo from "../components/FilterTodo";
import {mockTasks, mockTodos, renderMockStore} from "./Mock";
import {useFilter} from "../Hooks/hook";
import {renderHook} from "@testing-library/react-hooks";

afterEach(cleanup);

describe('FilterTodo Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<FilterTodo todos={mockTodos} index={0}/>);
    });
    it("if todo tasks, find list", () => {
        const {container} = renderMockStore(<FilterTodo todos={mockTodos} index={0}/>);
        expect(container.getElementsByClassName('filters').length).toBe(1)
    });
    it("if filter store set good filter class", () => {
        // const { filter } = renderHook(() => useFilter())
        // const mock = [{tasks: [mockTasks], filter}]
        const {container} = renderMockStore(<FilterTodo todos={mockTodos} index={0}/>);
        expect(container.getElementsByClassName('selected').length).toBe(1)
    });
})
