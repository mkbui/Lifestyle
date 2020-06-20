export const SET_VIEW_FILTER = 'SET_VIEW_FILTER'
export const ADD_FOOD = 'ADD_FOOD'
export const REMOVE_FOOD = 'REMOVE_FOOD'
export const CREATE_USER = 'CREATE_USER'
export const ADD_EXERCISE = 'ADD_EXERCISE'
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE'
export const CALCULATE_INFO = 'CALCULATE_INFO'
export const CREATE_NEW_DAILY = 'CREATE_NEW_DAILY'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'

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


export function createUser(name, initInfo){
  
  return { type: CREATE_USER, name, initInfo }
}

export function calculateInfo(info){
  return { type: CALCULATE_INFO, info}
}

export function createNewDaily(){
  return { type: CREATE_NEW_DAILY}
}

export function addFood(name, category){
  return { type: ADD_FOOD, name, category };
}

export function removeFood(id){
  return { type: REMOVE_FOOD, id };
}

export function addExercise(name, category){
  return {type: ADD_EXERCISE, name, category};
}

export function removeExercise(id){
  return { type: REMOVE_EXERCISE, id };
}

export function setViewFilters(filter) {
  return { type: SET_VIEW_FILTER, filter}
}

export function addActivity(activity){
  return { type: ADD_ACTIVITY, activity };
}

export function removeActivity(id){
  return { type: REMOVE_ACTIVITY, id };
}