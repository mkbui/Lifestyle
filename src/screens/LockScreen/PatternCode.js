import React, { Component } from "react";
import {StyleSheet, Animated, Dimensions, PanResponder, ToastAndroid} from 'react-native';
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
import {PasswordStatus} from './types';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const Radius = WIDTH / 10

class Point extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const {x,y, isActive} = this.props
                
        return (
            <View
            style = {
            {
                backgroundColor: "#FFFFFF",
                position: "absolute",
                borderColor: "#000000",
                borderWidth: 0,
                left: x - Radius,
                top: y - Radius,
                width: Radius * 2,
                height: Radius * 2,
                borderRadius: Radius,
                alignItems: "center",
                justifyContent: "center"

            }
            } >
                <View 
                style = {
                    isActive? 
                    {
                        backgroundColor:"black",
                        width: Radius / 2,
                        height: Radius / 2,
                        borderRadius: Radius / 4
                    }:
                    {
                        backgroundColor:"black",
                        width: Radius / 3,
                        height: Radius / 3,
                        borderRadius: Radius / 6
                    }
                }
                />

            </View>
        )
    }
}
class Line extends Component {
    constructor(props){
        super(props)
        this.state = {
            start: this.props.start,
            end: this.props.end
        }
    }
    setNativeProps(props) {
        this.setState(props);
    } 
    getDistance = (pt1, pt2) => {
        let a = Math.pow(pt1.x - pt2.x, 2);
        let b = Math.pow(pt1.y - pt2.y, 2);
        let d = Math.sqrt(a + b);
      
        return d;
    }

    getTransform = (pt1, pt2) => {
        let d = this.getDistance(pt1, pt2);
      
        let c = (pt2.x - pt1.x) / d;
        let a = Math.acos(c);
        if (pt1.y > pt2.y) a = 2 * Math.PI - a;
      
        let c1 = {
          x: pt1.x + d / 2,
          y: pt1.y
        };
        let c2 = {
          x: (pt2.x + pt1.x) / 2,
          y: (pt2.y + pt1.y) / 2
        };
        let x = c2.x - c1.x;
        let y = c2.y - c1.y;
      
        return { d, a, x, y };
      }
    render() {
        const {start, end} = this.state

        if (start.x === end.x && start.y === end.y) return null;
        
        const ans = this.getTransform(start, end);
        const length = ans.d 
        const angle = ans.a + "rad"
        const x = ans.x
        const y = ans.y
        return(
            <View
                style = {{
                        position: 'absolute',
                        height: 3,
                        width: length,
                        backgroundColor: "#000000",
                        left: start.x,
                        top: start.y,
                        transform: [
                            {translateX: x},
                            {translateY: y},
                            {rotateZ: angle}
                        ]
                }}
            />
        )
    }
}
Line.defaultProps = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
}
export default class PatternCode extends Component{
    constructor(props){
        super(props)
        this.delayBetweenAttempts = 2000,
        this.endProcess = this.endProcess.bind();
        this.passwordcolorErr = "#FF0000" 
        this.passwordColor = "#000000"
        this.startAnimation = false
        this.lastIndex = -1
        this.inputValue = ""
        let dots = []
        for (let i = 0; i < 9; ++i)
        {
            dots.push({
                isActive: false,
                x: Math.floor(i % 3) * (Radius * 3) + 2 * Radius,
                y: Math.floor(i / 3) * (Radius * 3) + 2 * Radius
                
            })
        }
        
        this.state = {
            inputValue: "",
            inputLength: 0,
            failAttempt: false,
            showError: false,
            dots: dots,
            lines: [],

        }

        this.endProcess = this.endProcess.bind(this)
        this.failedAttempt = this.failedAttempt.bind(this)
        this.newAttempt = this.newAttempt.bind(this)
        this.isInCircle = this.isInCircle.bind(this)
        this.getTouchChar = this.getTouchChar.bind(this)
        this.getDistance = this.getDistance.bind(this)
        this.getCrossChar = this.getCrossChar.bind(this)
    }

    getDistance = (pt1, pt2) => {
        let a = Math.pow(pt1.x - pt2.x, 2);
        let b = Math.pow(pt1.y - pt2.y, 2);
        let d = Math.sqrt(a + b);
      
        return d;
    }
    setActive(idx) {
        const dots = [...this.state.dots];
        dots[idx].isActive = true;
        this.setState({dots})
    }
    resetActive() {
        let resetDots = [...this.state.dots]
        for(let i = 0 ; i < 9; ++i){
            resetDots[i].isActive = false
        }
        this.setState({dots: resetDots})
    }

    isInCircle = (point, center, radius) => {
        let d = this.getDistance(point, center);
        return d <= radius;
    }
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,


