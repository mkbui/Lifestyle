import React, { Component } from "react";
import {StyleSheet, Animated,TextInput, ToastAndroid} from 'react-native';
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
import {PasswordStatus} from '../../components/LockScreen/types';
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default class StringPassword extends Component{
    constructor(props){
        super(props)
        this.passwordLength = 4,
        this.delayBetweenAttempts = 2000,
        this.endProcess = this.endProcess.bind();
        this.passwordcolorErr = "#FF0000" 
        this.passwordColor = "#000000"
        this.state = {
            inputValue: '',
            inputLength: 0,
            failAttempt: false,
            showError: false
        }
    }

    componentDidUpdate(prevProps){
        if (
          prevProps.passwordResultStatus !== "failure" &&
          this.props.passwordResultStatus === "failure"
        ) {
          this.failedAttempt();
        }
        if (
          prevProps.passwordResultStatus !== "locked" &&
          this.props.passwordResultStatus === "locked"
        ) {
          this.setState({ inputValue: "" });
        }
    }

    handleChangeText = async (text) => {
        this.setState({inputValue: text});
        const newLength = this.state.inputValue.length + 1;
        this.setState({inputLength: newLength});
    }

    checkPasswordRequirement = (password) =>
    {

        // one capital, on normal, one symbol or one number, NO SPACE
        let hasCapital  = (password.match(/[A-Z]/g) !== null)
        let hasNormal   = (password.match(/[a-z]/g) !== null)
        let hasSymbolOrNumber = (password.match(/\W/g) !== null || password.match(/[0-9]/g) !== null)
        let hasSpace    = (password.match(/\s/g) !== null)

        return [hasCapital,hasNormal,hasSymbolOrNumber,hasSpace]
    }

    handleSubmitEditing = async () => {
        const {status,previousPassword} = this.props
        const {inputValue} = this.state
        switch (status) {
            case PasswordStatus.choose:
                if(inputValue.length === 0){
                    ToastAndroid.show(
                        "Password must not be empty",
                        ToastAndroid.LONG
                    )
                    this.failedAttempt()
                }
                else{
                    const ans = this.checkPasswordRequirement(inputValue)
                    if (ans[0] && ans[1] && ans[2] && !ans[3]){
                        this.endProcess(inputValue);
                    }
                    else
                    {
                        let promptCapital = "Password must contain at least one capital letter"
                        let promptNormal = "Password must contain at least one normal letter"
                        let promptNoSpace = "Password must not contain space"
                        let promptSymbolNumber = "Password must contain one special symbol or number"
                        ToastAndroid.show(
                            (!ans[0] ? promptCapital: 
                                (!ans[1]? promptNormal: 
                                    (!ans[2] ? promptSymbolNumber:promptNoSpace
                                        ))),
                            ToastAndroid.LONG
                        )
                        this.failedAttempt()
                    }
                }
              break;
            case PasswordStatus.confirm:
              if (inputValue !== previousPassword) {
                this.showError();
              } else {
                this.endProcess(inputValue);
              }
              break;
            case PasswordStatus.enter:
              this.props.endProcess(inputValue);
              break;
        }
    }
    endProcess = async (inputValue) => {
        await sleep(200)
        this.props.endProcess(inputValue);
    };


    failedAttempt = async () => {
        await sleep(100)
        this.setState({
          showError: true,
          failAttempt: true,
          
        });
        await sleep(2000);
        this.newAttempt();
    };
    
    newAttempt = async () => {
    await sleep(1000)
        this.setState({
            showError: false,
            failAttempt: false,
            inputValue: '',
            inputLength: 0
        });
    await sleep(200);
    };


    renderPassword = () => {
        return(
            <View
            style = {{
                alignItems: "center",
                marginTop: 80,
            }}
            >
                <TextInput
                style = {{
                    height: 40, 
                    borderColor: 'gray', 
                    borderBottomWidth: 1,
                    width: 200,
                    fontSize: 15,
                    letterSpacing: 5
                }}
                autoFocus
                secureTextEntry = {true}
                contextMenuHidden
                textAlign = {"center"}
                editable = {!this.state.showError}
                onChangeText = { this.handleChangeText }
                clearButtonMode = {"always"}
                onSubmitEditing = { this.handleSubmitEditing }
                value = {this.state.inputValue}
            />
            </View>
        )
        
    };

    showError = async (isErrorValidation = false) => {
        await sleep(200);
        this.setState({ showError: true});
        await sleep(2000);
        this.setState({ showError: false, inputValue: "" });
        await sleep(500);
        this.props.endProcess(this.state.inputValue, isErrorValidation);
        
    };

    checkRequirement
    render() {
        const {failAttempt, showError} = this.state;
        const {mainTitle, mainTitleConfirmFailed,mainTitleValidationFailed, mainTitleFailed,
                subtitle, errorSubtitle} = this.props
        return(
            <View>
                <Text
                    style = {
                        {
                            fontSize: 25,
                            fontWeight: "200",
                            textAlign: "center",
                            marginTop: 80,
                            color: (showError)?  this.passwordcolorErr: this.passwordColor
                        }
                    }> 
                    {(failAttempt && mainTitleFailed) ||
                        (showError && mainTitleConfirmFailed) ||
                        (showError && mainTitleValidationFailed) ||
                        mainTitle
                    }
                </Text>

                <Text 
                    style = {{
                        fontSize: 15,
                        fontWeight: "200",
                        textAlign: "center",
                        marginTop: 10,
                        color: (showError)?  this.passwordcolorErr: this.passwordColor
                    }}>
                    {(failAttempt || showError)?
                errorSubtitle : subtitle}
                </Text>
                {this.renderPassword()}
            </View>                
        );
    }
}

StringPassword.defaultProps = {
    mainTitle: '',
    mainTitleFailed: '',
    mainTitleConfirmFailed: '',
    mainTitleValidationFailed: 'Incorrect Input',
    subtitle: '',
    errorSubtitle: ''
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
      }
})
