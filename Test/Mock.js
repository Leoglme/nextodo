import configureMockStore from "redux-mock-store";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React, {useState} from "react";
import {Delete, Edit} from "react-iconly";
import {DragDropContext} from "react-beautiful-dnd";


const mockTask = {id: 0, name: 'name', description: 'description', completed: true}
const mockTasks = [
    {id: 0, name: 'name', description: 'description', completed: true},
    {id: 1, name: 'name', description: 'description', completed: true}
]
const mockTodos = [{tasks: [mockTasks], filter: null}]
const mockStore = configureMockStore();
const mockProvided = {droppableProps: null, innerRef: null}
const mockCommon = {app_title: 'app_title'}
const store = mockStore({todos: mockTodos, filter: null, common: mockCommon});


function renderMockStore(component) {
    return render(<Provider store={store}>
        <DragDropContext onDragEnd={() => {}} onDragUpdate={() => {}} onDragStart={() => {}}>>
            {component}
        </DragDropContext>
    </Provider>)
}

const mockMenuList = [
    {
        name: 'Modifier la tâche',
        icon: <Edit set="curved"/>,
        onClick: () => console.log('testing')
    },
    {
        name: 'Supprimer la tâche',
        icon: <Delete set="curved"/>,
        onClick: () => console.log('testing')
    }
]


export {mockTask, renderMockStore, mockStore, mockProvided, mockTodos, mockTasks, mockCommon, mockMenuList, store}
