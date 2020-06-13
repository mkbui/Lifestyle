import React, {Component} from "react";
import {View, Text} from "react-native";
/* To be used to import settings for the whole app theme */
//import { StyleProvider } from "native-base";

import {createStore} from 'redux';
import appReducer from './src/reducers';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';

import AppNavigation from './src/components/AppNavigation';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

/* Declare store and persistor (saving data) for main dispatch appReducer */
const persistedReducer = persistReducer(persistConfig, appReducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store);

/* Main function contains Navigator defined in components */
export default class App extends React.Component {
  render() {
    return (
      <Provider store = {store}>
        <PersistGate loading = {null} persistor = {persistor}>
          <AppNavigation/>
        </PersistGate>
      </Provider>
    );
  }
}
