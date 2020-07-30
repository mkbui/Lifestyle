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
import {PasswordStatus} from '../../components/LockScreen/types';
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default class PinCode extends Component{
    constructor(props){
        super(props)
        this.passwordLength = 4,
        this.delayBetweenAttempts = 2000,
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
            showError: false
        }

        this.endProcess = this.endProcess.bind(this)
        this.failedAttempt = this.failedAttempt.bind(this)
        this.newAttempt = this.newAttempt.bind(this)
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

    handleNumberButtonPress = (number) => {
        const {status,previousPassword} = this.props

        const addedInput = this.state.inputValue + number;
        this.setState({inputValue: addedInput});
        const newLength = this.state.inputValue.length + 1;
        this.setState({inputLength: newLength});


        if (newLength === this.passwordLength){
            switch (status) {
                case PasswordStatus.choose:
                    this.endProcess(addedInput);
                  break;
                case PasswordStatus.confirm:
                  if (addedInput !== previousPassword) {
                    this.showError();
                  } else {
                    this.endProcess(addedInput);
                  }
                  break;
                case PasswordStatus.enter:
                  this.props.endProcess(addedInput);
                  break;
            }
        }
    }
    
    endProcess = async (inputValue) => {
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
        await sleep(100)
        this.setState({
          showError: true,
          failAttempt: true,
          
        });
        this.doShake();
        await sleep(1000);
        this.newAttempt();
    };
    
    newAttempt = async () => {
    await sleep(800)
        this.setState({
            showError: false,
            failAttempt: false,
            inputValue: '',
            inputLength: 0
        });
    await sleep(200);
    };
    renderPassWordCircle = () => {
        const {showError, inputLength} = this.state
        const firstCircle   = (inputLength  >= 1);
        const secondCircle  = (inputLength >= 2);
        const thirdCircle   = (inputLength >= 3); 
        const fourthCircle  = (inputLength >= 4);
        return(
            <Animated.View
            style = {{
                flexDirection: "row",
                height: "auto",
                justifyContent: "center",
                top: 120,
                flex: 2,
                alignItems: "center",
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
                { toValue: 10, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -10, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 8, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -8, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 6, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -6, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 3, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: -3, duration: 30, useNativeDriver: true }),
            Animated.timing(this.springValue, 
                { toValue: 0, duration: 30, useNativeDriver: true })
          ]).start();
    };

    showError = async (isErrorValidation = false) => {
        await sleep(200);
        this.setState({ showError: true});
        this.doShake();
        await sleep(2000);
        await this.props.endProcess(this.state.inputValue, isErrorValidation);
        this.setState({ showError: false, inputValue: "" });
    };

    render() {
        const {failAttempt, showError} = this.state;
        const {mainTitle, mainTitleConfirmFailed,mainTitleValidationFailed, mainTitleFailed,
                subtitle, errorSubtitle, previousPassword} = this.props

        return(
            <View>
                <Text
                    style = {
                        {
                            fontSize: 25,
                            fontWeight: "200",
                            textAlign: "center",
                            top: 80,
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
                        top: 90,
                        color: (showError)?  this.passwordcolorErr: this.passwordColor
                    }}>
                    {(failAttempt || showError)?
                errorSubtitle : subtitle}
                </Text>
                {this.renderPassWordCircle()}
                <View>
                    <Grid style = {styles.grid}>
                        <Row
                        style={styles.row }
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
                <View style = {{
                    position: "absolute",
                    top: 610, 
                    left: 150
                }}>
                {
                this.props.cancelButton &&
                <Button
                style = {{
                    width: 90,
                    height: 30,
                    justifyContent:"center"
                }}
                transparent
                onPress = {this.props.onCancelButtonPress}
                disabled = {this.state.failAttempt || this.state.showError}
                >
                    <Text style = {{textDecorationLine:"underline"}}>{(this.props.status === PasswordStatus.choose ||
                    this.props.status === PasswordStatus.enter)? "cancel":"back"}</Text>
                </Button>
                }
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    colButtonCircle: {
        flex: 0,
        marginLeft: 10,
        marginRight: 10,
        width: 20 * 4,
        height: 20 * 4
    },
    row: {
        height: 20 * 5,
        top: 160
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
