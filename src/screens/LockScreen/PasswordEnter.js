import * as Keychain from 'react-native-keychain'
import PinCode from './PinCode'
import PatternCode from './PatternCode'
import StringPassword from './StringPassword';
import {PasswordStatus, PasswordType, PasswordResultStatus} from './types';
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
import { connect } from 'react-redux';
import { 
    activatePassword, 
    setPasswordType, 
    resetAttemptNumber, 
    resetPasswordType, 
    deactivatePassword, 
    updateTimeLock,
    increaseAttemptNumber,
    removeTimeLock 
} from "../../actions";

function mapStateToProps(state) {
    return {lockState: state.lockState}
}

const mapDispatchToProps = dispatch => ({
    activatePassword:() => dispatch(activatePassword()),
    setPasswordType: (passwordType) => dispatch(setPasswordType(passwordType)),
    removeTimeLock: () => dispatch(removeTimeLock()),
    resetAttemptNumber: () => dispatch(resetAttemptNumber()),
    resetPasswordType: () => dispatch(resetPasswordType()),
    deactivatePassword: () => dispatch(deactivatePassword()),
    updateTimeLock: () =>dispatch(updateTimeLock()),
    increaseAttemptNumber: () => dispatch(increaseAttemptNumber())
})

const maxAttempt = 3

class PasswordEnter extends Component {
    
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
        this.setState({ passwordResultStatus: PasswordResultStatus.initial }, async () =>{
            console.log(this.state.passwordResultStatus + " initial has been set")
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
                this.props.resetAttemptNumber()
                this.props.removeTimeLock()
                if(this.props.removePassword){
                    return await Keychain.resetInternetCredentials(this.props.passwordKeychainName)
                }
            }
            else {
                let numberOfAttempts =this.props.lockState.passwordAttempt
                numberOfAttempts++;
                if (numberOfAttempts >= maxAttempt)
                { 
                    this.props.changeInternalStatus(PasswordResultStatus.locked)
                    this.setState({passwordResultStatus: PasswordResultStatus.locked})
                    //save lock time to use in lock petition
                    this.props.updateTimeLock()
                }
                else {
                    
                    //add number of attempt
                    this.props.increaseAttemptNumber()
                    this.props.onFailure()
                    this.setState({passwordResultStatus: PasswordResultStatus.failure})
                    this.props.changeInternalStatus(PasswordResultStatus.failure)
                }
            }
        })
    }
    render() {
        console.log(this.state.passwordResultStatus + " hey")
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

  
export default connect(mapStateToProps, mapDispatchToProps)(PasswordEnter);