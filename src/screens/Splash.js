import React, {Component} from 'react';
import { View, StyleSheet, Platform, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { Container, Button, Text, Header, Body, Title } from 'native-base';
const splashBackground = require('../../assets/launchscreen-bg.jpg');
const splashLogo = require('../../assets/bootLogo.png');
import {connect} from "react-redux";
import Password from "../components/LockScreen/index";
import BiometricScreen from "./LockScreen/BiometricScreen"
import {Overlay} from "react-native-elements"

let deviceWidth = Dimensions.get('window').width

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
      biometricOverlayIsOn: false
    }
  }
  
  componentDidMount(){
    // Only show the splash screen for maximum 5s
    setTimeout(()=>{
      if (!this.state.biometricOverlayIsOn && !this.state.passwordOverlayIsOn){
        this.proceed();
      }
    }, 3000);
  }

  onEnterPasswordSuccess = () => {
    this.setState({passwordOverlayIsOn: false})
    this.props.navigation.navigate('Home');
  }

  onEnterPasswordFail = () => console.log("login fail")

  onBiometricFail = () => {
    this.setState({biometricOverlayIsOn: false})
    this.setState({passwordOverlayIsOn: true})
  }

  onBiometricSuccess = () => {
    this.setState({biometricOverlayIsOn: false})
    this.props.navigation.navigate('Home');
  }

  onCancel = () => {
    this.setState({biometricOverlayIsOn: false})
    this.setState({passwordOverlayIsOn: true})
  }

  proceed(){
    
    const {userInfo} = this.props;
    let registered = userInfo.Info.registered; 
    let isPasswordSet = this.props.lockState.isPasswordSet
    let isBiometricSet = this.props.lockState.isBiometricSet
    if(isBiometricSet){
      this.setState({biometricOverlayIsOn: true})
    }
    else if (registered === true && isPasswordSet) 
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
          onFailure = {this.onBiometricFail}
          onCancel = {this.onCancel}
          />}
        <Overlay
        isVisible = {this.state.passwordOverlayIsOn}
        fullScreen
        animationType = "slide"
        >
        {
          <Password 
            status = "enter" 
            onSuccess = {this.onEnterPasswordSuccess}
            onFailure = {this.onEnterPasswordFail}
            removePassword = {false}
            cancelButton = {false}
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
              marginBottom: 40,
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
              style={{ backgroundColor: "red", alignSelf: "center" }}
              onPress={() => this.proceed()}
            >
              <Text >Proceed</Text>
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
    marginBottom: 10
  },
  logo: {
    position: "absolute",
    left: (deviceWidth-175)/2,
    top: 125,
    width: 175,
    height: 175
  },
  text: {
    color: "black",//"#D8D8D8",
    fontSize: 17,
    fontWeight: 'bold',
    bottom: 6,
    marginTop: 5
  }
});