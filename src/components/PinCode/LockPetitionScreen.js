import React, { Component } from "react";
import { View , Text, Button, Icon } from "native-base";
import {StyleSheet} from "react-native";

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export class LockPetitionScreen extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            timer: 0
        }
        this.updateTimer = this.updateTimer.bind(this)
    }
    componentDidMount(){
        const {time} = this.props
        this.setState({timer: (time)? time: 3000});
        this.updateTimer();
    }
    updateTimer = async () =>
    {
        await sleep(1000)
        if (this.state.timer === 0)
        {
            //unlock somehow
        }
        else
        {
            const updateTime = this.state.timer - 1;
            this.setState({timer: updateTime})
            this.updateTimer()
        }
    }
    render() {
        const mins = Math.floor(this.state.timer / 60) ;
        const sec = Math.floor(this.state.timer % 60) ;
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
                        This app is locked for {this.props.time / 60} minutes.</Text> 
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
        marginTop: 80
    }
})