const SET_VIEW_FILTER = 'SET_VIEW_FILTER'
const ADD_FOOD = 'ADD_FOOD'
const REMOVE_FOOD = 'REMOVE_FOOD'

export const ViewFilters = {
  VIEW_ALL: 'VIEW_ALL',
  VIEW_EGGS: 'VIEW_EGGS',
}

/* action creators */

/*
export const actionCreators = {
  add_food: food => {
    return {type: ADD_FOOD, food}
  },
  remove_food: id => {
    return {type: REMOVE_FOOD, id};
  },
}
*/

export function addFood(name, category){
  return { type: ADD_FOOD, name, category };
}

export function removeFood(id){
  return { type: REMOVE_FOOD, id };
}

export function setViewFilters(filter) {
  return { type: SET_VIEW_FILTER, filter}
}