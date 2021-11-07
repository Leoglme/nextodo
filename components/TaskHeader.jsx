import React, {useRef} from 'react';
import TextEditable from "./TextEditable";
import {CloseSquare, Delete, Edit, Setting} from "react-iconly";
import {connect} from "react-redux";
import {todosTitleSelector} from "../store/TodoStore/TodoSelectors";
import {deleteBoxAction, deleteCompleted, updateTodoTitle} from "../store/TodoStore/TodoActions";
import clsx from "clsx";
import DropDown from "./Common/DropDown";
import {useEditing, useOpen} from "../Hooks/hook";

function TaskHeader(props) {
    const {count, index, title, updateTitle, deleteCompleted, deleteBoxAction} = props;
    const {isEditing, setIsEditing} = useEditing();
    const {open, setOpen} = useOpen();


    /* Dropdown Props */
    const buttonRef = useRef()
    const marginPos = 120;
    const top = 35;
    const menuList = [
        {
            name: 'Modifier la liste',
            icon: <Edit set="curved"/>,
            onClick: () => setIsEditing(true)
        },
        {
            name: 'Supprimer les tâches achevées',
            icon: <CloseSquare set="curved"/>,
            onClick: () => deleteCompleted(index)
        },
        {
            name: 'Supprimer la liste',
            icon: <Delete set="curved"/>,
            onClick: () => deleteBoxAction(index)
        }
    ]

    return (<>
        <header className={clsx("box_header", isEditing ? 'active' : null)}>
            <div className="box_header--info">
                <TextEditable content={title(index)}
                              setStore={updateTitle}
                              isFocus={isEditing}
                              index={index}
                              setParent={setIsEditing}/>
                {!isEditing && <p className="task_count">{count}</p>}
            </div>
            {!isEditing && <div className="box_header--action">
                <button className="btn box_header--button icon-button" ref={buttonRef}
                        style={open ? {pointerEvents: 'none'} : null}
                        onClick={() => setOpen(true)}>
                    <Setting set="curved" size={20}/>
                </button>
            </div>}
        </header>
        {!isEditing && <DropDown menuList={menuList} marginPos={marginPos} top={top} open={open} setOpen={setOpen}
                   buttonRef={buttonRef}/>}
    </>);
}

export default connect(
    (state) => ({
        title: (index) => todosTitleSelector(state, index)
    }),
    (dispatch) => ({
        updateTitle: state => dispatch(updateTodoTitle(state)),
        deleteCompleted: state => dispatch(deleteCompleted(state)),
        deleteBoxAction: state => dispatch(deleteBoxAction(state))
    })
)(TaskHeader)
