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
            inputValue: '',
            pinCodeStatus: PinResultStatus.initial
        }
        keychainResult = '',
        Keychain.getInternetCredentials(
            "LifeStyleAppName",
        ).then(
            (result) => {
                keyChainResult = result && result.password || undefined
              }
        ).catch((error) => {
            console.log('PinCodeEnter: ', error)
        })
        numberOfAttempts = 0
   }

    endProcess = async (inputValue) => {
        this.setState({ pinCodeStatus: PinResultStatus.initial })
        this.props.changeInternalStatus(PinResultStatus.initial)
        const pinAttempts = this.props.numberOfAttempts;
        const pin = this.keyChainResult;
        if (pin === this.state.inputValue)
        {
            this.setState({pinCodeStatus: PinResultStatus.success})
            this.props.changeInternalStatus(PinResultStatus.success)
            if(!!this.props.finishProcess(inputValue))
                this.props.finishProcess(inputValue)
        }
        else{
            pinAttempts++;
            if (pinAttempts >= maxAttempt)
            {
                this.setState({})
                this.props.changeInternalStatus(PinResultStatus.locked)
            }
            else 
            {
                this.setState({pinCodeStatus: PinResultStatus.failure})
                this.props.changeInternalStatus(PinResultStatus.failure)
            }
        }
    }
    render() {
        const pin = this.props.keychainResult;
        <View style = {{}}>
            {this.state.status === PinStatus.choose && 
            <PinCode
                status = {PinStatus.enter}
                mainTitle = 'Enter Your PIN'
                subTitle = 'for confirmation'
                endProcess = {this.endProcess.bind()}
                mainTitleFailed = 'Please try again'
                mainTitleConfirmFail = 'Your entries did not match'
                previousPin = {pin}
            />
            }
        </View>
    }
}


export default PinCodeEnter;