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

class PinCodeChoose extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: PinStatus.choose,
            inputValue: ''
        }
    }

    endChoose = (inputValue) => {
        this.setState({
            inputValue: inputValue,
            status: PinStatus.confirm
        })
    }
    endConfirm = async (input) => {
        const {pinCodeKeychainName} = this.props
        if (this.state.inputValue === input)
        {
            //Save to keychain
            await Keychain.setInternetCredentials(
                pinCodeKeychainName,
                pinCodeKeychainName,
                input)
            if (!!this.props.onSuccess) this.props.onSuccess(pinCode)
        }
        else {
            this.setState({ status: PinStatus.choose })
        }
    }

    render() {
        
        return(
            <View style = {styles.container}>
                {this.state.status === PinStatus.choose && 
                <PinCode
                    status = {PinStatus.choose}
                    mainTitle = 'Choose Your PIN'
                    subtitle = 'for additional security'
                    endProcess = {this.endChoose.bind()}
                />
                }
                {this.state.status === PinStatus.confirm && 
                <PinCode
                    status = {PinStatus.confirm}
                    mainTitle = 'Confirm Your PIN'
                    endProcess = {this.endConfirm.bind()}
                    mainTitleConfirmFailed = 'Incorrect Input'
                    errorSubtitle = 'Please try again'
                    previousPin={this.state.inputValue}
                />
                }
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

  export default PinCodeChoose;