import React, { Component } from "react";
import {StyleSheet, ToastAndroid} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Item,
  View,
  ActionSheet, 
  Form
} from "native-base";
import { Overlay } from "react-native-elements";
import BiometricScreen from "./LockScreen/BiometricScreen";
import AsyncStorage from "@react-native-community/async-storage";
import {connect} from "react-redux"
import Password from "./LockScreen/index"
import {
  setPasswordType, 
  removeTimeLock,
  resetAttemptNumber,
  resetPasswordType,
  deactivatePassword, 
  activateBiometric, 
  deactivateBiometric
} from "../actions/index"
//const Item = Picker.Item;

/* TO BE ADDED: a mapDispatchToProps and mapStateToProps to save settings to store */

/* Presentational component for managing redirection to setting changes */


function mapStateToProps(state) {
  return {lockState: state.lockState}
}

const mapDispatchToProps = dispatch => ({
  setPasswordType: (passwordType) => dispatch(setPasswordType(passwordType)),
  removeTimeLock: () => dispatch(removeTimeLock()),
  resetAttemptNumber: () => dispatch(resetAttemptNumber()),
  resetPasswordType: () => dispatch(resetPasswordType()),
  deactivatePassword: () => dispatch(deactivatePassword()),
  activateBiometric: () => dispatch(activateBiometric()),
  deactivateBiometric: () => dispatch(deactivateBiometric())
})


