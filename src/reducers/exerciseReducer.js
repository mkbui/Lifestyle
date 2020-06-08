import {
  SET_VIEW_FILTER, 
  ADD_EXERCISE,
  REMOVE_FOOD,
  ViewFilters,
} from '../actions';


const default_image = require("../../assets/default_image.png");

const {VIEW_ALL} = ViewFilters;

const initialState = {
  viewFilters:  ViewFilters.VIEW_ALL,
  exercises: [
    {
      name: 'Sit-up',
      category: 'abs',
      image: default_image,
      id: 1,
    },
    {
      name: 'Sit-down',
      category: 'relax',
      image: default_image,
      id: 2,
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
      const newId = state.exercises.length + 1;
      return [
          ...state,
          {
            name: action.name,
            category: action.category,
            id: newId,
          }
        ]
    
    /*
    case REMOVE_FOOD:
      return state.filter((item) =>
          item.id !== action.id
        )
    */

    default: 
      return state
  }
}