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
import { Col, Row, Grid } from 'react-native-easy-grid';
import Animate from "react-move/Animate";
export const PinStatus = {
    choose: 'choose',
    enter: 'enter',
    locked: 'locked',
    confirm: 'confirm'
};

export class PinCode extends Component{
    constructor(props){
        super(props)
        mainTitle = 'Main Title',
        mainTitleFailed = 'Main Title Fail',
        mainTitleConfirmFailed = 'Main Confirm Fail',
        mainTitleValidationFailed = 'Main Title Validation Fail',
        subtitle = 'Subtitle',
        errorSubtitle = 'error subtitle',
        passwordLength = 4,
        pinCodeStatus = '',
        delayBetweenAttempts = 2000,
        previousPin = ''
        endProcess = this.endProcess.bind();
        this.state = {
            inputValue: '',
            inputLength: 0,
            status: PinStatus,
            failAttempt: false,
            showError: false,
            changeScreen: false,
            springValue: new Animated.Value(0.3)
        }


    }

    componentDidUpdate(prevProps){
        if (
          prevProps.pinCodeStatus !== "failure" &&
          this.props.pinCodeStatus === "failure"
        ) {
          this.failedAttempt();
        }
        if (
          prevProps.pinCodeStatus !== "locked" &&
          this.props.pinCodeStatus === "locked"
        ) {
          this.setState({ password: "" });
        }
    }

    handleNumberButtonPress = async (number) => {
        const addedInput = this.state.inputValue + number;
        this.setState({inputValue: addedInput});
        const newLength = this.state.inputValue.length + 1;
        this.setState({inputLength: newLength});


        if (this.state.inputValue.length === this.state.inputLength){
            switch (this.props.status) {
                case PinStatus.choose:
                    this.endProcess(inputValue);
                  break;
                case PinStatus.confirm:
                  if (inputValue !== this.props.previousPin) {
                    this.showError();
                  } else {
                    this.endProcess(inputValue);
                  }
                  break;
                case PinStatus.enter:
                  this.props.endProcess(inputValue);
                  await delay(300);
                  break;
            }
        }
    }
    
    endProcess = (pwd) => {
        setTimeout(() => {
        this.setState({ changeScreen: true });
        setTimeout(() => {
            this.props.endProcess(pwd);
        }, 500);
        }, 400);
    };

    renderNumberButton = (number) => {
        return(
            <Button 
            rounded 
            style = {{color: 'FFFF'}}
            large
            onPress = {
                () =>{
                    this.handleNumberButtonPress(number)
                }
            }
            >
            <Text>{number}</Text>
            </Button>
        );
    };

    renderDeleteButton = () => {
        return(
            <Button 
            rounded 
            style = {{color: 'FFFF'}}
            onPress = {
                () =>{
                    if(this.props.inputValue.length > 0)
                    {
                        const newValue = this.state.inputValue.slice(0,-1)
                        this.setState({inputValue: newValue});
                        const newLength = this.state.inputLength - 1;
                        this.setState({inputLength: newLength});
                    }
                }
            }
            >
            <Icon name = 'remove' />
            </Button>
        )
    };

    failedAttempt = async () => {
        await delay(300);
        this.setState({
          showError: true,
          failAttempt: true,
          changeScreen: false
        });
        this.doShake();
        await delay(this.props.delayBetweenAttempts);
        this.newAttempt();
    };
    
    newAttempt = async () => {
    this.setState({ changeScreen: true });
    await delay(200);
    this.setState({
        changeScreen: false,
        showError: false,
        failAttempt: false,
        inputValue: ''
    });
    };
    
    renderPassWordCircle = () => {
        return(
            /*<Animated.View
            style = {{
                marginLeft: this.state.springValue
            }}
            >
            {
                
            }
            </Animated.View>*/
            <View>
                <Text>Hi, I dont know how to do this</Text>
            </View>
        )
    };

    doShake = async () => {
        Animated.spring(
            this.springValue,
            {
                toValue: 1,
                friction: 1
            }
        ).start();
    };

    showError = (isErrorValidation = false) => {
        this.setState({ changeScreen: true });
        await delay(300);
        this.setState({ showError: true, changeScreen: false });
        this.doShake();
        await delay(3000);
        this.setState({ changeScreen: true });
        await delay(200);
        this.setState({ showError: false, password: "" });
        await delay(200);
        this.props.endProcess(this.state.password, isErrorValidation);
        if (isErrorValidation) this.setState({ changeScreen: false });
    };

    render() {
        const {failAttempt, showError} = this.state;
        return(
            <View>
                <Text> 
                {(failAttempt && this.props.mainTitleFailed) ||
                    (showError && this.props.mainTitleConfirmFailed) ||
                    (showError && this.props.mainTitleValidationFailed) ||
                    this.props.mainTitle
                }
                </Text>

                <Text>{(failAttempt || showError)?
                    this.props.errorSubtitle : this.props.subtitle}</Text>

                {this.renderPassWordCircle()}

                <View>
                    <Grid>
                        <Row
                        >
                            <Col>
                            {this.renderNumberButton(1)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(2)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(3)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderNumberButton(4)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(5)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(6)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderNumberButton(7)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(8)}
                            </Col>
                            <Col>
                            {this.renderNumberButton(9)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            {this.renderNumberButton(0)}
                            </Col>
                            <Col>
                            {this.renderDeleteButton()}
                            </Col>
                        </Row>
                    </Grid>
                </View>

            </View>
        );
    }
}
