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
import { setPasswordType, resetAttemptNumber, resetPasswordType, deactivatePassword } from "../../actions";
import {connect} from "react-redux";

const passwordKeychainName = "lifestyleAppKeychainName"

function mapStateToProps(state) {
    return {lockState: state.lockState}
}

const mapDispatchToProps = dispatch => ({
    setPasswordType: (passwordType) => dispatch(setPasswordType(passwordType)),
    removeTimeLock: () => dispatch(removeTimeLock()),
    resetAttemptNumber: () => dispatch(resetAttemptNumber()),
    resetPasswordType: () => dispatch(resetPasswordType()),
    deactivatePassword: () => dispatch(deactivatePassword())
})

class Password extends Component{
    constructor(props){
        super(props);
        this.state = { 
            internalPasswordStatus: PasswordResultStatus.initial,
            isLocked: false,
            type: PasswordType.none,
            resetPassword: false
        };
    }

    componentDidMount() {
        
        if (this.props.status === PasswordStatus.choose){
            const type = this.props.passwordType
            this.setState({type: type})
        }
        else{
            //get time lock, get passwordType
            const isLocked = (this.props.lockState.timeLock !== "")
            const type = (this.props.lockState.passwordType)

            this.setState({isLocked, type})
        }
    }

    changeInternalStatus = (status) => {
        this.setState({internalPasswordStatus: status})
    }

    onSecurityPasswordSuccess = () => {
        this.setState({isLocked: false})
    }
    render(){
        const {status, passwordType} = this.props;
        const {internalPasswordStatus, isLocked, type, resetPassword} = this.state
        if (type === "none") return null
        return (
            <View>
                {((status === PasswordStatus.choose) || resetPassword) &&
                    <PasswordChoose
                        passwordType = {type}
                        passwordKeychainName = {passwordKeychainName}
                        onSuccess = {this.props.onSuccess}
                        cancelButton = {this.props.cancelButton && !resetPassword}
                        onFailure = {this.props.onFailure}
                        resetPassword = {resetPassword}
                    />
                }
                {status === PasswordStatus.enter && !resetPassword &&
                (internalPasswordStatus !== PasswordResultStatus.locked) &&
                !isLocked &&
                    <PasswordEnter
                        passwordType = {type}
                        changeInternalStatus={this.changeInternalStatus}
                        status = {PasswordStatus.enter}
                        passwordKeychainName = {passwordKeychainName}
                        onSuccess = {this.props.onSuccess}
                        cancelButton = {this.props.cancelButton}
                        onFailure = {this.props.onFailure}
                    />
                }

                
                { ((internalPasswordStatus === PasswordResultStatus.locked) 
                || isLocked)
                    &&
                <LockPetitionScreen
                    timeLock = {300000}
                    changeInternalStatus={this.changeInternalStatus}
                    passwordKeychainName = {passwordKeychainName}
                    onSecurityPasswordSuccess = {this.props.onSuccess}
                    onSecurityPasswordFailure = {this.props.onFailure}
                    
                />
                }
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);