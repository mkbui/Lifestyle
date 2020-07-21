import React, { Component } from "react";
import { View , Text, Button, Icon } from "native-base";
import {Platform, Image} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { PasswordResultStatus } from "./types";
import FingerprintScanner from 'react-native-fingerprint-scanner';

const fingerPicture = require("../../../assets/fingerprint.png")
const fingerPictureError = require("../../../assets/fingerprint_error.png")
export default class BiometricScreen extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            error: false,
            numFault: 3
        }
    }
    handleAttempt = (text) => {
        this.props.onFailure && this.props.onFailure(text)
    }
    componentDidMount(){
        if(this.biometricUnavailable()){
            this.props.onFailure && this.props.onFailure("FingerprintScannerNotAvailable")
        }
        else {
            FingerprintScanner
            .authenticate({
            title: "Fingerprint Scanner",
            subTitle: "insert registered finger on the sensor" ,
            cancelButton: "Cancel" })
           .then(() => {    this.props.onSuccess()    }, 
           reject => this.handleAttempt(reject))
            .catch(error => console.log(error))
        }


    }
    componentWillUnmount() {
        FingerprintScanner.release();
    }

    biometricUnavailable = () => {
        return Platform.Version < 23
    }

    render() {
        return null
    }
}

export const isBiometricAvailable = async () => {
    return await FingerprintScanner.isSensorAvailable()
    .then(biometric => { return !!biometric })
    .catch(error => { return false})
}