class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
      reminder: false,
      stage: 'main',  // main, setpin, editUser
      currency: "$",
      passwordOverlayIsOn: false,
      passwordIsSet: false,
      showMenu: false,
      passwordType: "none",
      biometricOverlayIsOn: false,
      isBiometricSet: false,
    };
  }
  
  componentDidMount(){
    const passwordType = this.props.lockState.passwordType
    const isBiometricSet = this.props.lockState.isBiometricSet
    this.setState({isBiometricSet, passwordType})

  }
  /* toggle dark mode option switch */
  toggleMode(){
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  /* toggle reminder option switch */
  toggleReminder(){
    this.setState({
      reminder: !this.state.reminder
    })
  }

  /* managing input state for currency */
  onCurrencyChoose(value){
    this.setState({
      currency: value,
    })
  }
  onSetPasswordSuccess = () => {
    this.setState({passwordOverlayIsOn: false})
    ToastAndroid.show(
      "Password set successfully",
      ToastAndroid.LONG
    )
  }
  onEnterPasswordSuccess = () => {
    this.resetLockStatus()
    this.removePassword()
    this.setState({passwordOverlayIsOn: false})
    ToastAndroid.show(
      "Password remove successfully",
      ToastAndroid.SHORT
    )
    if(this.props.lockState.isBiometricSet){
      this.setState({isBiometricSet: false})
      this.props.deactivateBiometric()
    }
  }
  onEnterPasswordFail = () => {
    this.setState({passwordOverlayIsOn: false})
    ToastAndroid.show(
      "Password remove unsuccessfully",
      ToastAndroid.SHORT
    )
  }
  onHandleSetPassword = async () => {
    const ans = this.hasSetPassword()
    this.setState({passwordIsSet: ans})
    this.renderPasswordScreen()
  }
  renderPasswordScreen = async () => {
    if (this.state.passwordIsSet === false ||
      this.state.passwordIsSet === true && this.state.passwordType === "none") 
      this.setState({passwordOverlayIsOn: true})
  }

  hasSetPassword = () => {
    return this.props.lockState.isPasswordSet
  }
  
  removePassword(){
    this.props.deactivatePassword()
  }

  resetLockStatus(){
    //remove time lock, remove passwordAttempt, remove password type
    this.props.removeTimeLock();
    this.props.resetAttemptNumber();
    this.props.resetPasswordType();
    this.props.deactivatePassword()
  }

  onHandleSetBiometric = () =>{
    if(this.hasSetPassword()){
      this.setState({biometricOverlayIsOn: true});
    }
    else{
      ToastAndroid.show(
        "User must set physical password",
        ToastAndroid.SHORT
      )
    }
  }

  onSetBiometricSuccess = () => {
    this.setState({biometricOverlayIsOn: false})
    ToastAndroid.show(
      "Biometric set successfully",
      ToastAndroid.SHORT
    )
    this.props.activateBiometric()
    this.setState({isBiometricSet: true})
  }
  onSetBiometricFail = (text) => {
    this.setState({biometricOverlayIsOn: false})
    
    ToastAndroid.show(
      ("Biometric set unsuccessfully:" + text),
      ToastAndroid.SHORT
    )
  }
  onAuthenticateBiometricSuccess = () => {
    this.setState({biometricOverlayIsOn: false})
    ToastAndroid.show(
      "Biometric remove successfully",
      ToastAndroid.SHORT
    )
    this.props.deactivateBiometric()
    this.setState({isBiometricSet: false})
  }
  onAuthenticateBiometricFail = (text) => {
    this.setState({biometricOverlayIsOn: false})
    
    console.log("hsdfgsdfgfsdgere")
    ToastAndroid.show(
      ("Biometric remove unsuccessfully" + text),
      ToastAndroid.SHORT
    )
  }
  render() {
    const {passwordOverlayIsOn, passwordIsSet, passwordType, isBiometricSet} = this.state
      return (
          <Container style={styles.container}>
          
          <Header>
            <Left style = {{flex: 1}}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body style = {{flex: 1}}>
              <Title style = {styles.headerText}>Settings</Title>
            </Body>
            <Right style = {{flex: 1}}>
              <Button 
                transparent 
                onPress={() => this.props.navigation.goBack()}>
                <Icon name = "arrow-back" />
              </Button>
            </Right>
          </Header>

          <Content>
          
            
            <Separator bordered noTopBorder style = {styles.separator} />

            <ListItem style = {styles.row} icon >
              <Left>
                <Button style={{ backgroundColor: "purple" }}>
                  <Icon active name="moon" />
                </Button>
              </Left>
              <Body>
                <Text>Dark Mode</Text>
              </Body>
              <Right>
                <Switch 
                  value={this.state.darkMode} 
                  trackColor="#50B948" 
                  onValueChange = {this.toggleMode.bind(this)}
                /> 
              </Right>
            </ListItem>

            <ListItem style = {styles.row} icon>
              <Left>
                <Button style={{ backgroundColor: "orange" }}>
                  <Icon active name="notifications" />
                </Button>
              </Left>
              <Body>
                <Text>Daily reminder notification</Text>
              </Body>
              <Right>
                <Radio
                  selected = {this.state.reminder}
                  onPress = {this.toggleReminder.bind(this)}
                />
              </Right>
            </ListItem>
            
            <ListItem style = {styles.row} icon last>
              <Left>
                <Button style={{ backgroundColor: "#4CDA64" }}>
                  <Icon name="arrow-dropdown" />
                </Button>
              </Left>
              <Body>
                <Text>Currency</Text>
              </Body>
              <Right>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 100 }}
                  selectedValue={this.state.currency}
                  onValueChange={this.onCurrencyChoose.bind(this)}
                >
                  <Item label="$" value="$" />
                  <Item label="VND" value="VND" />
                </Picker>
              </Right>
            </ListItem>


            <Separator bordered style = {styles.separator}/>


            <ListItem style = {styles.row} icon >
              <Left>
                <Button 
                style={{ backgroundColor: "#FD3C2D" }}
                >
                  <Icon active name="lock" />
                </Button>
              </Left>
              <Body>
                <Text>Set Password</Text>
              </Body>
              <Right>
                <Radio
                  selected = {this.state.showMenu}
                  onPress = {() => this.setState({showMenu: !this.state.showMenu})}
                />
                
              </Right>
            </ListItem>
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.setState({passwordType: "none"})
              this.onHandleSetPassword()
            }}
            selected = {passwordType === "none"}>
              <Body>
                <Text>None</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.setState({passwordType: "string"})
              this.onHandleSetPassword()
            }} 
            disabled = {passwordType !== "none"}
            selected = {passwordType === "string"}>
              <Body>
                <Text>Password</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.setState({passwordType: "pin"})
              this.onHandleSetPassword()
            }}  
            disabled = {passwordType !== "none"}
            selected = {passwordType === "pin"}>
              <Body>
                <Text>Pin</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.setState({passwordType: "pattern"})
              this.onHandleSetPassword()
            }} 
            disabled = {passwordType !== "none"}
            selected = {passwordType === "pattern"}>
              <Body>
                <Text>Pattern</Text>
              </Body>
            </ListItem>
            }

            {this.state.showMenu && 
            <Separator bordered style = {{height: 5}}/>
            } 
            <ListItem style = {styles.row} icon >
              <Left>
                <Button 
                style={{ backgroundColor: "black" }}
                >
                  <Icon active name="fingerprint" type = "Entypo"/>
                </Button>
              </Left>
              <Body>
                <Text>Use Biometric</Text>
              </Body>
              <Right>
                <Radio
                  selected = {this.state.isBiometricSet}
                  onPress = {this.onHandleSetBiometric}
                />
                
              </Right>
            </ListItem>
            <ListItem style = {styles.row} icon onPress = {() => this.setState({stage: 'editUser'})}>
              <Left>
                <Button style={{ backgroundColor: "blue" }}>
                  <Icon active name="person" />
                </Button>
              </Left>
              <Body>
                <Text>Edit personal data</Text>
              </Body>
            </ListItem>

            <Separator bordered style = {styles.separator}/>
            
          </Content>
          <Overlay
              isVisible = {passwordOverlayIsOn}
              fullScreen
              animationType = "slide"
          >
                <View>
                {passwordIsSet && passwordType === "none" && 
                <Password
                status = {"enter"} 
                onSuccess = {this.onEnterPasswordSuccess}
                onFailure = {this.onEnterPasswordFail}
                removePassword = {true}
                />}

                {!passwordIsSet && passwordType !== "none" &&
                <Password
                passwordType = {passwordType}
                status = {"choose"}
                onSuccess = {this.onSetPasswordSuccess}
                />
                }
               
              </View>
          </Overlay>
          {this.state.biometricOverlayIsOn && 
          <BiometricScreen 
          onSuccess = {isBiometricSet? 
            this.onAuthenticateBiometricSuccess: this.onSetBiometricSuccess}
          onFailure = {isBiometricSet? 
            this.onAuthenticateBiometricFail: this.onSetBiometricFail}
          />}
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
    marginBottom: 15
  },
  separator: {
    //backgroundColor: '#FFF',
  },
 
  row: {
  
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);


