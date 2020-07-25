import * as Keychain from 'react-native-keychain'
import PinCode from '../../screens/LockScreen/PinCode'
import StringPassword from '../../screens/LockScreen/StringPassword'
import PatternCode from '../../screens/LockScreen/PatternCode'
import {PasswordStatus, PasswordType} from './types';
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
import { activatePassword, setPasswordType, resetAttemptNumber, resetPasswordType, deactivatePassword, updateTimelock } from "../../actions";
import {securityQnAAsyncStorageName as key} from "./types"
import AsyncStorage from "@react-native-community/async-storage";
import SecurityQuestion from "../../screens/LockScreen/SecurityQuestion"
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
    updateTimelock: () => dispatch(updateTimelock())
})

class PasswordChoose extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: PasswordStatus.choose,
            inputValue: ''
        }
        this.isSecurityQuestionSet =false
        AsyncStorage.getItem(key).then(res =>
            this.isSecurityQuestionSet = !!res)
    }

    endChoose = (inputValue) => {
        this.setState({
            inputValue: inputValue,
            status: PasswordStatus.confirm
        })
    }
    endConfirm = async (input) => {
        const {passwordKeychainName} = this.props
        if (this.state.inputValue === input)
        {
            //Save to keychain
            await Keychain.setInternetCredentials(
                passwordKeychainName,
                passwordKeychainName,
                input)
            // set hasSetPassword, setpasswordType
            this.props.activatePassword();
            this.props.setPasswordType(this.props.passwordType)

            if(!this.isSecurityQuestionSet){
                this.setState({secureQuestionOverlayIsOn: true})
            }
            else if (!!this.props.onSuccess())
            {
                this.props.onSuccess()
            }
        }
        else {
            this.setState({ 
                status: PasswordStatus.choose,
                inputValue: ""
            })
        }
    }
    handleSetSecurityQuestion = () => {
        if (!!this.props.onSuccess())
        {
            this.props.onSuccess()
        }
    }
    render() {
        const {passwordType} = this.props
        if(this.state.secureQuestionOverlayIsOn){
            return (
                <View>
                <SecurityQuestion
                onSuccess = {this.handleSetSecurityQuestion} />
                </View>
            )
        }
        else{
        if(passwordType === PasswordType.none) return null
        else if (passwordType === PasswordType.pin){
            return(
                <View>
                    {this.state.status === PasswordStatus.choose && 
                    <PinCode
                        status = {PasswordStatus.choose}
                        mainTitle = 'Choose Your PIN'
                        subtitle = 'for additional security'
                        endProcess = {this.endChoose}
                    />
                    }
                    {this.state.status === PasswordStatus.confirm && 
                    <PinCode
                        status = {PasswordStatus.confirm}
                        mainTitle = 'Confirm Your PIN'
                        endProcess = {this.endConfirm}
                        mainTitleConfirmFailed = 'Incorrect Input'
                        errorSubtitle = 'Please try again'
                        previousPassword={this.state.inputValue}
                    />
                    }
                </View>
            )
        }

        else if (passwordType === PasswordType.string){
            return(
                <View>

                    {this.state.status === PasswordStatus.choose && 
                    <StringPassword
                        status = {PasswordStatus.choose}
                        mainTitle = 'Choose Your Password'
                        subtitle = 'for additional security'
                        endProcess = {this.endChoose}
                    />
                    }
                    {this.state.status === PasswordStatus.confirm && 
                    <StringPassword
                        status = {PasswordStatus.confirm}
                        mainTitle = 'Confirm Your Password'
                        endProcess = {this.endConfirm}
                        mainTitleConfirmFailed = 'Incorrect Input'
                        errorSubtitle = 'Please try again'
                        previousPassword={this.state.inputValue}
                    />
                    }
                </View>
            )
        }

        else if (passwordType === PasswordType.pattern){
            return(
                <View style = {{
                    position:"absolute"
                    }}>
                    {this.state.status === PasswordStatus.choose && 
                    <PatternCode
                        status = {PasswordStatus.choose}
                        mainTitle = 'Choose Your Pattern'
                        subtitle = 'for additional security'
                        endProcess = {this.endChoose}
                    />
                    }
                    {this.state.status === PasswordStatus.confirm && 
                    <PatternCode
                        status = {PasswordStatus.confirm}
                        mainTitle = 'Confirm Your Pattern'
                        endProcess = {this.endConfirm}
                        mainTitleConfirmFailed = 'Incorrect Input'
                        errorSubtitle = 'Please try again'
                        previousPassword={this.state.inputValue}
                    /> 
                    }
                </View>
            )
        }
        else return null
    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChoose);