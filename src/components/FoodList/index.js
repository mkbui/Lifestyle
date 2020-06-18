import React, {Component} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import {
  Button,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
  Toast,
} from "native-base";
import {connect} from "react-redux";
import {removeFood} from "../../actions";
import {foodOperate} from "../../reducers";
import {ViewFilter} from "../../actions";
import data from "../../data/data.json";
import FormButton from "../FormButton";




/*
const showVisibleList = (food, filter) => {
  switch (filter) {
    case ViewFilter.SHOW_ALL: return food
  }
}
*/

/*
const mapStateToProps = (state) => ({
  foodList: state.foodList

})*/

function mapStateToProps(state) {
  return {foodList: state.foodList}
}

const mapDispatchToProps = dispatch => ({
  removeFood: (id) => dispatch(removeFood(id))
})

class FoodList extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      collapse: true,
    }
  }

  collapseForm(){
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  removeItem(data){
    this.props.removeFood(data.id);
    Toast.show({
      text: "Removed successfully!",
      type: "success",
    })
  }

  render(){
    const {foodList} = this.props;
    return(
        foodList.map(data =>
            <ListItem thumbnail key = {data.id}>
              <Left>
                <Thumbnail square source={data.image} />
              </Left>
              <Body>
                <Text>
                  {data.name}
                </Text>
                <Text numberOfLines={1} note>
                  {data.category}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon style = {styles.iconView} type = "FontAwesome5" name = "glasses"/>
                  <Icon style = {styles.iconView} name = "trash" onPress = {() => {this.removeItem(data)}} />
                </Button> 
              </Right>
            </ListItem>
      
        )
    )
  }
}

const styles = StyleSheet.create({
  iconView: {
    paddingRight: 3,
    color: 'black',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodList);