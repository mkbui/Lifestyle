import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import PinCodeChoose from './PinCodeChoose';
import PinCodeEnter, {PinResultStatus} from './PinCodeEnter';
import {PinStatus} from './PinCode';
import LockPetitionScreen from './LockPetitionScreen';
import * as Keychain from 'react-native-keychain'
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
import { Overlay } from "react-native-elements";

const pinKeychainName = "lifestyleAppKeychainName"


export class PINCode extends Component{
    constructor(props){
        super(props);
        this.state = { internalPinStatus: PinResultStatus.initial, pinLocked: false };

        this.changeInternalStatus = this.changeInternalStatus.bind(this)
    }

    changeInternalStatus = (status) => {
        if (status === PinResultStatus.success)
        {
            if (!!this.props.onSuccess())
                this.props.onSuccess();
        }
        else if (status === PinResultStatus.failure)
        {

        }
        
        this.setState({internalPinStatus: status})
    }

    render(){
        const {status} = this.props;
        return (
            <Overlay 
            fullScreen
            isVisible
            >
                <View>
                    {(status === PinStatus.choose) &&
                        <PinCodeChoose 
                            pinCodeKeychainName = {pinKeychainName}
                        />
                    }
                    {status === PinStatus.enter &&
                        <PinCodeEnter
                            changeInternalStatus={this.changeInternalStatus}
                            finishProcess={this.props.finishProcess}
                            status = {PinStatus.enter}
                            pinCodeKeychainName = {pinKeychainName}
                        />
                    }

                    
                    { ( this.state.internalPinStatus === PinResultStatus.locked) 
                        &&
                    <LockPetitionScreen 
                        time={this.timeLock} 
                        changeInternalStatus={this.changeInternalStatus}
                        />
                    }
                </View> 
            </Overlay>
        )
    }
}

export async function removePinCode() {
    return await Keychain.resetInternetCredentials(pinKeychainName)  
}

export async function hasSetPinCode(){
    return await Keychain.getInternetCredentials(pinKeychainName).then(res => {
        return !!res && !!res.password
      })
}
