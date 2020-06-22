

import { combineReducers } from 'redux';
import {foodFilter, foodOperate} from "./foodReducer"
import {exerciseFilter, exerciseOperate} from "./exerciseReducer";
import {userAccess} from "./userReducer";
import {activityOperate} from "./activityReducer"

/* make a combination reducer for all sep. type */
/* This will be the store reference for mapStateToProps when accessing data */
const appReducer = combineReducers({
  foodFilter: foodFilter,
  foodList: foodOperate,
  exerciseFilter: exerciseFilter,
  exerciseList: exerciseOperate,
  user: userAccess,
  activityList: activityOperate,
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