

import {View, StyleSheet, Platform, ToastAndroid, Alert} from 'react-native';
import React, { Component, useState } from "react";

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
  ActionSheet, 
  Form,
  Input,
  Label,
} from "native-base";
import { Overlay } from "react-native-elements";
import BiometricScreen from "./LockScreen/BiometricScreen";
import AsyncStorage from "@react-native-community/async-storage";
import {connect} from "react-redux"
import Password from "../components/LockScreen/index"
import {
  createUser,
  calculateInfo,
  saveCurrency,
  setPasswordType, 
  removeTimeLock,
  resetAttemptNumber,
  resetPasswordType,
  deactivatePassword, 
  activateBiometric, 
  deactivateBiometric
} from "../actions/index"
//const Item = Picker.Item;
import {CancelAllNotification} from "../components/PushController"
import {initializeReminders, removeReminders} from "../utils"


/* Presentational component for managing redirection to setting changes */


function mapStateToProps(state) {
  return {
    userInfo: state.user,
    lockState: state.lockState
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (name, initInfo) => dispatch(createUser(name, initInfo)),
  calculateInfo: (info) => dispatch(calculateInfo(info)),
  saveCurrency: (cur) => dispatch(saveCurrency(cur)),
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
      reminder: true,
      stage: 'main',  // main, setpin, editUser
      currency: this.props.userInfo.Currency,
      passwordOverlayIsOn: false,
      showMenu: false,
      biometricOverlayIsOn: false,
      isBiometricSet: false
    };
    this.passwordType = this.props.lockState.passwordType

  }
  
  componentDidMount() {
    this.setState({isBiometricSet: this.props.lockState.isBiometricSet})
  }
  /* toggle dark mode option switch */
  toggleMode(){
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

  /* toggle reminder option switch */
  toggleReminder(){
    if (this.state.reminder === true) removeReminders()
    else initializeReminders()

    this.setState({
      reminder: !this.state.reminder
    })
  }

  /* managing input state for currency */
  onCurrencyChoose(value){
    this.setState({
      currency: value,
    })
    cur = value
    this.props.saveCurrency(cur)
    //this.props.saveCurrency(value);
  }

  completeForm = (name, userInfo) => {
    this.setState({
      stage: 'main',
    })
    this.props.createUser(name, userInfo);
    this.props.calculateInfo(userInfo);
    ToastAndroid.show(
      "Personal Info edited",
      ToastAndroid.SHORT
    )
  }

  cancelNotification(){
    console.log("Removing notifications")
    CancelAllNotification()
    ToastAndroid.show(
      "All notifications removed",
      ToastAndroid.SHORT
    )
    if (this.state.reminder === true) {
      initializeReminders()
    }
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
    if(this.props.lockState.isBiometricSet){
      this.setState({isBiometricSet: false})
      this.props.deactivateBiometric()
    }
    this.setState({passwordOverlayIsOn: false})
    let toast = this.props.lockState.isBiometricSet?
          "Password and Biometric removed successfully": "Password removed successfully"
    ToastAndroid.show(
      toast ,
      ToastAndroid.SHORT
    )
  }
  onEnterPasswordFail = () => {
    this.setState({passwordOverlayIsOn: false})
    ToastAndroid.show(
      "Password remove unsuccessfully",
      ToastAndroid.SHORT
    )
    this.passwordType = this.props.lockState.passwordType
  }
  onPinCancelPress = () => {
    this.setState({passwordOverlayIsOn: false})
    ToastAndroid.show(
      "Password set unsuccessfully",
      ToastAndroid.SHORT
    )
    this.passwordType = this.props.lockState.passwordType
  }
  onHandleSetPassword = () => {
    const ans = this.hasSetPassword()
    this.passwordIsSet= ans
    this.renderPasswordScreen(ans)
  }
  renderPasswordScreen = (val) => {
    if (val === false ||
      val === true && this.passwordType === "none") {
      this.setState({passwordOverlayIsOn: true})
      }
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
      ("" + text),
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
    ToastAndroid.show(
      ("Biometric remove unsuccessfully: " + text),
      ToastAndroid.SHORT
    )
  }

  render() {
    const {passwordOverlayIsOn, passwordIsSet, showMenu} = this.state
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
                <Icon type = "MaterialIcons" name="arrow-drop-down" />
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
                <Item label="₫" value="₫" />
                <Item label="£" value = "£"/>
                <Item label="€" value = "€"/>
                <Item label="$" value = "$"/>
                <Item label="₪" value = "₪"/>
                <Item label="¥" value = "¥"/>
                <Item label="₹" value = "₹"/>
                
              </Picker>
            </Right>
          </ListItem>


          <Separator bordered style = {styles.separator}/>

            <ListItem style = {styles.row} icon 
            onPress = {() => this.setState({showMenu: !this.state.showMenu})} >
              <Left>
                <Button 
                style={{ backgroundColor: "#FD3C2D" }}
                onPress = {() => {
                  ToastAndroid.show(
                    ("Password Type: Pin, Pattern, Traditional Password"),
                    ToastAndroid.SHORT
                  )
                }}
                >
                  <Icon type = "FontAwesome5" active name="lock" />
                </Button>
              </Left>
              <Body>
                <Text>Set Password</Text>
              </Body>
              <Right>
                <Icon 
                type = "Entypo" name = {this.state.showMenu? "chevron-up":"chevron-down"}
                color = "black"/>
                
              </Right>
            </ListItem>
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.passwordType= "none"
              this.onHandleSetPassword()
            }}
            disabled = {this.passwordType === "none"}
            selected = {this.passwordType === "none"}>
              <Body>
                <Text>None</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.passwordType = "string"
              this.onHandleSetPassword()
            }} 
            disabled = {this.passwordType !== "none"}
            selected = {this.passwordType === "string"}>
              <Body>
                <Text>Password</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.passwordType= "pin"
              this.onHandleSetPassword()
            }}  
            disabled = {this.passwordType !== "none"}
            selected = {this.passwordType === "pin"}>
              <Body>
                <Text>Pin</Text>
              </Body>
            </ListItem>
            }
            {this.state.showMenu && 
            <ListItem 
            style = {styles.row} 
            onPress = {() => {
              this.passwordType="pattern"
              this.onHandleSetPassword()
            }} 
            disabled = {this.passwordType !== "none"}
            selected = {this.passwordType === "pattern"}>
              <Body>
                <Text>Pattern</Text>
              </Body>
            </ListItem>
            }

          {this.state.showMenu && 
          <Separator bordered style = {{height: 5}}/>
          } 
          <ListItem style = {styles.row} icon onPress = {this.onHandleSetBiometric} >
            <Left>
              <Button 
              style={{ backgroundColor: "black" }}
              onPress = {() => {
                ToastAndroid.show(
                  ("Biometric authentication can only be enable if password is set"),
                  ToastAndroid.SHORT
                )
              }}
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
              <Button style={{ backgroundColor: "blue" }} onPress = {() => this.setState({stage: 'editUser'})}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>Edit personal data</Text>
            </Body>
          </ListItem>


            <ListItem style = {styles.row} icon onPress = {() => this.cancelNotification()}>
              <Left>
                <Button style={{ backgroundColor: "brown" }} onPress = {() => this.cancelNotification()}>
                  <Icon active name="notifications-off" />
                </Button>
              </Left>
              <Body>
                <Text>Remove all notifications</Text>
              </Body>
            </ListItem>
            <Separator bordered style = {styles.separator}/>
            
          </Content>
          <Overlay
            isVisible = {this.state.stage === 'editUser'}
            fullScreen
            animationType = "slide"
          >
              <PersonalForm 
                userInfo = {this.props.userInfo} 
                completeForm = {this.completeForm}
              />
          </Overlay>

          <Overlay
              isVisible = {passwordOverlayIsOn}
              fullScreen
              animationType = "slide"
          >
                <View>
                {this.passwordIsSet && this.passwordType === "none" && 
                <Password
                status = {"enter"} 
                onSuccess = {this.onEnterPasswordSuccess}
                onFailure = {this.onEnterPasswordFail}
                removePassword = {true}
                cancelButton = {true}
                />}

                {!this.passwordIsSet && this.passwordType !== "none" &&
                <Password
                passwordType = {this.passwordType}
                status = {"choose"}
                onSuccess = {this.onSetPasswordSuccess}
                onFailure = {this.onPinCancelPress}
                cancelButton = {true}
                />
                }
               
              </View>
          </Overlay>
          {this.state.biometricOverlayIsOn && 
          <BiometricScreen 
          onSuccess = {this.state.isBiometricSet? 
            this.onAuthenticateBiometricSuccess: this.onSetBiometricSuccess}
          onFailure = {this.state.isBiometricSet? 
            this.onAuthenticateBiometricFail: this.onSetBiometricFail}
          />}
        </Container>
    
      );
    
  }
}

