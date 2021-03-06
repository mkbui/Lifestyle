import React, { Component } from "react";
import { View , Text, Button, Icon } from "native-base";
import {StyleSheet} from "react-native";
import { PasswordResultStatus } from "./types";
import { connect } from 'react-redux';
import  SecurityQuestion  from "../../screens/LockScreen/SecurityQuestion";
import {setPasswordType,resetPasswordType, removeTimeLock, resetAttemptNumber, deactivatePassword, deactivateBiometric} from "../../actions"
import * as Keychain from 'react-native-keychain'
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function mapStateToProps(state) {
    return {lockState: state.lockState}
}

const mapDispatchToProps = dispatch => ({
    setPasswordType: (passwordType) => dispatch(setPasswordType(passwordType)),
    removeTimeLock: () => dispatch(removeTimeLock()),
    resetAttemptNumber: () => dispatch(resetAttemptNumber()),
    resetPasswordType: () => dispatch(resetPasswordType()),
    deactivatePassword: () => dispatch(deactivatePassword()),
    deactivateBiometric: () => dispatch(deactivateBiometric())
})
class LockPetitionScreen extends Component
{
    constructor(props)
    {
        super(props)
        this.timeEndLock = 0
        this.state = {
            timer: 0
        }
        this.updateTimer = this.updateTimer.bind(this)
    }
    componentDidMount(){
        this.timeEndLock = new Date(this.props.lockState.timeLock).getTime() + this.props.timeLock

        this.updateTimer()
    }
    updateTimer = async () =>
    {
        const timeLeft = new Date(this.timeEndLock) - new Date()
        if (timeLeft > 0)
            this.setState({timer: timeLeft})
        else
            this.setState({timer: 0})


        await sleep(1000)
        if (timeLeft < 1000)
        {
            //remove time start lock, number of attempt
            this.props.removeTimeLock()
            this.props.resetAttemptNumber()
            this.props.changeInternalStatus(PasswordResultStatus.initial)
        }
        else
        {
            this.updateTimer()
        }
    }
    renderSecurityQuestion = () => {
        this.setState({securityOverlay: true})
    }
    onSecurityQuestionSuccess = async () => {
        this.resetLockStatus()
        this.removePassword()
        
        if(this.props.lockState.isBiometricSet){
            this.props.deactivateBiometric()
        }
        this.props.changeInternalStatus(PasswordResultStatus.success)
        if (!!this.props.onSecurityPasswordSuccess()){
            this.props.onSecurityPasswordSuccess()
        }
        return await Keychain.resetInternetCredentials(this.props.passwordKeychainName)
    }
    removePassword(){
        this.props.deactivatePassword()
      }
    
    resetLockStatus(){
    //remove time lock, remove passwordAttempt, remove password type
    this.props.removeTimeLock();
    this.props.resetAttemptNumber();
    this.props.resetPasswordType();
    this.props.deactivatePassword()
    }
    onSecurityQuestionFailure = () => {
        this.setState({securityOverlay: false})
    }
    render() {
        if(this.state.securityOverlay){
            return(
                <View>
                    <SecurityQuestion 
                    onSuccess = {this.onSecurityQuestionSuccess}
                    onFailure = {this.onSecurityQuestionFailure}/>
                </View>
            )
        }
        else {
            const mins = Math.floor(this.state.timer / 60000) ;
            const sec = Math.floor((this.state.timer / 1000) % 60) ;

            return(
                <View style = {styles.container}>
                <Icon 
                        style = {{
                            color: 'red',
                            fontSize: 80
                        }} 
                        name = 'lock'
                        type = {"Entypo"}
                    />
                    <View style = {
                        styles.timerBox
                        }>
                        <Text>{`${mins < 10 ? "0" + mins : mins}:${
                                sec < 10 ? "0" + sec : sec
                                }`}
                        </Text>
                    </View>
                    <View
                    style = {{
                        marginTop: 50
                    }}>
                        <Text style = {{
                            justifyContent: 'center',
                            textAlign: "center",
                            fontSize: 20
                        }}>
                            This app is locked for {this.props.timeLock / 60000} minutes.</Text> 
                        <Text style = {{
                            justifyContent: 'center',
                            textAlign: "center",
                            fontSize: 15
                        }}>
                            Please try again later</Text>
                    </View>

                    <View style = {{marginTop: 30}}>
                        <Button 
                        transparent 
                        onPress = {this.renderSecurityQuestion}>
                            <Text style ={{textDecorationLine: "underline", color: "blue"}}>Forgot Password</Text>
                        </Button>
                    </View>
                    
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    timerBox: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "rgb(230, 231, 233)",
        marginTop: 100
    },
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(LockPetitionScreen);