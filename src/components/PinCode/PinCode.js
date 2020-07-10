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
export const PinStatus = {
    choose: 'choose',
    enter: 'enter',
    locked: 'locked',
    confirm: 'confirm'
};


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default class PinCode extends Component{
    constructor(props){
        super(props)
        this.passwordLength = 4,
        this.pinCodeStatus = '',
        this.delayBetweenAttempts = 2000,
        this.previousPin = ''
        this.endProcess = this.endProcess.bind();
        this.emptyCircleDiameter = 4;
        this.fullCircleDiameter = 10;
        this.passwordcolorErr = "#FF0000" 
        this.passwordColor = "#000000"
        this.springValue = new Animated.Value(0.3)
        this.opacityValue = new Animated.Value(1)
        this.state = {
            inputValue: '',
            inputLength: 0,
            failAttempt: false,
            showError: false,
            changeScreen: true
        }

        this.endProcess = this.endProcess.bind(this)
        this.doChangeScreen = this.doChangeScreen.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if (
          prevProps.pinCodeStatus !== "failure" &&
          this.pinCodeStatus === "failure"
        ) {
          this.failedAttempt();
        }
        if (
          prevProps.pinCodeStatus !== "locked" &&
          this.pinCodeStatus === "locked"
        ) {
          this.setState({ password: "" });
        }
        if (prevState.changeScreen != this.state.changeScreen)
        {
            this.doChangeScreen()
        }
    }

    handleNumberButtonPress = async (number) => {
        const {status,previousPin} = this.props

        const addedInput = this.state.inputValue + number;
        this.setState({inputValue: addedInput});
        const newLength = this.state.inputValue.length + 1;
        this.setState({inputLength: newLength});


        if (newLength === this.passwordLength){
            switch (status) {
                case PinStatus.choose:
                    this.endProcess(this.state.inputValue);
                  break;
                case PinStatus.confirm:
                  if (this.state.inputValue !== previousPin) {
                    this.showError();
                  } else {
                    this.endProcess(this.state.inputValue);
                  }
                  break;
                case PinStatus.enter:
                  this.props.endProcess(this.state.inputValue);
                  await sleep(300);
                  break;
            }
        }
    }
    
    endProcess = async (inputValue) => {
        this.setState({ changeScreen: true });
        await sleep(200)
        this.props.endProcess(inputValue);
        /*
        setTimeout(() => {
        this.setState({ changeScreen: true });
        setTimeout(() => {
            this.props.endProcess(inputValue);
        }, 500);
        }, 400);*/
    };

    renderNumberButton = (number) => {
        const {showError} = this.state
        return(
            <Button 
            rounded 
            style = {styles.buttonCircle}
            large
            bordered
            disabled = {showError}
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
        const {showError} = this.state
        return(
            <Button 
            rounded 
            style = {{
                width: 16 * 4,
                height: 16 * 4,
                justifyContent: "center",
            }}
            transparent
            disabled = {showError}
            onPress = {
                () =>{
                    if(this.state.inputValue.length > 0)
                    {
                        const newValue = this.state.inputValue.slice(0,-1)
                        this.setState({inputValue: newValue});
                        const newLength = this.state.inputLength - 1;
                        this.setState({inputLength: newLength});
                    }
                }
            }
            >
            <Icon name = 'backspace' />
            </Button>
        )
    };

    failedAttempt = async () => {
        this.setState({
          showError: true,
          failAttempt: true,
          changeScreen: false
        });
        this.doShake();
        await sleep(200);
        this.newAttempt();
    };
    
    newAttempt = async () => {
    this.setState({ changeScreen: true });
    this.setState({
        changeScreen: true,
        showError: false,
        failAttempt: false,
        inputValue: ''
        
    });
    await sleep(200);
    };
    renderPassWordCircle = () => {
        const {showError} = this.state
        const firstCircle   = (this.state.inputLength  >= 1);
        const secondCircle  = (this.state.inputLength >= 2);
        const thirdCircle   = (this.state.inputLength >= 3); 
        const fourthCircle  = (this.state.inputLength >= 4);
        return(
            <Animated.View
            style = {{
                flexDirection: "row",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40,
                opacity: showError? 1: this.opacityValue,
                transform: [{translateX: this.springValue}]
                
            }}>
                <View
                    style = {{
                        marginRight: (
                            firstCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        marginLeft: (
                            firstCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        height: (
                            firstCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        width: (
                            firstCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        backgroundColor: (
                            (this.state.showError)?  "#e60000": "#000000"
                        ),
                        borderRadius: (
                            firstCircle
                            ? this.fullCircleDiameter/2 : this.emptyCircleDiameter/2
                        ),
                    }}
                />
                <View
                    style = {{
                        marginRight: (
                            secondCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        marginLeft: (
                            secondCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        height: (
                            secondCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        width: (
                            secondCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        backgroundColor: (
                            (this.state.showError)?  "#e60000": "#000000"
                        ),
                        borderRadius: (
                            secondCircle
                            ? this.fullCircleDiameter/2 : this.emptyCircleDiameter/2
                        ),
                    }}
                />
                <View
                    style = {{
                        marginRight: (
                            thirdCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        marginLeft: (
                            thirdCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        height: (
                            thirdCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        width: (
                            thirdCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        backgroundColor: (
                            (this.state.showError)?  "#e60000": "#000000"
                        ),
                        borderRadius: (
                            thirdCircle
                            ? this.fullCircleDiameter/2 : this.emptyCircleDiameter/2
                        ),
                    }}
                />
                <View
                    style = {{
                        marginRight: (
                            fourthCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        marginLeft: (
                            fourthCircle
                            ? 10 - (this.fullCircleDiameter - this.emptyCircleDiameter) / 2
                            : 10
                        ),
                        height: (
                            fourthCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        width: (
                            fourthCircle ? this.fullCircleDiameter : this.emptyCircleDiameter
                        ),
                        backgroundColor: (
                            (this.state.showError)?  "#e60000": "#000000"
                        ),
                        borderRadius: (
                            fourthCircle
                            ? this.fullCircleDiameter/2 : this.emptyCircleDiameter/2
                        ),
                    }}
                    
                />
            </Animated.View>
        )
        
    };

    doShake = async () => {
        Animated.sequence([
            Animated.timing(this.springValue, 
                { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 5, duration: 50, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -5, duration: 50, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 0, duration: 50, useNativeDriver: true })
          ]).start();
    };

    doChangeScreen = async () => {
        Animated.timing(this.opacityValue, { 
            toValue: (!this.state.changeScreen), 
            duration: 200, 
            useNativeDriver: true 
        }).start();
    }
    showError = async (isErrorValidation = false) => {
        this.setState({ changeScreen: true });
        await sleep(200);
        this.setState({ showError: true, changeScreen: false });
        this.doShake();
        await sleep(2000);
        this.setState({ showError: false, changeScreen: true, inputValue: "" });
        await sleep(500);
        this.props.endProcess(this.state.inputValue, isErrorValidation);
        if (isErrorValidation) {
            this.setState({ changeScreen: false });
        }
    };

    render() {
        const {failAttempt, showError} = this.state;
        const {mainTitle, mainTitleConfirmFailed,mainTitleValidationFailed, mainTitleFailed,
                subtitle, errorSubtitle} = this.props
        return(
            <View>
                    <Animated.Text
                        style = {
                            {
                                fontSize: 25,
                                fontWeight: "200",
                                textAlign: "center",
                                marginTop: 80,
                                opacity: showError? 1: this.opacityValue,
                                color: (showError)?  this.passwordcolorErr: this.passwordColor
                            }
                        }> 
                        {(failAttempt && mainTitleFailed) ||
                            (showError && mainTitleConfirmFailed) ||
                            (showError && mainTitleValidationFailed) ||
                            mainTitle
                        }
                    </Animated.Text>

                    <Animated.Text 
                        style = {{
                            fontSize: 15,
                            fontWeight: "200",
                            textAlign: "center",
                            marginTop: 10,
                            opacity: showError? 1: this.opacityValue,
                            color: (showError)?  this.passwordcolorErr: this.passwordColor
                        }}>
                        {(failAttempt || showError)?
                    errorSubtitle : subtitle}
                    </Animated.Text>

                    {this.renderPassWordCircle()}
                    <View>
                        <Grid>
                            <Row
                            style={styles.row}
                            >
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(1)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(2)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(3)}
                                </Col>
                            </Row>
                            <Row
                            style={styles.row}>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(4)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(5)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(6)}
                                </Col>
                            </Row>
                            <Row
                            style={styles.row}>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(7)}
                                </Col>
                                <Col 
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(8)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(9)}
                                </Col>
                            </Row>
                            <Row
                            style={styles.row}>
                                <Col
                                style = {styles.colButtonCircle}>
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderNumberButton(0)}
                                </Col>
                                <Col
                                style = {styles.colButtonCircle}>
                                {this.renderDeleteButton()}
                                </Col>
                            </Row>
                        </Grid>
                    </View>
            </View>                
        );
    }
}

PinCode.defaultProps = {
    mainTitle: '',
    mainTitleFailed: '',
    mainTitleConfirmFailed: '',
    mainTitleValidationFailed: '',
    subtitle: '',
    errorSubtitle: ''
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
      },
    grid: {
        justifyContent: 'flex-start',
        width: "100%",
        flex: 7
    },
    colButtonCircle: {
        flex: 0,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "center",
        width: 20 * 4,
        height: 20 * 4
    },
    row: {
        justifyContent: "center",
        flex: 0,
        flexShrink: 1,
        alignItems: "center",
        height: 20 * 5.5,
        marginTop:100
    },
    buttonCircle: {
        alignItems: "center",
        justifyContent: "center",
        width: 20 * 4,
        height: 20 * 4,
        backgroundColor: "rgb(242, 245, 251)",
        borderRadius: 20 * 2
    },
})
