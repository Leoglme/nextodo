import React from "react";
import {cleanup, act, render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {renderHook} from '@testing-library/react-hooks'
import {useOpen} from "../Hooks/hook";
import Task from "../components/Task";
import {mockProvided, mockTask, renderMockStore, store} from "./Mock";

afterEach(cleanup);

jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,
}));


describe('Task Components Tests', () => {
    it("renders correctly", () => {
        const {asFragment} = renderMockStore(<Task task={mockTask} provided={mockProvided}/>);
    });
    it("if editing not equal refId, find task container", () => {
        const {container} = renderMockStore(<Task task={mockTask}
                                                  editing={'0.1'}
                                                  tabIndex={0}
                                                  provided={mockProvided}/>);
        expect(container.getElementsByClassName('task').length).toBe(1)
    });
    it("verify checkbox checked if task completed", () => {
        const {container} = renderMockStore(<Task task={mockTask}
                                                  editing={'0.1'}
                                                  tabIndex={0}
                                                  provided={mockProvided}/>);
        expect(container.getElementsByTagName('input')[0]).toBeChecked()
    });
    it("verify props task name content", () => {
        const {container} = renderMockStore(<Task task={mockTask}
                                                  editing={'0.1'}
                                                  tabIndex={0}
                                                  provided={mockProvided}/>);
        expect(container.getElementsByClassName('task_name')[0].innerHTML).toEqual(mockTask.name)
    });
    it("verify props task description content", () => {
        const {container} = renderMockStore(<Task task={mockTask}
                                                  editing={'0.1'}
                                                  tabIndex={0}
                                                  provided={mockProvided}/>);
        expect(container.getElementsByClassName('task_description')[0].innerHTML)
            .toEqual(mockTask.description)
    });


    describe('Open Hook Tests', () => {
        it("if default open value is false", () => {
            const {result} = renderHook(() => useOpen())
            expect(result.current.open).toBe(false)
        });
        it("if set open hook work", () => {
            const {result} = renderHook(() => useOpen())
            act(() => {
                result.current.setOpen(true)
            })
            expect(result.current.open).toBe(true)
        });
    })
})
