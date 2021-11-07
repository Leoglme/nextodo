import React from "react";
import {act, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom';
import {mockMenuList, renderMockStore} from "./Mock";
import DropDown from "../components/Common/DropDown";
import {renderHook} from "@testing-library/react-hooks";
import {useDropdown} from "../Hooks/hook";

afterEach(cleanup);

const mockRef = {
    current: {offsetLeft: 5}
}

const mockMarginPos = 2;
const mockTop = 25;

describe('DropDown Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<DropDown menuList={mockMenuList} buttonRef={mockRef}/>);
    });
    it("if props open equal true, dropdown div has class active", () => {
        const {container} = renderMockStore(<DropDown open={true}
            menuList={mockMenuList} buttonRef={mockRef}/>);
        expect(container.getElementsByClassName('dropdown')[0]).toHaveClass('active')
    });
    it("if menu list render dropdown list", () => {
        const {container} = renderMockStore(<DropDown open={true}
            menuList={mockMenuList} buttonRef={mockRef}/>);
        expect(container.getElementsByClassName('dropdown_list').length).toBe(1)
    });
    it("if transform style with dropdownX state && top props work", () => {
        const {container} = renderMockStore(<DropDown open={true} top={mockTop} marginPos={mockMarginPos}
                                                      menuList={mockMenuList} buttonRef={mockRef}/>);
        const translateX = mockRef.current.offsetLeft - mockMarginPos;
        expect(container.getElementsByClassName('dropdown')[0])
            .toHaveStyle(`transform: translate(${translateX}px, ${mockTop}px)`)
    });

    describe('useDropdown Hook Tests', () => {
        it("if default dropdownX value is 0", () => {
            const {result} = renderHook(() => useDropdown())
            expect(result.current.dropdownX).toBe(0)
        });
        it("if set dropdownX hook work", () => {
            const {result} = renderHook(() => useDropdown())
            act(() => {
                result.current.setDropdownX(500)
            })
            expect(result.current.dropdownX).toBe(500)
        });
    })
})
