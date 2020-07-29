
import React, { Component, useCallBack, useState, useRef } from "react";
import {StyleSheet, Image, Modal, SafeAreaView, Platform} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Fab,
  IconNB,
  View,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";
import { Overlay} from 'react-native-elements'
//import { ViewShot, captureRef, captureScreen } from "react-native-view-shot";

/*
captureRef(viewRef, {
  format: "jpg",
  quality: 0.8
}).then(
  uri => console.log("Image saved to", uri),
  error => console.error("Oops, snapshot failed", error)
);*/

import {connect} from "react-redux";
import {createNewDaily} from "../actions";

import {userAccess} from "../reducers/userReducer"

/* Image importing section */
const default_image = require("../../assets/default_image.png");
const default_background = require("../../assets/defaultBackground.jpg")
const splashLogo = require('../../assets/bootLogo.jpg');
const heart = require("../../assets/heart.png");
const finance = require("../../assets/finance.png");

import {backgrounds} from "../data/image";

/* Other services */
import {LocalNotification, ScheduledNotification} from "../components/PushController"
import {getDateString} from "../utils";
const today = getDateString();

/* Store data used: userInfo */
function mapStateToProps(state) {
  return{
    userInfo: state.user,
    budgetList: state.budgetReducer.budgetList,
    mealList: state.mealReducer.mealList,
  }
}

/* Store dispatcher used: createNewDaily for making a new daily record every day */
const  mapDispatchToProps = dispatch => {
  return {
    //createNewDaily: () => dispatch(createNewDaily())
  }
}


/* Presentational screen for default user view */
/*
class ExportScreen extends Component {

  constructor(){
    super();
    this.state={
      //initial image to the <Image>
      imageURI : 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png'
    }
  }

  componentDidMount = () => {
    id = Math.floor(Math.random()*10);
    this.setState({
      background: backgrounds[id]
    });

    
  }


  takeScreenShot = () => {
    console.log("Taking screenshot")
    //handler to take screnshot
    captureScreen({
      //either png or jpg or webm (Android). Defaults to png
      format: "jpg",
      //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
      quality: 0.8
    })
    .then(
      //callback function to get the result URL of the screnshot
      uri => {
        this.setState({ imageURI : uri });
        console.log(uri);
      },
      error => console.error("Oops, Something Went Wrong", error)
    );
  }
  

  render() {

    const {userInfo, budgetList, mealList} = this.props;
    const {DailyRecord, Info} = this.props.userInfo;
    var incomeTotal = 0, expenseTotal = 0, totalConsumed = 0;
    var money = Info.money

    return (
        <View style={styles.MainContainer}>
          <Text style={{fontSize:20}}>Click on Button Below to Take ScreenShot</Text>
          <Image 
              source={{uri : this.state.imageURI}} 
              style={{width: 200, height: 300, resizeMode: 'contain', marginTop: 5}} />
          <Button style = {{alignSelf: 'center'}} onPress={this.takeScreenShot()}>
            <Text>Take this</Text>
          </Button>
        </View>
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  mb: {
    color: 'peachpuff',
    marginBottom: 20,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  } 
});

//export default connect(mapStateToProps, mapDispatchToProps)(ExportScreen);
