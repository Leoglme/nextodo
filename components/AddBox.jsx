import React, {useEffect, useState} from 'react';
import {Plus} from "react-iconly";
import {Button} from "@nextui-org/react";
import AddForm from "./Forms/AddForm";
import clsx from "clsx";
import {connect} from "react-redux";
import {todosSelector} from "../store/TodoStore/TodoSelectors";
import {addBoxAction} from "../store/TodoStore/TodoActions";
import {useBox} from "../Hooks/hook";

function AddBox(props) {
    const {isEditing, setIsEditing, value, setValue, handleClose} = useBox()

    const {addBoxAction}= props;

    const handleSave = () => {
        setIsEditing(false)
        addBoxAction({title: value, filter: null, tasks: []})
        setValue('')
    }

    return (<>
        <div className={clsx("add-box", isEditing ? 'active' :  null)}>
            {!isEditing && <Button type="button" onClick={() => setIsEditing(true)}
                                   className="add_box--button" aria-label="Menu des options de tri" color="#282828" auto>
                <Plus set="curved" style={{marginRight: 12}}/>
                <span>Ajouter une liste</span>
            </Button>}
            {isEditing &&
            <AddForm value={value} setValue={setValue} handleClose={handleClose} handleSave={handleSave} placeholder={'Donnez un titre à la section'}/>}
        </div>
    </>);
}

export default connect(
    (state) => ({
        state: (index) => todosSelector(state)
    }),
    (dispatch) => ({
        addBoxAction: state => dispatch(addBoxAction(state))
    })
)(AddBox)

