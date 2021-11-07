import React from "react";
import {act, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import {renderMockStore} from "./Mock";
import {renderHook} from "@testing-library/react-hooks";
import {useBox} from "../Hooks/hook";
import AddBox from "../components/AddBox";

afterEach(cleanup);

describe('AddBox Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<AddBox/>);
    });
    it("if not setEditing find button with add_box--button class", () => {
        const {container} = renderMockStore(<AddBox/>);
        expect(container.getElementsByClassName('add_box--button').length).toBe(1)
    });

    describe('Editing Hook Tests', () => {
        it("if default editing value is false", () => {
            const { result } = renderHook(() => useBox())
            expect(result.current.isEditing).toBe(false)
        });
        it("if set editing hook work", () => {
            const { result } = renderHook(() => useBox())
            act(() => {
                result.current.setIsEditing(true)
            })
            expect(result.current.isEditing).toBe(true)
        });
    })
    describe('Value Hook Tests', () => {
        it("if default editing value is empty", () => {
            const { result } = renderHook(() => useBox())
            expect(result.current.value).toBe('')
        });
        it("if set editing hook work", () => {
            const { result } = renderHook(() => useBox())
            act(() => {
                result.current.setValue('testing')
            })
            expect(result.current.value).toBe('testing')
        });
    })
    it("if handleClose function work", () => {
        const { result } = renderHook(() => useBox())
        act(() => {
            result.current.setValue('testing')
            result.current.setIsEditing(true)
        })
        result.current.handleClose(result.current.event);
        expect(result.current.isEditing).toBe(false)
        expect(result.current.value).toBe('')
    });

})
