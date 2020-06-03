import React, {Component} from 'react';
import { View, StyleSheet, Platform, ImageBackground, StatusBar } from 'react-native';
import { Container, Button, Text, Header, Body, Title } from 'native-base';

const splashBackground = require('../assets/launchscreen-bg.png');
const splashLogo = require('../assets/bootLogo.jpg');

//const { Dimensions, Platform } = require('react-native');
//const deviceHeight = Dimensions.get("window").height;

export default class SplashScreen extends React.Component {
  render(){
    return(
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={splashBackground} style={{flex: 1}}>
          <View style={styles.logoContainer}>
            <ImageBackground source={splashLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 60,
              backgroundColor: "transparent"
            }}
          >
            <Text style={styles.text}>Monitor and improve your health today</Text>
            <View style={{ marginTop: 8 }} />
            <Text style={styles.text}>with Lifestyle Application!</Text>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "purple", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text>Proceed</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    )
  }
};



const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: 25,
    marginBottom: 20
  },
  logo: {
    position: "absolute",
    left: 135,
    top: 125,
    width: 150,
    height: 150
  },
  text: {
    color: "#D8D8D8",
    fontSize: 15,
    fontWeight: 'bold',
    bottom: 6,
    marginTop: 5
  }
});