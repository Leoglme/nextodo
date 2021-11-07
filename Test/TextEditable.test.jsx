import React from "react";
import {render, cleanup, fireEvent, act} from "@testing-library/react";
import '@testing-library/jest-dom';
import TextEditable from "../components/TextEditable";
import { renderHook } from '@testing-library/react-hooks'
import {useEditing} from '../Hooks/hook'
afterEach(cleanup);
describe('TextEditable Components Tests', () => {
    it("renders", () => {
        const { asFragment } = render(<TextEditable/>);
    });
    it("so isLarge is false, to the right class", () => {
        const { container  } = render(<TextEditable isLarge={false} />);
        expect(container.getElementsByClassName('btn-editable').length).toBe(1);
    });
    it("so isLarge is true, to the right class", () => {
        const { container  } = render(<TextEditable isLarge={true} />);
        expect(container.getElementsByClassName('editable').length).toBe(1);
    });
    it("if click text, state is updated", () => {
        const { getByTestId, container} = render(<TextEditable isLarge={true} />);
        act(() => {
            fireEvent.click(getByTestId('editable'))
        })
        expect(container.getElementsByClassName('editable').length).toBe(0);
    });
    describe('TextEditable Hook Tests', () => {
        it('should use hook isEditing', () => {
            const { result } = renderHook(() => useEditing())
            expect(result.current.isEditing).toBe(false)
        });

        it('should use hook setIsEditing', () => {
            const { result } = renderHook(() => useEditing())
            act(() => {
                result.current.setIsEditing(true)
            })
            expect(result.current.isEditing).toBe(true)
        });
    })
})
