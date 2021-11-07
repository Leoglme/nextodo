import React from 'react'
import AddTodo from "./AddTodo";
import Task from "./Task";
import TaskHeader from "./TaskHeader";
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {connect} from "react-redux";
import {todosSelector} from "../store/TodoStore/TodoSelectors";
import {updateTasksAction} from "../store/TodoStore/TodoActions";
import {useEditing} from '../Hooks/hook'
import clsx from "clsx";
import FilterTodo from "./FilterTodo";
import {filterTodoSelector} from "../store/FilterTodoStore/FilterTodoSelectors";

const Todos = (props) => {
    const {tasks, index, remaining, filter} = props;
    const {isEditing, setIsEditing} = useEditing();
    const droppableId = index !== undefined ? index.toString() : undefined;


    const renderTasks = () => {
        return tasks.map((task, id) => {
            if (filter === null){
                return <Task key={id + '.' + task.id}
                             task={task}
                             taskIndex={id}
                             setEditing={setIsEditing}
                             editing={isEditing}
                             tabIndex={index}/>
            }else if (filter === task.completed){
                return <Task key={id + '.' + task.id}
                             task={task}
                             taskIndex={id}
                             setEditing={setIsEditing}
                             editing={isEditing}
                             tabIndex={index}/>
            }
        })
    }

    return (<>
        {index !== undefined ?
            <Draggable draggableId={droppableId} index={index}>
                {(provided, snapshot) => (
                    <section {...provided.draggableProps}
                             {...provided.dragHandleProps}
                             className={clsx('box', snapshot.isDragging ? 'box_dragging' : null)}
                             ref={provided.innerRef}>
                        <TaskHeader count={remaining} index={index}/>
                        <FilterTodo index={index}/>
                        <Droppable droppableId={droppableId} type="task">
                            {(provided, snapshot) => (<div ref={provided.innerRef}
                                                           className={clsx("task_list", snapshot.isDraggingOver ? 'active' : null)}
                                                           {...provided.droppableProps}>
                                {renderTasks()}
                                <div className="empty_task"/>
                                {provided.placeholder}
                            </div>)}
                        </Droppable>

                        <footer className="box_footer">
                            <AddTodo tabIndex={index}/>
                        </footer>
                    </section>
                )}
            </Draggable>
            : null}
    </>);
}

export default connect(
    (state) => ({
        todos: todosSelector(state),
    }),
    (dispatch) => ({
        updateTasksAction: (todo, index) => dispatch(updateTasksAction(todo, index)),
    })
)(Todos)
