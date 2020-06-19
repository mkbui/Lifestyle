import React, { Component } from "react";
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  ListItem,
  CheckBox,
  Card,
  CardItem,

} from "native-base";

import * as Progress from 'react-native-progress';

import {connect} from 'react-redux';
import PreForm from '../components/AdviceScreens/PreForm';
import AdviceAnalysis from '../components/AdviceScreens/AdviceAnalysis'

const analysisBackground = require('../../assets/analysis.png');
const default_image = require('../../assets/default_image.png')

function mapStateToProps(){
  return {
    userInfo: state.user,
    foodList: state.foodList, 
    exerciseList: state.exerciseList,
  }
}

const screens = [
  {
    route: "PreForm",
    name: "PreForm",
  },
  {
    route: "AdviceAnalysis",
    name: "AdviceAnalysis",
  },
  {
    route: "WarningPresent",
    name: "WarningPresent",
  },
];



class AdviceScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      stage: 0,
    }
  }

  proceed(screenName){
    //this.setState({stage: this.state.stage + 1});
    //this.props.navigation.navigate("AdviceAnalysis")
    //this.props.navigation.navigate("Home")
  }

  render(){
    const {stage} = this.state;
    return (
        <PreForm navigation = {this.props.navigation}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  secondaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'indigo',
    fontFamily: 'Roboto',
  },
  choosingText: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 15,
  },
  proceedButton: {
    alignSelf: 'center',
    color: 'blue',
    marginTop: 20,
  },
  reviewBox: {
    backgroundColor: 'orange',
    marginBottom: 25,
  },
  script: {
    fontSize: 18,
  }, 
  progressBar: {
    paddingLeft: 15,
  }
});

export default AdviceScreen;


