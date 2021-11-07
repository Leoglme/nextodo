import React from "react";
import {act, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import {renderMockStore} from "./Mock";
import {renderHook} from "@testing-library/react-hooks";
import {useShow, useStyle} from "../Hooks/hook";
import AddTodo from "../components/AddTodo";

afterEach(cleanup);

describe('AddTodo Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<AddTodo tabIndex={0}/>);
    });

    it("if show is false, find plus add button", () => {
        const {container} = renderMockStore(<AddTodo tabIndex={0}/>);
        expect(container.getElementsByClassName('plus_add_button').length).toBe(1)
    });

    describe('show Hook Tests', () => {
        it("if default show value is false", () => {
            const { result } = renderHook(() => useShow())
            expect(result.current.show).toBe(false)
        });
        it("if set show hook work", () => {
            const { result } = renderHook(() => useShow())
            act(() => {
                result.current.setShow(true)
            })
            expect(result.current.show).toBe(true)
        });
    })
    describe('style Hook Tests', () => {
        it("if default style value is curved", () => {
            const { result } = renderHook(() => useStyle())
            expect(result.current.style).toBe('curved')
        });
        it("if set style hook work", () => {
            const { result } = renderHook(() => useStyle())
            act(() => {
                result.current.setStyle('bold')
            })
            expect(result.current.style).toBe('bold')
        });
    })
})
