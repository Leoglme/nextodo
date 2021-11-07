import React from "react";
import {act, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import {renderMockStore} from "./Mock";
import ActionBar from "../components/Navigation/ActionBar";
import {renderHook} from "@testing-library/react-hooks";
import {useOpen} from "../Hooks/hook";

afterEach(cleanup);

describe('ActionBar Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<ActionBar/>);
    });
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
