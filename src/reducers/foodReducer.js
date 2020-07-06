import {
  SET_VIEW_FILTER, 
  ADD_FOOD,
  REMOVE_FOOD,
} from '../actions';

import { combineReducers } from 'redux';
import uuid from "react-native-uuid";
const default_image = require("../../assets/default_image.png");



import data from "../data/data.json"


/* Initial food list, could be read from json or database file instead */
const initialState = {
  food: /*data.food*/[
    {
      name: 'Egg',
      category: 'Protein',
      image: require("../../assets/food/egg.png"),
      id: 1,
    },
    {
      name: 'Potato',
      category: 'Grains',
      image: require("../../assets/food/potato.png"),
      id: 2,
    },
    {
      name: 'Salmon',
      category: 'Protein',
      image: require("../../assets/food/salmon.png"),
      id: 3,
    },
    {
      name: 'Spinach',
      category: 'Vegetable',
      image: require("../../assets/food/spinach.png"),
      id: 4,
    },
    {
      name: 'Orange',
      category: 'Fruit',
      image: require("../../assets/food/orange.png"),
      id: 5,
    }
  ],
}

/* reducer for viewFilters state */
/*export function foodFilter(state = VIEW_ALL, action){
  switch (action.type){
    case SET_VIEW_FILTER:
      return action.filter
    default: return state
  }
}*/

/* state is an array, for food list only */
export function foodOperate(state = initialState.food, action){
  const {food} = state; 
  switch (action.type){
    case ADD_FOOD:
      const newId = state.length + 1;
      return [
          ...state,
          {
            name: action.name,
            category: action.category,
            image: default_image,
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



