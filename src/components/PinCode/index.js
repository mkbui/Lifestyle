import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import PinCodeChoose from './PinCodeChoose';
import PinCodeEnter, {PinResultStatus} from './PinCodeEnter';
import {PinStatus} from './PinCode';
import LockPetition from './LockPetition';
import * as Keychain from 'react-native-keychain'

const pinKeychainName = "lifestyleAppKeychainName"


export class PINCode extends Component{
    constructor(props){
        super(props)
        numAttempts = 0;
        status = PinStatus.choose;
        this.state = { internalPinStatus: PinResultStatus.initial, pinLocked: false };
    }


    changeInternalStatus = (status) => {
        if(status === PinResultStatus.initial)
        {
            
        }
    }
    render(){
        return (
            <View>

                {this.props.status === PinStatus.choose &&
                <PinCodeChoose 
                pinCodeKeychainName = {pinKeychainName}
                />
                }
                {this.props.status === PinStatus.enter &&
                <PinCodeEnter
                    changeInternalStatus={this.changeInternalStatus}
                    finishProcess={this.props.finishProcess? this.props.finishProcess : () => {}}
                    status = {PinStatus.enter}
                    numberOfAttempts = {numAttempts}
                />
                }

                {  this.state.internalPinStatus === PinResultStatus.locked &&
                <LockPetition />
                }
            </View> 
        )
    }
}

export function removePinCode(name) {
    return await Keychain.resetInternetCredentials(name)  
}

export function resetPinCodeState(){
    
}