        onPanResponderGrant: (event, gestureState) => {
            let x = event.nativeEvent.pageX;
            let y = event.nativeEvent.pageY - ((HEIGHT - WIDTH) / 2.0);

            let startPoint = this.getTouchChar({x,y});
            if(!!startPoint) {
                this.startAnimation = true;
                this.lastIndex = parseInt(startPoint);
                this.inputValue += startPoint
                this.resetActive()
                this.setActive(this.lastIndex)

                let pt = {
                    x: this.state.dots[this.lastIndex].x,
                    y: this.state.dots[this.lastIndex].y
                }

                this.refs.line.setNativeProps({start:pt, end: pt})
            }
        },
        onPanResponderMove: (event, gestureState) => {
            let x = event.nativeEvent.pageX;
            let y = event.nativeEvent.pageY - ((HEIGHT - WIDTH) / 2.0);

            if(this.startAnimation){
                this.refs.line.setNativeProps({end: {x,y}})
                let nextChar = null

                if (!this.isInCircle({x,y},this.state.dots[this.lastIndex], Radius / 3))
                {
                    nextChar = this.getTouchChar({x,y})

                }

                if (nextChar && this.inputValue.indexOf(nextChar) === -1)
                {
                    let crossedChar = this.getCrossChar(nextChar);
                    if (crossedChar && this.inputValue.indexOf(crossedChar) === -1)
                    {
                        this.setActive(parseInt(crossedChar));
                        this.inputValue += crossedChar
                    }
                    
                    let lines = [... this.state.lines]
                    lines.push({
                        start: {
                            x: this.state.dots[this.lastIndex].x,
                            y: this.state.dots[this.lastIndex].y
                        },
                        end: {
                            x: this.state.dots[parseInt(nextChar)].x,
                            y: this.state.dots[parseInt(nextChar)].y
                        }
                    })
                    this.setState({lines})


                    this.lastIndex = parseInt(nextChar);
                    this.inputValue += nextChar
                    this.setActive(this.lastIndex)

                    
                    let startPoint = {
                        x: this.state.dots[this.lastIndex].x,
                        y: this.state.dots[this.lastIndex].y
                    }
                    this.refs.line.setNativeProps({start:startPoint})
                }
            }            
        },
        onPanResponderRelease: (event, gestureState) => {
            if(this.startAnimation)
            {
                this.setState({inputValue: this.inputValue })
                this.startAnimation = false;

                let origin = { x: 0, y: 0 };
                this.refs.line.setNativeProps({start: origin, end: origin})
                this.handleEnd(this.inputValue)
                this.resetActive()
                const lines = []
                this.setState({lines: lines})
                this.inputValue = ""
            }
        }
    })
    getTouchChar = (point) =>
    {
        for (let i = 0; i < 9 ; ++i)
        {
           if (this.isInCircle(point, this.state.dots[i], Radius / 3))
            {
                return String(i)
            }
            
        }
        return false;
    }
    getCrossChar = (point) =>
    {
        let middle = "13457"

        if (middle.indexOf(point) !== -1 || middle.indexOf(this.lastIndex) !== -1) return false 
        let pt = {
            x: ( this.state.dots[parseInt(point)].x + this.state.dots[this.lastIndex].x) / 2,
            y: ( this.state.dots[parseInt(point)].y + this.state.dots[this.lastIndex].y) / 2
        }
        for (let i = 0 ; i < middle.length ; ++i)
        {
            if (pt.x === this.state.dots[middle[i]].x && pt.y === this.state.dots[middle[i]].y){
                return String(middle[i]);
            }
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState){
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

    handleEnd = async (inputValue) => {
        const {status,previousPassword} = this.props
        if (status === PasswordStatus.choose && inputValue.length < 4){
            this.failedAttempt()
            ToastAndroid.show(
                "Please choose 4 or more node",
                ToastAndroid.LONG
            )
        }
        else{
            
            switch (status) {
                case PasswordStatus.choose:
                    this.endProcess(inputValue);
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

    showError = async (isErrorValidation = false) => {
        await sleep(200);
        this.setState({ showError: true});
        await sleep(2000);
        this.setState({ showError: false, inputValue: "" });
        await sleep(500);
        this.props.endProcess(this.state.inputValue, isErrorValidation);
    };

    render() {
        const {failAttempt, showError} = this.state;
        const {mainTitle, mainTitleConfirmFailed,mainTitleValidationFailed, mainTitleFailed,
                subtitle, errorSubtitle} = this.props
       return(
        <View style = {{
        flex: 1,
        position: "absolute",
        right: 10
        }}
        >
            <Text
                style = {
                    {
                        position: 'absolute',
                        fontSize: 25,
                        fontWeight: "200",
                        textAlign: "center",
                        left: 0,
                        top: 80,
                        width: WIDTH,
                        height: ((HEIGHT - WIDTH) / 2.0) * 1.25 / 3,
                        alignItems: "center",
                        justifyContent: "center",
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
                    position: 'absolute',
                    fontSize: 15,
                    fontWeight: "200",
                    textAlign: "center",
                    top: 115,
                    left: 0,
                    width: WIDTH,
                    height: ((HEIGHT - WIDTH) / 2.0) * 1.25 / 3,
                    alignItems: "center",
                    justifyContent: "center",
                    color: (showError)?  this.passwordcolorErr: this.passwordColor
                }}>
                {(failAttempt || showError)?
            errorSubtitle : subtitle}
            </Text>
            <View style = {{
                position: 'absolute',
                width: WIDTH,
                height: HEIGHT,
                top: ((HEIGHT - WIDTH) / 2.0) * 1.25 / 1.25,
                left: 0
            }}
            {...this.panResponder.panHandlers}>
                {
                    this.state.dots.map((c, k) => {
                        return(
                            <Point
                            key = {k}
                            x = {c.x}
                            y = {c.y}
                            isActive = {c.isActive}
                            />
                        )
                    })
                }
                {
                    this.state.lines.map((l, k) => {
                        return(
                            <Line 
                            key = {k}
                            start = {l.start} 
                            end = {l.end}
                            />
                        )
                })
                }
                <Line ref="line"/>
            </View>
        </View>
       )
    }
}

PatternCode.defaultProps = {
    mainTitle: '',
    mainTitleFailed: '',
    mainTitleConfirmFailed: '',
    mainTitleValidationFailed: '',
    subtitle: '',
    errorSubtitle: ''
}

const styles = StyleSheet.create({
})
