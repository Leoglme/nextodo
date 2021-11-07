import React from "react";
import {render, cleanup, act} from "@testing-library/react";
import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import AddForm from "../components/Forms/AddForm";
import {useValue} from "../Hooks/hook";

afterEach(cleanup);

describe('AddForm Components Tests', () => {
    it("renders", () => {
        const { asFragment } = render(<AddForm/>);
    });
    it("cancel button exists", () => {
        const { getByText} = render(<AddForm/>);
        expect(getByText('Annuler')).toBeInTheDocument();
    });
    it("save button exists", () => {
        const { getByText} = render(<AddForm/>);
        expect(getByText('Enregistrer')).toBeInTheDocument();
    });
    it("input form exists", () => {
        const { container} = render(<AddForm/>);
        expect(container.getElementsByClassName('editable_field').length).toBe(1);
    });
    describe('TextEditable Hook Tests', () => {
        it("on key up input, update value hook", () => {
            const { result } = renderHook(() => useValue())
            act(() => {
                result.current.setValue('23')
            })
            expect(result.current.value).toBe('23')
        });
    })
})
