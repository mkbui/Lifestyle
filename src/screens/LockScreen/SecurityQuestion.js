import {question as questionList} from "../../data/question"
import React, { Component } from "react";
import { View , Text, Button, Icon, ListItem, Left, Right, Picker, Item } from "native-base";
import {StyleSheet} from "react-native";
import { PasswordResultStatus, securityQnAAsyncStorageName } from "../../components/LockScreen/types";
import AsyncStorage from "@react-native-community/async-storage";

export default class SecurityQuestion extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ans1: "",
            ans2: "",
            QnA_List: []
        }
        this.isQnASet = false
        AsyncStorage.getItem(securityQnAAsyncStorageName).then(str =>
            {
                this.isQnASet = !!str
                if (this.isQnASet === false){
                    let qIdx_1 = Math.floor(Math.random() * 3)
                    let qIdx_2 = Math.floor(Math.random() * 3 + 4)
                    
                    let list = this.state.QnA_List;
                    
                    list.push({
                        question: questionList[qIdx_1].q,
                        ans: ""
                    })
                    
                    list.push({
                        question: questionList[qIdx_2].q,
                        ans: ""
                    })
                    this.setState({QnA_List: list})
                }
                else{
                    let list = JSON.parse(str)
                    this.setState({QnA_List: list})
                }
            })
        
    }

    onHandlePress = () => {
        
        if (this.isQnASet === false){
            let list = this.state.QnA_List
            list[0].ans = this.state.ans1;
            list[1].ans = this.state.ans2;
            this.setState({QnA_List: list})
            AsyncStorage.setItem(securityQnAAsyncStorageName, JSON.stringify(list))

            this.props.onSuccess && this.props.onSuccess()
        }
        else {

            if(this.state.QnA_List[0].ans === this.state.ans1 &&
                this.state.QnA_List[1].ans === this.state.ans2)
            {
                this.props.onSuccess && this.props.onSuccess()
            }
            else
            {
                this.props.onFailure && this.props.onFailure()
            }
        }
    }
    render() {
       return(
       <View>
           <Text style = {{
               fontSize: 20,
               fontWeight: 'bold',
               textAlign: 'center',
               marginTop: 50,
           }}>
               Security Question
           </Text>

            {this.state.QnA_List.map( (qna, k) => {
                return(
                    <ListItem key = {k}>
                        <Left>
                            <Text>Q{k+1}: {qna.question}</Text>
                        </Left>
                        <Right>
                        <Picker
                            mode="dropdown"
                            style={{ width: 100 }}
                            selectedValue={(k === 0)? this.state.ans1: this.state.ans2}
                            onValueChange={(value) => {
                                this.setState((k === 0)? {ans1: value}  : {ans2: value})
                            }}
                            >
                            <Item label="0" value="0" />
                            <Item label="1" value="1" />
                            <Item label="2" value="2" />
                            <Item label="3" value="3" />
                            <Item label="4" value="4" />
                            <Item label="5" value="5" />
                            <Item label="6" value="6" />
                            <Item label="7" value="7" />
                            <Item label="8" value="8" />
                            <Item label="9" value="9" />
                            <Item label="10" value="10" />
                            <Item label="10+" value="10+" />
                        </Picker>
                        </Right>
                    </ListItem>
                    
                )
            }) }   

            <Button 
            block  
            style={{ margin: 15, marginTop: 50 }}
            onPress = {this.onHandlePress}>
                <Text>Next</Text>
            </Button> 
        </View>
     )
}
}


