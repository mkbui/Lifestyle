import * as Keychain from 'react-native-keychain'
import PinCode from './PinCode'
import PatternCode from './PatternCode'
import StringPassword from './StringPassword';
import {PasswordStatus, PasswordType, PasswordResultStatus} from './types';
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


const maxAttempt = 3

export default class PasswordEnter extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            status: PasswordStatus.choose,
            passwordResultStatus: PasswordResultStatus.initial,
        }
        this.keychainResult = ""
        Keychain.getInternetCredentials(
            this.props.passwordKeychainName
        ).then(
            (result) => {
               this.keyChainResult = result && result.password || undefined
              }
        ).catch((error) => {
            console.log('PasswordEnter: ', error)
        })

        this.endProcess = this.endProcess.bind(this)
   }

    endProcess = async (inputValue) => {
        this.setState({ passwordResultStatus: PasswordResultStatus.initial })
        this.props.changeInternalStatus(PasswordResultStatus.initial)
        const password = this.keyChainResult;
        if (password === inputValue)
        {
            this.setState({passwordResultStatus: PasswordResultStatus.success})
            this.props.changeInternalStatus(PasswordResultStatus.success)
            if (!!this.props.onSuccess()){
                this.props.onSuccess()
            }
            //remove number of attempt, lock time
            AsyncStorage.multiRemove([
                this.props.passwordAttemptAsyncStorageName,
                this.props.timeLockAsyncStorageName
            ])
        }
        else {
            const numAttemptStr = await AsyncStorage.getItem(this.props.passwordAttemptAsyncStorageName)
            let numberOfAttempts = numAttemptStr? parseInt(numAttemptStr): 0;
            numberOfAttempts++;
            if (numberOfAttempts >= maxAttempt)
            { 
                this.props.changeInternalStatus(PasswordResultStatus.locked)
                this.setState({passwordResultStatus: PasswordResultStatus.locked})
                //save lock time to use in lock petition
                await AsyncStorage.setItem(
                    this.props.timeLockAsyncStorageName,
                    new Date().toISOString()
                )
            }
            else {
                this.setState({passwordResultStatus: PasswordResultStatus.failure})
                this.props.changeInternalStatus(PasswordResultStatus.failure)
                //add number of attempt
                await AsyncStorage.setItem(
                    this.props.passwordAttemptAsyncStorageName,
                    numberOfAttempts.toString()
                )
                this.props.onFailure()
                
            }
        }
    }
    render() {
        const {passwordType} = this.props
        if(passwordType === PasswordType.none) return null

        else if (passwordType === PasswordType.pin){
            return(
                <PinCode
                    status = {PasswordStatus.enter}
                    mainTitle = 'Enter Your PIN'
                    subtitle = ''
                    endProcess = {this.endProcess}
                    mainTitleFailed = 'Please try again'
                    errorSubtitle = 'Your entries did not match'
                    previousPassword = {this.keyChainResult}
                    passwordResultStatus = {this.state.passwordResultStatus}
                />
            )
        }

        else if (passwordType === PasswordType.pattern){
            return(
                <View style = {{position:"absolute"}}>
                <PatternCode
                    status = {PasswordStatus.enter}
                    mainTitle = 'Enter Your Pattern'
                    subtitle = ''
                    endProcess = {this.endProcess}
                    mainTitleFailed = 'Please try again'
                    errorSubtitle = 'Your entries did not match'
                    previousPassword = {this.keyChainResult}
                    passwordResultStatus = {this.state.passwordResultStatus}
                />
                </View>
            )
        }

        else if (passwordType === PasswordType.string){
            return(
                <StringPassword
                    status = {PasswordStatus.enter}
                    mainTitle = 'Enter Your Password'
                    subtitle = ''
                    endProcess = {this.endProcess}
                    mainTitleFailed = 'Please try again'
                    errorSubtitle = 'Your entries did not match'
                    previousPassword = {this.keyChainResult}
                    passwordResultStatus = {this.state.passwordResultStatus}
                />
            )
        }
        
    }
    
}

const styles = StyleSheet.create({
    container: {
    }
  })