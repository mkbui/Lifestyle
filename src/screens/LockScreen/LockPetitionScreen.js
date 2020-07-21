import React, { Component } from "react";
import { View , Text, Button, Icon } from "native-base";
import {StyleSheet} from "react-native";
import { PasswordResultStatus } from "./types";
import { connect } from 'react-redux';
import {removeTimeLock, resetAttemptNumber} from "../../actions/index"
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function mapStateToProps(state) {
    return {lockState: state.lockState}
}

const mapDispatchToProps = dispatch => ({
    removeTimeLock: () => dispatch(removeTimeLock()),
    resetAttemptNumber: () => dispatch(resetAttemptNumber()),
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
    render() {
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
            </View>
        )
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