import * as Keychain from 'react-native-keychain'
import PinCode, {PinStatus} from './PinCode'
import AsyncStorage from '@react-native-community/async-storage'
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

export default class PinCodeEnter extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            status: PinStatus.choose,
            pinCodeStatus: PinResultStatus.initial,
        }
        this.keychainResult = ""
        Keychain.getInternetCredentials(
            this.props.pinCodeKeychainName
        ).then(
            (result) => {
               this.keyChainResult = result && result.password || undefined
              }
        ).catch((error) => {
            console.log('PinCodeEnter: ', error)
        })
   }

    endProcess = async (inputValue) => {
        this.setState({ pinCodeStatus: PinResultStatus.initial })
        this.props.changeInternalStatus(PinResultStatus.initial)
        const pin = this.keyChainResult;
        if (pin === inputValue)
        {
            this.setState({pinCodeStatus: PinResultStatus.success})
            this.props.changeInternalStatus(PinResultStatus.success)
            if (!! this.props.onSuccess()){
                this.props.onSuccess()
            }
            //remove number of attempt, lock time
            AsyncStorage.multiRemove([
                this.props.pinAttemptAsyncStorageName,
                this.props.timeLockAsyncStorageName
            ])
        }
        else {
            const numAttemptStr = await AsyncStorage.getItem(this.props.pinAttemptAsyncStorageName)
            let numberOfAttempts = numAttemptStr? parseInt(numAttemptStr): 0;
            numberOfAttempts++;
            if (numberOfAttempts >= maxAttempt)
            { 
                this.props.changeInternalStatus(PinResultStatus.locked)
                this.setState({pinCodeStatus: PinResultStatus.locked})
                //save lock time to use in lock petition
                await AsyncStorage.setItem(
                    this.props.timeLockAsyncStorageName,
                    new Date().toISOString()
                )
            }
            else {
                this.setState({pinCodeStatus: PinResultStatus.failure})
                this.props.changeInternalStatus(PinResultStatus.failure)
                //add number of attempt
                await AsyncStorage.setItem(
                    this.props.pinAttemptAsyncStorageName,
                    numberOfAttempts.toString()
                )
                if (!!this.props.onFailure())
                {
                    this.props.onFailure()
                }
            }
        }
    }
    render() {
        return(
        <View styles = {styles.container}>
            <PinCode
                status = {PinStatus.enter}
                mainTitle = 'Enter Your PIN'
                subtitle = ''
                endProcess = {this.endProcess.bind()}
                mainTitleFailed = 'Please try again'
                errorSubtitle = 'Your entries did not match'
                previousPin = {this.keyChainResult}
                pinCodeStatus = {this.state.pinCodeStatus}
            />
            <Text>{this.state.numAtt}</Text>
        </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })