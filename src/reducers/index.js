

import { combineReducers } from 'redux';
import {foodOperate} from "./foodReducer"
import {exerciseOperate} from "./exListReducer";
import {userAccess} from "./userReducer";
import {activityOperate} from "./activityReducer";
import {budgetReducer} from "./budgetReducer";
import mealReducer from "./mealReducer";
import exerciseReducer from "./exerciseReducer"

/* make a combination reducer for all sep. type */
/* This will be the store reference for mapStateToProps when accessing data */
const appReducer = combineReducers({
  foodList: foodOperate,
  exerciseList: exerciseOperate,
  user: userAccess,
  activityList: activityOperate,
  budgetReducer: budgetReducer,
  exerciseReducer,
  mealReducer,
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