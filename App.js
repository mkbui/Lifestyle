import React, {Component} from "react";
/* To be used to import settings for the whole app theme */
//import { StyleProvider } from "native-base";

import {Text, View} from "react-native";
import AppNavigation from './components/AppNavigation';


export default class App extends React.Component {
  render() {
    return (
      <AppNavigation />
      
      
    );
  }
}
