import * as ActionType  from "./ActionType"

// List Display
export const ADD_FOOD = 'ADD_FOOD'
export const REMOVE_FOOD = 'REMOVE_FOOD'
export const ADD_EXERCISE = 'ADD_EXERCISE'
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE'
// User management
export const CREATE_USER = 'CREATE_USER'
export const CALCULATE_INFO = 'CALCULATE_INFO'
export const CREATE_NEW_DAILY = 'CREATE_NEW_DAILY'
export const UPDATE_DAILY_RECORD = 'UPDATE_DAILY_RECORD'
// Schedule Management
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'
export const ACTIVATE_ACTIVITY = 'ACTIVATE_ACTIVITY'
export const MODIFY_ACTIVITY_NAME = 'MODIFY_ACTIVITY_NAME'
export const MODIFY_ACTIVITY_TIME = 'MODIFY_ACTIVITY_TIME'
export const MODIFY_ACTIVITY_REPEAT = 'MODIFY_ACTIVITY_REPEAT'
/*
export const ADD_INCOME_RECORD = 'ADD_INCOME_RECORD'
export const ADD_EXPENSE_RECORD = 'ADD_EXPENSE_RECORD'
export const ADD_CONSUME_RECORD = 'ADD_FITNESS_RECORD'
export const ADD_EXERCISE_RECORD = 'ADD_EXERCISE_RECORD'*/
// Budget
export const SUBMIT = "SUBMIT";
export const DELETE = "DELETE";
export const EDIT = "EDIT";
// Exercise
export const SUBMIT_E = "SUBMIT_E";
export const DELETE_E = "DELETE_E";
export const EDIT_E = "EDIT_E";
// Meal
export const SUBMIT_M = "SUBMIT_M";
export const DELETE_M = "DELETE_M";
export const EDIT_M = "EDIT_M";
// //water
// export const SUBMIT_W = "SUBMIT_W";
<<<<<<< HEAD
// Lock
export const ACTIVATE_PASSWORD    ="ACTIVATE_PASSWORD";
export const DEACTIVATE_PASSWORD  = "DEACTIVATE_PASSWORD";
export const SET_PASSWORD_TYPE    = "SET_PASSWORD_TYPE";
export const RESET_PASSWORD_TYPE  = "RESET_PASSWORD_TYPE";
export const UPDATE_TIMELOCK      = "UPDATE_TIMELOCK";
export const REMOVE_TIMELOCK      = "REMOVE_TIMELOCK";
export const INCREASE_ATTEMPT_NUMBER = "INCREASE_ATTEMPT_NUMBER";
export const RESET_ATTEMPT_NUMBER = "RESET_ATTEMPT_NUMBER";
export const ACTIVATE_BIOMETRIC   = "ACTIVATE_BIOMETRIC";
export const DEACTIVATE_BIOMETRIC = "DEACTIVATE_BIOMETRIC";
=======

/*
export const ADD_INCOME_RECORD = 'ADD_INCOME_RECORD'
export const ADD_EXPENSE_RECORD = 'ADD_EXPENSE_RECORD'
export const ADD_CONSUME_RECORD = 'ADD_FITNESS_RECORD'
export const ADD_EXERCISE_RECORD = 'ADD_EXERCISE_RECORD'*/
>>>>>>> 01d6f49b748b730f527aa6a45aa061c6803b5012

export function createUser(name, initInfo){
  
  return { type: CREATE_USER, name, initInfo }
}

export function calculateInfo(info){
  return { type: CALCULATE_INFO, info}
}

export function createNewDaily(){
  return { type: CREATE_NEW_DAILY}
}

export function updateDailyRecord(){
  return { type: UPDATE_DAILY_RECORD }
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

export function activateActivity(id){
  return { type: ACTIVATE_ACTIVITY, id };
}

export function modifyActivityName(id, name){
  return { type: MODIFY_ACTIVITY_NAME, id, name };
}

export function modifyActivityTime(id, hour, min){
  return { type: MODIFY_ACTIVITY_TIME, id, hour, min };
}

export function modifyActivityRepeat(id, repeat){
  return { type: MODIFY_ACTIVITY_REPEAT, id, repeat };
}

export const actSubmitBudget = (budget) => {
  return{
      type: ActionType.SUBMIT,
      budget
  }
}
export const actDeleteBudget = (budget) => {
  return {
    type: ActionType.DELETE,
    budget
  };
};
export const actEditBudget = (budget)=> {
  return {
      type: ActionType.EDIT,
      budget
  }
}

//Exercise
export const actSubmitExercise = (exercise) => {
  return{
      type: ActionType.SUBMIT_E,
      exercise
  }
}
export const actDeleteExercise = (exercise) => {
  return {
    type: ActionType.DELETE_E,
    exercise
  };
};
export const actEditExercise = (exercise)=> {
  return {
      type: ActionType.EDIT_E,
      exercise
  }
}

//Meal
export const actSubmitMeal = (meal) => {
  return{
      type: ActionType.SUBMIT_M,
      meal
  }
}
export const actDeleteMeal = (meal) => {
  return {
    type: ActionType.DELETE_M,
    meal
  };
};
export const actEditMeal = (meal) => {
  return {
      type: ActionType.EDIT_M,
      meal
  }
}



export function addIncomeRecord(iRecord) {
  return { type: ADD_INCOME_RECORD, iRecord}
}

export function addExpenseRecord(eRecord) {
  return { type: ADD_EXPENSE_RECORD, eRecord}
}

export function addConsumeRecord(record) {
  return { type: ADD_CONSUME_RECORD, record}
}

export function addExerciseRecord(record) {
  return { type: ADD_EXERCISE_RECORD, record}
}

// Lock
export function activatePassword() {
  return {type: ACTIVATE_PASSWORD}
}
export function deactivatePassword() {
  return {type: DEACTIVATE_PASSWORD}
}
export function setPasswordType(passwordType) {
  return {type: SET_PASSWORD_TYPE, passwordType}
}
export function resetPasswordType() {
  return {type: RESET_PASSWORD_TYPE}
}
export function updateTimeLock() {
  return {type: UPDATE_TIMELOCK}
}
export function removeTimeLock() {
  return {type: REMOVE_TIMELOCK}
}
export function increaseAttemptNumber() {
  return {type: INCREASE_ATTEMPT_NUMBER}
}
export function resetAttemptNumber() {
  return {type: RESET_ATTEMPT_NUMBER}
}
export function activateBiometric() {
  return {type: ACTIVATE_BIOMETRIC}
}
export function deactivateBiometric() {
  return {type: DEACTIVATE_BIOMETRIC}
}