import React, {useRef, useState} from 'react';
import TextEditable from "../TextEditable";
import {Delete, Paper, PaperFail, Setting, Swap, TickSquare} from "react-iconly";
import {Tooltip} from "@nextui-org/react";
import {connect} from "react-redux";
import {appTitleSelector} from "../../store/CommonStore/CommonSelectors";
import {updateAppTitle} from "../../store/CommonStore/CommonActions";
import DropDown from "../Common/DropDown";
import {useOpen} from "../../Hooks/hook";
import {deleteAllDone, setAppFilters} from "../../store/TodoStore/TodoActions";

function ActionBar({updateAppTitle, app_title, setAppFilters, deleteAllDone}) {
    const settingRef = useRef()
    const filterRef = useRef()
    const {open, setOpen} = useOpen()
    const [filterOpen, setFilterOpen] = useState(false)

    /* Dropdown Props */
    const marginPos = 225;
    const top = 70;
    const filterMarginPos = 189;
    const filterTop = 70;
    const settingsList = [
        {
            name: 'Supprimer les tâches achevées',
            icon: <Delete set="curved"/>,
            onClick: () => deleteAllDone()
        },
    ]
    const filterList = [
        {
            name: 'Afficher toutes les tâches',
            icon: <Paper set="curved"/>,
            onClick: () => setAppFilters(null)
        },
        {
            name: 'Afficher les tâches à faire',
            icon: <PaperFail set="curved"/>,
            onClick: () => setAppFilters(false)
        },
        {
            name: 'Afficher les tâches faites',
            icon: <TickSquare set="curved"/>,
            onClick: () => setAppFilters(true)
        }
    ]

    const handleFilter = () => {
        setFilterOpen(true)
    }
    return (<>
        <header className="content_header">
            <div className="content_header--content">
                <TextEditable isLarge={true} content={app_title} setStore={updateAppTitle}/>

                <div className="content_header--action">
                    <button ref={filterRef} type="button" className="btn icon-button" aria-label="Menu des options de tri" disabled={filterOpen}
                            onClick={handleFilter}>
                        <Swap set="curved"/>
                        <span className="action_label">Trier</span>
                    </button>
                    <Tooltip content="Plus d'actions" color="#282828" position="bottomEnd" style={open ? {pointerEvents: 'none'}: null}>
                        <button ref={settingRef} type="button" onClick={() => setOpen(true)}
                                className="btn icon-button" aria-label="Menu des options de tri">
                            <Setting set="curved"/>
                        </button>
                    </Tooltip>
                    <DropDown menuList={settingsList} marginPos={marginPos} top={top} open={open}
                               setOpen={setOpen} buttonRef={settingRef}/>
                   <DropDown menuList={filterList} marginPos={filterMarginPos} top={filterTop} open={filterOpen}
                               setOpen={setFilterOpen} buttonRef={filterRef}/>
                </div>
            </div>
        </header>
    </>);
}

export default connect(
    (state) => ({
        app_title: appTitleSelector(state)
    }),
    (dispatch) => ({
        updateAppTitle: title => dispatch(updateAppTitle(title)),
        deleteAllDone: state => dispatch(deleteAllDone(state)),
        setAppFilters: state => dispatch(setAppFilters(state))
    })
)(ActionBar)
