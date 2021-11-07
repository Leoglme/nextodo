import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@nextui-org/react";
import autosize from "autosize";

function TodoForm({addTodoAction, updateTodoAction, tabIndex, show, setShow, nameValue, descValue, buttonText, task}) {

    const inputName = useRef(null)
    const inputDesc = useRef(null)


    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputName.current.value.length !== 0) {
            if (!updateTodoAction){
                addTodoAction({value: inputName.current.value, index: tabIndex, description: inputDesc.current.value})
            }else if (updateTodoAction && task) {
                const updated = {
                    name: inputName.current.value,
                    description: inputDesc.current.value,
                }
                updateTodoAction({updated, index: tabIndex, task})
            }
            inputName.current.value = '';
            inputDesc.current.value = '';
            setShow(false)
        }
    }

    const handleKeypress = (e) => {
        if (e.key === 'Enter'){
            handleSubmit(e)
            setShow(true)
        }
    }


    useEffect(() => {
        inputName.current.value = nameValue ? nameValue : '';
        inputDesc.current.value = descValue ? descValue : '';
        autosize(inputName.current);
        autosize(inputDesc.current);
        if (show) {
            inputName.current.focus();
        }
    }, [show])

    return (<>
        <form onSubmit={handleSubmit} style={{width: 260, marginBottom: 20}}>
            <div className="task_editor">
                <div className="task_editor__input_fields">
                    <div className="task_editor__content_field">
                        <div style={{flex: "1", fontWeight: "500"}}>
                         <textarea ref={inputName} style={{margin: 0}} onKeyPress={handleKeypress}
                                   rows="1" className="task_editor__description" placeholder='Saisir un nom de tâche'/>
                        </div>
                    </div>

                    <textarea ref={inputDesc} placeholder='Description' className="task_editor__description"
                              onKeyPress={handleKeypress}/>
                </div>
            </div>
            <div className="task_editor--action">
                <Button htmlType='submit' color="warning" size="small" style={{textTransform: 'none'}} auto>
                    {buttonText ? buttonText : 'Ajouter une tâche'}
                </Button>
                <Button bordered color="#bdbdbd" size="small" onClick={() => setShow(false)}
                        style={{borderWidth: 1, top: 1, marginLeft: 12}} auto>
                    Annuler
                </Button>
            </div>
        </form>
    </>);
}

export default TodoForm;
