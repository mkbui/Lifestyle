import * as Keychain from 'react-native-keychain'
import PinCode from './PinCode'
import StringPassword from './StringPassword'
import PatternCode from './PatternCode'
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

class PasswordChoose extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: PasswordStatus.choose,
            inputValue: ''
        }
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

            if (!!this.props.onSuccess())
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

    render() {
        const {passwordType} = this.props
        if(passwordType === PasswordType.none) return null
        if (passwordType === PasswordType.pin){
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

        if (passwordType === PasswordType.string){
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

        if (passwordType === PasswordType.pattern){
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
    }
}

const styles = StyleSheet.create({
  })

  export default PasswordChoose;