class PersonalForm extends Component {

  constructor(props){
    super(props);
    const {Info} = this.props.userInfo;
    this.state = {
      name: Info.name,
      age: Info.age.toString(),
      height: Info.height.toString(),
      weight: Info.weight.toString(),
      gender: Info.gender,
      money: Info.money,
    }
  }

  handlePress = () => {
    const {saveUserInfo} = this.props;
    const {name, age, height, weight, gender, money} = this.state;
    ageN = parseFloat(age); heightN = parseFloat(height); weightN = parseFloat(weight);
    moneyN = parseFloat(money)

    if (name === ''){
      Alert.alert(
        "Warning",
        "Your name should not be a blank string",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else {if (Number.isInteger(ageN) === false || ageN < 0 || isNaN(ageN)){
      Alert.alert(
        "Warning",
        "Please enter valid age as a positive integer",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else {if (!Number.isInteger(heightN)|| !Number.isInteger(weightN)
      || parseInt(heightN, 10) < 0 || parseInt(weightN, 10) < 0 || isNaN(heightN) || isNaN(weightN)){
      Alert.alert(
        "Warning",
        "Please enter valid height and weight as positive integer",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else {if (isNaN(moneyN) === true){
      Alert.alert(
        "Warning",
        "Account must be a number",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else {if (gender === ''){
      Alert.alert(
        "Warning",
        "Please select your gender",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }

    else{
      const userInfo = {
        age: parseInt(age, 10),
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        gender: gender,
        money: this.state.money,
      }
      this.props.completeForm(name, userInfo);
    }}}}}
  }
  
  onGenderChoose(value){
    this.setState({gender: value})
  }

  render(){
    const {Info} = this.props.userInfo;

    return(
      <View>
        <Text style = {styles.formHeaderText}>Personal data edition</Text>
        
        <Form>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input 
              defaultValue = {this.state.name}
              onChangeText = { (text) => this.setState({name: text})}
            />
          </Item>
          <Item stackedLabel>
            <Label>Age</Label>
            <Input 
              defaultValue = {this.state.age}
              onChangeText = { (text) => this.setState({age: text})}
              maxLength = {3}
            />
          </Item>
          <Item stackedLabel>
            <Label>Height</Label>
            <Input 
              defaultValue = {this.state.height}
              onChangeText = { (text) => this.setState({height: text})}
              maxLength = {4}
            />
          </Item>
          <Item stackedLabel>
            <Label>Weight</Label>
            <Input 
              defaultValue = {this.state.weight}
              onChangeText = { (text) => this.setState({weight: text})}
              maxLength = {4}
            />
          </Item>

          <Item picker >
            <Picker
              mode="dropdown" 
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{ paddingTop: 70, height: 60, }}
              placeholder={this.state.gender}
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.gender}
              onValueChange={this.onGenderChoose.bind(this)}
            >
              <Item label="Male" value="male" />
              <Item label="Female" value="female" />
            </Picker>
            </Item>
        </Form>
        <Button 
          block  
          style={{ margin: 15, marginTop: 50 }}
          onPress = {this.handlePress}  
        >
          <Text>COMPLETE</Text>
        </Button>
      </View>
             
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
  separator: {
    //backgroundColor: '#FFF',
  },
  formHeaderText:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);


