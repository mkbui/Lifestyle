import {
  SET_VIEW_FILTER, 
  ADD_EXERCISE,
  ViewFilters,
  REMOVE_EXERCISE,
} from '../actions';

import uuid from "react-native-uuid";

const default_image = require("../../assets/default_image.png");

const {VIEW_ALL} = ViewFilters;

const initialState = {
  viewFilters:  ViewFilters.VIEW_ALL,
  exercises: [
    {
      name: 'Sit-up',
      category: 'abs',
      image: default_image,
      id: uuid.v4(),
    },
    {
      name: 'Sit-down',
      category: 'relax',
      image: default_image,
      id: uuid.v4(),
    }
  ],
}

/* reducer for viewFilters state */
export function exerciseFilter(state = VIEW_ALL, action){
  switch (action.type){
    case SET_VIEW_FILTER:
      return action.filter
    default: return state
  }
}

/* state is an array, for food list only */
export function exerciseOperate(state = initialState.exercises, action){
  switch (action.type){
    case ADD_EXERCISE:
      const newId = uuid.v4()//state.length + 1;
      return [
          ...state,
          {
            name: action.name,
            category: action.category,
            image: default_image,
            id: newId,
          }
        ]
    
    
    case REMOVE_EXERCISE:
      return state.filter((item) =>
          item.id !== action.id
        )
    

    default: 
      return state
  }
}
