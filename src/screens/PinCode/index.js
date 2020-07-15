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
import AsyncStorage from '@react-native-community/async-storage'

const pinKeychainName = "lifestyleAppKeychainName"
const timeLockAsyncStorageName = "timeLockASName"
const pinAttemptAsyncStorageName = "pinAttemptASName"


export default class PINCode extends Component{
    constructor(props){
        super(props);
        this.state = { 
            internalPinStatus: PinResultStatus.initial,
            isLocked: false
        };
        
        AsyncStorage.getItem(timeLockAsyncStorageName).then((key) => {
            this.setState({isLocked: !!key})
        }).catch(err => console.log(err))
    }

    changeInternalStatus = (status) => {
        this.setState({internalPinStatus: status})
    }

    render(){
        const {status} = this.props;
        const {internalPinStatus, isLocked} = this.state
        return (
            <View>
                {(status === PinStatus.choose) &&
                    <PinCodeChoose
                        pinCodeKeychainName = {pinKeychainName}
                        onSuccess = {this.props.onSuccess()}
                    />
                }
                {status === PinStatus.enter &&
                (internalPinStatus !== PinResultStatus.locked) &&
                    <PinCodeEnter
                        changeInternalStatus={this.changeInternalStatus.bind()}
                        status = {PinStatus.enter}
                        pinCodeKeychainName = {pinKeychainName}
                        onSuccess = {this.props.onSuccess()}
                        onFailure = {this.props.onFailure()}
                        timeLockAsyncStorageName = {timeLockAsyncStorageName}
                        pinAttemptAsyncStorageName = {pinAttemptAsyncStorageName}
                    />
                }

                
                { ((internalPinStatus === PinResultStatus.locked) 
                || isLocked)
                    &&
                <LockPetitionScreen
                    timeLock = {300000}
                    changeInternalStatus={this.changeInternalStatus.bind()}
                    timeLockAsyncStorageName = {timeLockAsyncStorageName}
                    pinAttemptAsyncStorageName = {pinAttemptAsyncStorageName}
                />
                }
            </View>
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


export async function resetLockStatus(){
    return AsyncStorage.multiRemove([
        timeLockAsyncStorageName,
        pinAttemptAsyncStorageName
    ])
}