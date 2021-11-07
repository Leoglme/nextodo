import React from 'react';
import {addTodoAction} from '../store/TodoStore/TodoActions'
import {connect} from 'react-redux';
import {Plus} from "react-iconly";
import TodoForm from "./Forms/TodoForm";
import {useShow, useStyle} from "../Hooks/hook";

const AddTodo = ({todos, addTodoAction, tabIndex}) => {
    const {show, setShow} = useShow()
    const {style, setStyle} = useStyle()
    const isEmpty = todos[tabIndex].tasks.length === 0;

    return (<>
        {!show && <div style={isEmpty ? {flex: 1, display: 'flex'} : { paddingLeft: 13, flex: 1, display: 'flex'}}>
            <button className='btn plus_add_button' onClick={() => setShow(true)}
                    onMouseEnter={() => setStyle('bold')}
                    onMouseLeave={() => setStyle('curved')}>
                <Plus set={style} size={20}/>
                Ajouter une tâche
            </button>
        </div>}
        {show && <TodoForm addTodoAction={addTodoAction} tabIndex={tabIndex} show={show} setShow={setShow}/>}
    </>);
}

export default connect(
    (state) => ({
        todos: state.todos,
    }),
    (dispatch) => ({
        addTodoAction: todo => dispatch(addTodoAction(todo))
    })
)(AddTodo)

