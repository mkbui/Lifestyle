import React, {Component} from 'react';
import { View, StyleSheet, Platform, ImageBackground, StatusBar } from 'react-native';
import { Container, Button, Text, Header, Body, Title } from 'native-base';
const splashBackground = require('../../assets/launchscreen-bg.png');
const splashLogo = require('../../assets/bootLogo.jpg');
import {connect} from "react-redux";
import Password from "./LockScreen/index";
import BiometricScreen from "./LockScreen/BiometricScreen"
//const { Dimensions, Platform } = require('react-native');
//const deviceHeight = Dimensions.get("window").height;
import { Overlay} from 'react-native-elements'


function mapStateToProps(state) {
  return {
    userInfo: state.user,
    lockState: state.lockState
  }
}

/* Splash Screen, turned on every app entrance, last for 5s maximum */
class SplashScreen extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      passwordOverlayIsOn: false,
      hasSetBiometric: false
    }
  }
  componentDidMount(){
    // Only show the splash screen for maximum 5s
    setTimeout(()=>{
      this.proceed();
    }, 5000);
  }

  onEnterPasswordSuccess = () => {
    this.setState({passwordOverlayIsOn: false})
    this.props.navigation.navigate('Home');
  }
  onEnterPasswordFail = () => console.log("login fail")

  onBiometricFail = () => {
    this.setState({biometricOverlayIsOn: false})
  }

  onBiometricSuccess = () => {
    this.setState({biometricOverlayIsOn: false})
    this.setState({passwordOverlayIsOn: false})
    this.props.navigation.navigate('Home');
    console.log("dafuhauidhf")
  }
  proceed(){
    const {userInfo} = this.props;
    let registered = userInfo.Info.registered; 
    let isPasswordSet = this.props.lockState.isPasswordSet
    let isBiometricSet = this.props.lockState.isBiometricSet
    if(isBiometricSet){
      this.setState({biometricOverlayIsOn: true})
    }
    if (registered === true && isPasswordSet) 
      {
        this.setState({passwordOverlayIsOn: true})
      }
    else if (registered === false) this.props.navigation.navigate('Firstform');
    else this.props.navigation.navigate('Home');
  }

  render(){
    return(
      <Container>
         {this.state.biometricOverlayIsOn && 
          <BiometricScreen 
          onSuccess = {this.onBiometricSuccess}
          onFailure = {this.onEnterPasswordFail}
          />}
        <Overlay
        isVisible = {this.state.passwordOverlayIsOn}
        fullScreen
        animationType = "slide">
        {
          <Password 
            status = "enter" 
            onSuccess = {this.onEnterPasswordSuccess}
            onFailure = {this.onEnterPasswordFail}
            removePassword = {false}
          />
        }
      </Overlay> 
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
              onPress={() => this.proceed()}
            >
              <Text>Proceed</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    )
  }
};

export default connect(mapStateToProps)(SplashScreen);

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