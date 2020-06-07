

import { combineReducers } from 'redux';
import {foodFilter, foodOperate} from "./foodReducer"
import {exerciseFilter, exerciseOperate} from "./exerciseReducer";

/* make a combination reducer for all sep. type */
const appReducer = combineReducers({
  foodFilter: foodFilter,
  foodList: foodOperate,
  exerciseFilter: exerciseFilter,
  exerciseList: exerciseOperate
})

export default appReducer;


/*
case TOGGLE_TODO:
  return Object.assign({}, state, {
    todos: state.todos.map((todo, index) => {
      if (index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  })
*/