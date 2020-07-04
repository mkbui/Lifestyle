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

    endChoose = async (inputValue) => {
        this.setState({
            inputValue: inputValue,
            status: PinStatus.confirm
        })
    }
    endConfirm = async (inputValue) => {
        if (this.state.inputValue === inputValue)
        {
            //Save to keychain
            Keychain.setGenericCredentials(
                "LifeStyleAppName",
                inputValue
            )
        }
        else {
            this.setState({ status: PinStatus.choose })
        }
    }

    render() {
        <View style = {{}}>
            {this.state.status === PinStatus.choose && 
            <PinCode
                status = {PinStatus.choose}
                mainTitle = 'Choose Your PIN'
                subTitle = 'for additional security'
                endProcess = {this.endChoose.bind()}
                mainTitleFailed = 'Please try again'
            />
            }
            {this.state.status === PinStatus.confirm && 
            <PinCode
                status = {PinStatus.confirm}
                mainTitle = 'Confirm Your PIN'
                endProcess = {this.endConfirm.bind()}
                mainTitleFailed = 'Please try again'
                previousPin={this.state.inputValue}
            />
            }
        </View>
    }
}


export default PinCodeChoose;