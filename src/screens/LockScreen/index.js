import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import PasswordChoose from './PasswordChoose';
import PasswordEnter from './PasswordEnter';
import LockPetitionScreen from './LockPetitionScreen';
import * as Keychain from 'react-native-keychain';
import {PasswordType, PasswordResultStatus, PasswordStatus} from './types'
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

const passwordKeychainName = "lifestyleAppKeychainName"
const timeLockAsyncStorageName = "timeLockASName"
const passwordAttemptAsyncStorageName = "passwordAttemptASName"
const passwordTypeAsyncStorageName = "passwordTypeASName"


export default class Password extends Component{
    constructor(props){
        super(props);
        this.state = { 
            internalPasswordStatus: PasswordResultStatus.initial,
            isLocked: false,
            type: PasswordType.none
        };
        AsyncStorage.multiGet([
            timeLockAsyncStorageName,
            passwordTypeAsyncStorageName
        ]).then((key) => {
            this.setState({isLocked: (key[0][1] !== null) , type: key[1][1]})
        }).catch(err => console.log(err))

    }

    componentDidMount() {
        if (this.props.status === PasswordStatus.choose){
            const {passwordType} = this.props
            AsyncStorage.setItem(passwordTypeAsyncStorageName, passwordType);
            this.setState({type: passwordType})
        }
    }
    changeInternalStatus = (status) => {
        this.setState({internalPasswordStatus: status})
    }

    render(){
        const {status, passwordType} = this.props;
        const {internalPasswordStatus, isLocked, type} = this.state
        return (
            <View>
                {(status === PasswordStatus.choose) &&
                    <PasswordChoose
                        passwordType = {passwordType}
                        passwordKeychainName = {passwordKeychainName}
                        onSuccess = {this.props.onSuccess}
                    />
                }
                {status === PasswordStatus.enter &&
                (internalPasswordStatus !== PasswordResultStatus.locked) &&
                !isLocked &&
                    <PasswordEnter
                        passwordType = {type}
                        changeInternalStatus={this.changeInternalStatus}
                        status = {PasswordStatus.enter}
                        passwordKeychainName = {passwordKeychainName}
                        onSuccess = {this.props.onSuccess}
                        onFailure = {this.props.onFailure}
                        timeLockAsyncStorageName = {timeLockAsyncStorageName}
                        passwordAttemptAsyncStorageName = {passwordAttemptAsyncStorageName}
                    />
                }

                
                { ((internalPasswordStatus === PasswordResultStatus.locked) 
                || isLocked)
                    &&
                <LockPetitionScreen
                    timeLock = {300000}
                    changeInternalStatus={this.changeInternalStatus}
                    timeLockAsyncStorageName = {timeLockAsyncStorageName}
                    passwordAttemptAsyncStorageName = {passwordAttemptAsyncStorageName}
                />
                }
            </View>
        )
    }
}

export async function removePassword() {
    return await Keychain.resetInternetCredentials(passwordKeychainName)  
}

export async function hasSetPassword(){
    return await Keychain.getInternetCredentials(passwordKeychainName).then(res => {
        return !!res && !!res.password
      })
}


export async function resetLockStatus(){
    return AsyncStorage.multiRemove([
        timeLockAsyncStorageName,
        passwordAttemptAsyncStorageName,
        passwordTypeAsyncStorageName
    ])
}