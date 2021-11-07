import React from "react";
import {cleanup, act} from "@testing-library/react";
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import {useEditing} from "../Hooks/hook";
import Todos from "../components/Todos";
import {mockProvided, renderMockStore} from "./Mock";

afterEach(cleanup);

describe('Todos Components Tests', () => {
    it("renders", () => {
        const { asFragment } = renderMockStore(<Todos provided={mockProvided} tasks={[]}/>);
    });

    describe('Editing Hook Tests', () => {
        it("if default editing value is false", () => {
            const { result } = renderHook(() => useEditing())
            expect(result.current.isEditing).toBe(false)
        });
        it("if set editing hook work", () => {
            const { result } = renderHook(() => useEditing())
            act(() => {
                result.current.setIsEditing(true)
            })
            expect(result.current.isEditing).toBe(true)
        });
    })
})
