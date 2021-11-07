import React, {useState} from 'react';
import {connect} from "react-redux";
import {todosRemainingSelector, todosSelector} from "../store/TodoStore/TodoSelectors";
import Todos from "./Todos";
import {
    deleteTodoAction,
    updateBoxPositionAction,
    updateTasksAction,
    updateTodoAction
} from "../store/TodoStore/TodoActions";
import ActionBar from "./Navigation/ActionBar";
import AddBox from "./AddBox";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const TodosApp = (props) => {
    const {todos, updateTodoAction, deleteTodoAction, remaining, updateTasksAction, updateBoxPositionAction} = props;
    const [currentBox, setCurrentBox] = useState(null)

    function resetIds(array) {
        array.map((elem, index) => {
            elem.id = index + 1
        })
        return array;
    }

    function resetStyle() {
        const emptyTask = document.querySelectorAll('.empty_task');
        const emptyBox = document.querySelectorAll('.empty_box')
        for (let i = 0; i < emptyTask.length; i++) {
            emptyTask[i].style.height = '0px';
            emptyTask[i].style.transform = `translateY(0px)`;
        }
        for (let i = 0; i < emptyBox.length; i++) {
            emptyBox[i].style.display = "none"
            emptyBox[i].style.transform = `translateX(0px)`
        }

    }

    function onDragEnd(result) {
        const {destination, source, draggableId, type} = result;
        resetStyle();
        if (!destination) return;
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) return;

        if (type === 'column') {
            updateBoxPositionAction({oldIndex: source.index, newIndex: destination.index})
            return;
        }
        const dropId = parseInt(source.droppableId);
        const dropDestId = parseInt(destination.droppableId)
        const dragId = parseInt(draggableId.split(".")[1]);

        const start = todos[dropId];
        const finish = todos[dropDestId];
        const taskId = dragId - 1;

        if (start === finish) {
            let newTasks = Array.from(start.tasks);


            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, start.tasks[taskId]);

            updateTasksAction({tasks: resetIds(newTasks), index: parseInt(source.droppableId)})
            return;
        }

        //Move to another column
        const startTasks = Array.from(start.tasks);
        startTasks.splice(source.index, 1);

        const finishTasks = Array.from(finish.tasks)
        finishTasks.splice(destination.index, 0, start.tasks[taskId]);

        updateTasksAction({tasks: resetIds(startTasks), index: dropId})
        updateTasksAction({tasks: resetIds(finishTasks), index: dropDestId})
    }

    function onDragstart(result) {
        const {destination, source, draggableId, type} = result;
        if (type === 'task') {
            const currentTask = document.querySelector('.task[data-rbd-draggable-id="' + draggableId + '"]');
            const emptyTask = document.querySelector('.task_list.active .empty_task');
            const taskHeight = currentTask.offsetHeight;
            const tasksLength = document.querySelectorAll('.task_list.active .task').length;
            emptyTask.style.transform = `translateY(-${((tasksLength - 1) - source.index) * 60}px)`;
            emptyTask.style.height = taskHeight + 'px';
        }
    }

    function onDragUpdate(result) {
        const {destination, source, draggableId, type} = result;

        if (!destination) {
            resetStyle()
        }

        if (type === 'task' && destination) {
            setCurrentBox(destination.droppableId)
            const box = currentBox ? currentBox : source.droppableId;
            if (box !== destination.droppableId) {
                const currentTask = document.querySelector('.task[data-rbd-draggable-id="' + draggableId + '"]');
                const taskHeight = currentTask.offsetHeight;
                const emptyTask = document.querySelector('.task_list.active .empty_task');
                const oldEmpty = document.querySelectorAll('.empty_task')[parseInt(source.droppableId)];
                const tasksLength = document.querySelectorAll('.task_list.active .task').length;

                oldEmpty.style.height = '0px';
                oldEmpty.style.transform = `translateY(0px)`;

                if (emptyTask){
                    if (source.droppableId !== destination.droppableId) {
                        emptyTask.style.transform = `translateY(-${((tasksLength) - destination.index) * 60}px)`;
                    }else {
                        emptyTask.style.transform = `translateY(-${((tasksLength - 1) - destination.index) * 60}px)`;
                    }
                    emptyTask.style.height = taskHeight + 'px';
                }
            } else {
                let tasksLength = document.querySelectorAll('.task_list.active .task').length;
                const emptyTask = document.querySelector('.task_list.active .empty_task');
                const currentTask = document.querySelector('.task[data-rbd-draggable-id="' + draggableId + '"]');
                const taskHeight = currentTask.offsetHeight;
                if (source.droppableId !== destination.droppableId) {
                    emptyTask.style.transform = `translateY(-${((tasksLength) - destination.index) * 60}px)`;
                    emptyTask.style.height = taskHeight + 'px';
                } else {
                    emptyTask.style.transform = `translateY(-${((tasksLength - 1) - destination.index) * 60}px)`;
                    emptyTask.style.height = taskHeight + 'px';
                }
            }
        }
    }


    return (<>
        <div className="content_wrapper">
            <ActionBar/>
            <DragDropContext
                onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
                onDragStart={onDragstart}>
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column">
                    {provided => (
                        <div className="listBox"
                             {...provided.droppableProps}
                             ref={provided.innerRef}>
                            {todos.map((todo, index) => {
                                return <Todos
                                    remaining={remaining(index).length}
                                    title={todo.title}
                                    filter={todo.filter}
                                    index={index}
                                    updateTodoAction={updateTodoAction}
                                    deleteTodoAction={deleteTodoAction}
                                    key={todo.title + index}
                                    tasks={todo.tasks}/>
                            })}
                            {provided.placeholder}
                            <AddBox/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    </>);
}

export default connect(
    (state) => ({
        todos: todosSelector(state),
        remaining: (index) => todosRemainingSelector(state, index),
    }),
    (dispatch) => ({
        updateTodoAction: todo => dispatch(updateTodoAction(todo)),
        updateBoxPositionAction: todo => dispatch(updateBoxPositionAction(todo)),
        updateTasksAction: (todo, index) => dispatch(updateTasksAction(todo, index)),
        deleteTodoAction: todo => dispatch(deleteTodoAction(todo)),
    })
)(TodosApp)
