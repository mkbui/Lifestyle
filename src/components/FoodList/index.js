import React, {Component} from "react";
import {SafeAreaView, StyleSheet, ToastAndroid} from "react-native";
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
import {checkFilter} from "../../utils";



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

/* store data used: exercise list */
function mapStateToProps(state) {
  return {foodList: state.foodList}
}

/* store dispatch function used: remove exercise for item removal */
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

  /* dispatch function call along with a toast */
  removeItem(data){
    this.props.removeFood(data.id);
    ToastAndroid.show(
      "Food removed successfully!",
      ToastAndroid.SHORT
    )
  }



  render(){
    const {foodList, search, filter} = this.props;
    var isFilter = false;
    filter.map(data => {
      if (data.checked === true) isFilter = true;
    })
    
    let renderList = foodList.filter(data => 
      (data.name.indexOf(search) !== -1 && 
        (!isFilter || checkFilter(data.category, filter) === true)
      )
    )
    return(
        renderList.map(data => 
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