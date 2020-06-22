import React, { Component } from "react";
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
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
  Card,
  CardItem,
} from "native-base";

import {Grid, Col, Row} from 'react-native-easy-grid';

const financeBg = require('../../assets/financeTracker.png');
const healthBg = require('../../assets/healthTracker.jpg');

class TrackerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style = {styles.headerText}>Trackers</Title>
          </Body>
          <Right style = {{flex: 1}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>
        
        <View style = {{flex: 1, flexDirection: 'column'}}>
          
          <ImageBackground style = {styles.bgImage} source={financeBg}>
            <Button 
              style = {styles.button} 
              onPress = {() => this.props.navigation.navigate('FinanceTracker')}
            >
              <Text style = {styles.titleText}>Finance</Text>
            </Button>
          </ImageBackground>
        

          <ImageBackground style = {styles.bgImage} source={healthBg}>
            <Button 
              style = {styles.button} 
              onPress = {() => this.props.navigation.navigate('HealthTracker')}
            >
              <Text style = {styles.titleText}>Health</Text>
            </Button>
          </ImageBackground>
          
        </View>
      </Container>
    );
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
    marginBottom: 50,
    width: 100,
    paddingLeft: 150,
  },
  rowItem1: {
    backgroundColor: 'orange',
  },
  rowItem2: {
    backgroundColor: 'yellow',
  },
  titleText: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  bgImage: {
    alignSelf: 'center', 
    resizeMode: 'cover',
    width: 500,
    flex: 1,
  },
  box: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignContent: 'space-around',
    alignSelf: 'center',
    textAlignVertical: 'center',
    width: 150,
  },
  button: {
    width: 160,
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 3,
  }
});

export default TrackerScreen;


