import * as Keychain from 'react-native-keychain'
import PinCode, {PinStatus} from './PinCode'

import React, { Component } from "react";
import {StyleSheet, Animated} from 'react-native';
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
  View,
} from "native-base";

export const PinResultStatus = {
    initial: 'initial',
    success: 'success',
    failure: 'failure',
    locked: 'locked'
}
const maxAttempt = 3

class PinCodeEnter extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            status: PinStatus.choose,
            pinCodeStatus: PinResultStatus.initial
        }
        this.pinCodeKeychainName = '',
        this.keychainResult = '',
        Keychain.getInternetCredentials(
            this.props.pinCodeKeychainName
        ).then(
            (result) => {
                keyChainResult = result && result.password || undefined
              }
        ).catch((error) => {
            console.log('PinCodeEnter: ', error)
        })
        this.numberOfAttempts = 0
   }

   componentDidUpdate(prevProps){
    }
    endProcess = async (inputValue) => {
        this.setState({ pinCodeStatus: PinResultStatus.initial })
        this.props.changeInternalStatus(PinResultStatus.initial)
        const pin = this.keyChainResult;
        if (pin === inputValue)
        {
            if (!!this.props.onSuccess())
            {
                this.props.onSuccess()
            }
            this.setState({pinCodeStatus: PinResultStatus.success})
            this.props.changeInternalStatus(PinResultStatus.success)
        }
        else{
            if (!!this.props.onFailure())
            {
                this.props.onFailure()
            }
            this.numberOfAttempts++;
            if (pinAttempts >= maxAttempt)
            { 
                this.props.changeInternalStatus(PinResultStatus.locked)
                this.setState({pinCodeStatus: PinResultStatus.locked})
            }
            else 
            {
                this.setState({pinCodeStatus: PinResultStatus.failure})
                this.props.changeInternalStatus(PinResultStatus.failure)
            }
        }
    }
    render() {
        const pin = this.keychainResult;
        return(<View styles = {styles.container}>
            <PinCode
                status = {PinStatus.enter}
                mainTitle = 'Enter Your PIN'
                subTitle = 'for confirmation'
                endProcess = {this.endProcess.bind()}
                mainTitleFailed = 'Please try again'
                mainTitleConfirmFail = 'Your entries did not match'
                previousPin = {pin}
                pinCodeStatus = {this.state.pinCodeStatus}
            />
        </View>)
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
export default PinCodeEnter;