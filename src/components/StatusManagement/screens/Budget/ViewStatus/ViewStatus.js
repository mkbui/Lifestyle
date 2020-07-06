// props change does not re-render
import React, { Component, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import {
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';

import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import Item from './BudgetItem'

class ViewStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentMonth: moment().format('YYYY-MM'),
      dayAgenda: {}
    };

  }
  // Reload item when props change
  componentDidUpdate(prevProps) {
    if (prevProps.budgetList !== this.props.budgetList) {
      this.loadItems();
    }
  }

  loadItems = (day) => {
    console.log("loadItems")
    let { budgetList } = this.props;
    for (let i = -15; i < 85; i++) {
      var timestamp = Math.floor(Date.now());
      if(day){
        timestamp = day.timestamp
      }
      const time = timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      this.state.items[strTime] = [];
      budgetList
        // Sort budgetList by date
        .sort(
          (a, b) =>
            Date.parse(
              new Date(
                b.date
                  .split('-')
                  .reverse()
                  .join('-'),
              ),
            ) -
            Date.parse(
              new Date(
                a.date
                  .split('-')
                  .reverse()
                  .join('-'),
              ),
            ),
        )
        .map(budget => {
          if (
            //Format date YYYY-MM-DD
            budget.date
              .split('-')
              .reverse()
              .join('-') === strTime
          ) {

            this.state.items[strTime].push({
              id: budget.id,
              date: strTime,
              note: budget.note,
              amount: budget.amount,
              type: budget.type,
              category: budget.category,
              categoryImage: budget.categoryImage,
              checkedIndex: budget.checkedIndex,
            });
          }
        });
    }
    // format the data required by Agenda library
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });

    this.setState({
      items: newItems,
    });
  };

  renderEmptyDate = () =>{
    return(
      <View>
      </View>
    )
  }

  renderItem = (item, firstItemInDay) => {
    return (
      <Item item={item} firstItemInDay={firstItemInDay}
        navigation={this.props.navigation}
      />
    )
      ;
  };
  rowHasChanged = (r1, r2) => {
    return (
      r1.id !== r2.id || r1.date !== r2.date || r1.amount !== r2.amount || r1.note !== r2.note || r1.category !== r2.category
    );
  };

  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  render() {
    return (
      <>

        {/* Header */}
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{ flex: 1 }}>
            <Title style={styles.headerText}>Budget</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{ fontWeight: 'bold' }}>Back</Text>
            </Button>
          </Right>
        </Header>


        {/* Agenda */}
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />

      </>
    );
  }
}



const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,

  };
};
export default connect(mapStateToProps, null)(ViewStatus);

const styles = StyleSheet.create({

  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

