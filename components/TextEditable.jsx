import React, {useEffect, useState} from 'react';
import AddForm from "./Forms/AddForm";
import {useEditing, useValue} from '../Hooks/hook'

function TextEditable(props) {
    const {isLarge, content, setStore, index, setParent, isFocus} = props;
    const {isEditing, setIsEditing} = useEditing();
    const {value, setValue} = useValue();

    const handleSetEditing = (bool) => {
        setIsEditing(bool)
        if (setParent)
            setParent(bool)
    }

    const handleClose = (e) => {
        e.preventDefault();
        handleSetEditing(false)
        setValue(content)
    }
    const handleSave = () => {
        if (isLarge) {
            setStore(value)
        } else {
            setStore({title: value, index})
        }
        handleSetEditing(false)
    }

    const textRender = () => {
        if (isLarge) {
            return <h1 data-testid="editable" className="editable" onClick={() => handleSetEditing(true)}>
                <span className="simple_content">{value}</span>
            </h1>
        }
        return <button className="btn btn-editable" onClick={() => handleSetEditing(true)}>
            <h3 className="box_title">
                <span>{value}</span>
            </h3>
        </button>
    }

    useEffect(() => {
        setValue(content)
        if (isFocus)
            setIsEditing(isFocus)
    }, [setValue, isFocus])

    return (<>
        {!isEditing && textRender()}
        {isEditing &&
        <AddForm value={value} setValue={setValue} handleClose={handleClose} handleSave={handleSave}/>}
    </>);
}

export default TextEditable;
