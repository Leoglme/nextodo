import React from 'react';
import {connect} from "react-redux";
import {filterBoxSelector, todosSelector} from "../store/TodoStore/TodoSelectors";
import {filterBoxAction} from "../store/TodoStore/TodoActions";

const FilterTodo = (props) => {
    const {todos, filter, setFilter, index} = props;
    return (<>
        {todos[index].tasks.length > 0 &&
        <ul className="filters">
                <li><a className={filter(index) === null ? 'selected' : null}
                       onClick={() => setFilter({filter: null, index})}>Toutes</a></li>
                <li><a className={filter(index) === false ? 'selected' : null} onClick={() => setFilter({filter: false, index})}>À
                    faire</a></li>
                <li><a className={filter(index) === true ? 'selected' : null}
                       onClick={() => setFilter({filter: true, index})}>Faites</a></li>
            </ul>}
    </>);
}

export default connect(
    (state) => ({
        todos: todosSelector(state),
        filter:(index) => filterBoxSelector(state, index),
    }),
    (dispatch) => ({
        setFilter: payload => dispatch(filterBoxAction(payload)),
    })
)(FilterTodo)
