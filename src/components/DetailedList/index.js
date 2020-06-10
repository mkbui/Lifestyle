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

} from "native-base";
import {connect} from "react-redux";
import {foodOperate} from "../../reducers";
import {ViewFilter} from "../../actions";
import data from "../../data/data.json";

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

class DetailedList extends Component {
  render(){
    const {data} = this.props;
    return(
        data.map(data =>
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
                  <Icon style = {styles.iconView} name = "trash" />
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

export default connect(mapStateToProps)(DetailedList);