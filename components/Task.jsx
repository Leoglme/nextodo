import React, {useRef, useState} from 'react';
import {Checkbox, Tooltip} from "@nextui-org/react";
import {Delete, Edit, MoreSquare} from "react-iconly";
import TodoForm from "./Forms/TodoForm";
import {connect} from "react-redux";
import {todosSelector} from "../store/TodoStore/TodoSelectors";
import {deleteTodoAction, toggleTodoAction, updateTodoAction} from "../store/TodoStore/TodoActions";
import DropDown from "./Common/DropDown";
import {useOpen} from "../Hooks/hook";
import { Draggable } from 'react-beautiful-dnd';
import clsx from "clsx";

function Task(props) {

    const {
        toggleTodoAction, task, tabIndex, taskIndex, setEditing, editing, deleteTodoAction,
        updateTodoAction
    } = props;
    const refId = tabIndex + '.' + task.id;
    const {open, setOpen} = useOpen()
    const [active, setActive] = useState(false)

    /* Dropdown Props */
    const buttonRef = useRef()
    const marginPos = 100;
    const top = 85 + (60 * taskIndex);
    const menuList = [
        {
            name: 'Modifier la tâche',
            icon: <Edit set="curved"/>,
            onClick: () => setEditing(refId)
        },
        {
            name: 'Supprimer la tâche',
            icon: <Delete set="curved"/>,
            onClick: () => deleteTodoAction({task, index: tabIndex})
        }
    ]


    return (<>
        {editing !== refId &&
        <Draggable  draggableId={refId} index={taskIndex}>
            {(provided, snapshot) => (
                <div {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                     className={clsx('task', snapshot.isDragging ? 'task_dragging' : null)}>
                    <Checkbox rounded color="warning" className={'task_checkbox'} checked={task.completed}
                              onChange={() => toggleTodoAction({task, index: tabIndex})} line>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 8}}>
                            <span className="task_name">{task.name}</span>
                            <span className="task_description">{task.description}</span>
                        </div>
                    </Checkbox>
                    <Tooltip content="Éditer la tâche" color="#282828" position="bottomStart"
                             style={open ? {opacity: 1, pointerEvents: 'none'} : null}>
                        <button type="button" ref={buttonRef} style={open ? {pointerEvents: 'none'} : null}
                                onClick={() => setOpen(true)}
                                className="btn icon-button" aria-label="Menu edition de tâche">
                            <MoreSquare set="curved"/>
                        </button>
                    </Tooltip>
                </div>
            )}

        </Draggable>}

        {editing === refId &&
        <TodoForm nameValue={task.name} descValue={task.description} buttonText={'Modifier une tâche'}
                  updateTodoAction={updateTodoAction} task={task} tabIndex={tabIndex} show={editing === refId}
                  setShow={setEditing}/>}

        {editing !== refId &&
        <DropDown menuList={menuList} marginPos={marginPos} top={top} open={open} setOpen={setOpen}
                  buttonRef={buttonRef}/>}
    </>);
}


export default connect(
    (state) => ({
        todos: todosSelector(state),
    }),
    (dispatch) => ({
        toggleTodoAction: todo => dispatch(toggleTodoAction(todo)),
        deleteTodoAction: (todo, index) => dispatch(deleteTodoAction(todo, index)),
        updateTodoAction: todo => dispatch(updateTodoAction(todo)),
    })
)(Task)
