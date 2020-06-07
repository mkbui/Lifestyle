import {
  SET_VIEW_FILTER, 
  ADD_FOOD,
  REMOVE_FOOD,
  ViewFilters,
} from '../actions';

import { combineReducers } from 'redux';
const default_image = require("../../assets/default_image.png");

const {VIEW_ALL} = ViewFilters;

const initialState = {
  viewFilters:  ViewFilters.VIEW_ALL,
  food: [
    {
      name: 'egg',
      category: 'protein',
      image: default_image,
      id: 1,
    },
    {
      name: 'potato',
      category: 'vegetable',
      image: default_image,
      id: 2,
    }
  ],
}

/* reducer for viewFilters state */
export function foodFilter(state = VIEW_ALL, action){
  switch (action.type){
    case SET_VIEW_FILTER:
      return action.filter
    default: return state
  }
}

/* state is an array, for food list only */
export function foodOperate(state = initialState.food, action){
  return state;
  const {food} = state; 
  switch (action.type){
    case ADD_FOOD:
      const {newFood} = action.food;
      const newId = state.food.length() + 1;
      return [
          ...state,
          {
            name: newFood.name,
            category: newFood.category,
            id: newId,
          }
        ]
      
    case REMOVE_FOOD:
      return state.filter((item) =>
          item.id !== action.id
        )
    
    default: 
      return state
  }
}

/* reducer for initial generous state */

/*
export function foodDisplay(state = initialState, action) {
  switch (action.type){
    case SET_VIEW_FILTER:
      return Object.assign({}, state, {
        viewFilters: action.filter
      })

    case ADD_FOOD:
      const {newFood} = action.food;
      const newId = state.food.length() + 1;
      return Object.assign({}, state, {
        food: [
          ...state.food,
          {
            name: newFood.name,
            category: newFood.category,
            id: newId,
          }
        ]
      })

    case REMOVE_FOOD:
      return Object.assign({}, state, {
        food: state.food.filter((item) =>
          item.id !== action.id
        )
      })
    
    default: 
      return state
  }
}
*/

/* make a combination reducer for all sep. type */
const appReducer = combineReducers({
  foodFilter: foodFilter,
  foodList: foodOperate,
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