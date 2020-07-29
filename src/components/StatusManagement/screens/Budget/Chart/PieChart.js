import React, {Component} from 'react';
import {StyleSheet, Text, View, processColor, Image} from 'react-native';
import {Content} from 'native-base';

import {PieChart} from 'react-native-charts-wrapper';
import {connect} from 'react-redux';
import moment from 'moment';

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: moment().format('YYYY-MM'),
      modalVisible: false,
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },

      dataIncome: {},
      dataExpense: {},
      highlights: [{x: 2}],
      description: {
        text: '',
        textSize: 20,
        textColor: processColor('darkgray'),
      },
      animation: {
        durationX: 1000,
        durationY: 1000,
        random: Math.random(),
      },
      valueChartIncome: [],
      valueChartExpense: [],
    };
  }
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    //choose month
    if (this.state.selectedMonth !== prevProps.selectedMonth) {
      this.setState({
        selectedMonth: this.props.selectedMonth,
        modalVisible: this.props.modalVisible,
      });
    }

    //props change
    if (
      this.state.selectedMonth !== prevState.selectedMonth ||
      this.props.budgetList !== prevProps.budgetList
    ) {
      this.loadData();
    }
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }
  }
  loadData = () => {
    const {budgetList} = this.props;
    const {selectedMonth} = this.state;

    let indexIncome = {};
    let indexExpense = {};
    let valueChartIncome = [];
    let valueChartExpense = [];

    budgetList.map(budget => {
      // <View key={budget.id}></View>
      if (
        selectedMonth ===
        budget.date
          .split('-')
          .reverse()
          .join('-')
          .split('-', 2)
          .join('-')
      ) {
        if (budget.type === 'Income') {
          if (!indexIncome[budget.checkedIndex]) {
            indexIncome[budget.checkedIndex] = {
              value: Number(budget.amount),
              label: budget.category,
              categoryImage: budget.categoryImage,
            };
          } else {
            indexIncome[budget.checkedIndex].value =
              indexIncome[budget.checkedIndex].value + Number(budget.amount);
          }
        } else {
          if (!indexExpense[budget.checkedIndex]) {
            indexExpense[budget.checkedIndex] = {
              value: Number(budget.amount),
              label: budget.category,
              categoryImage: budget.categoryImage,
            };
          } else {
            indexExpense[budget.checkedIndex].value =
              indexExpense[budget.checkedIndex].value + Number(budget.amount);
          }
        }
      }
    });

    Object.keys(indexIncome).forEach(key => {
      valueChartIncome.push({
        value: indexIncome[key].value,
        label: indexIncome[key].label,
        categoryImage: indexIncome[key].categoryImage,
      });
    }
    
    );
    Object.keys(indexExpense).forEach(key => {
      valueChartExpense.push({
        value: indexExpense[key].value,
        label: indexExpense[key].label,
        categoryImage: indexExpense[key].categoryImage,
      });
    });

    this.setState({
      dataIncome: {
        dataSets: [
          {
            values: valueChartIncome,
            label: '',
            config: config,
          },
        ],
      },
      dataExpense: {
        dataSets: [
          {
            values: valueChartExpense,
            label: '',
            config: config,
          },
        ],
      },
      valueChartIncome,
      valueChartExpense,
    });
  };

  render() {
    var valueChart =
      this.props.typePieChart == 'Income'
        ? this.state.valueChartIncome
        : this.state.valueChartExpense;
    return (
      <Content padder>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 20, color: this.props.typePieChart == 'Income' ?'green':'red', fontWeight: 'bold'}}>
            {this.props.typePieChart == 'Income' ? 'INCOME' : 'EXPENSE'}
          </Text>
        </View>

        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={this.state.description}
          data={
            this.props.typePieChart == 'Income'
              ? this.state.dataIncome
              : this.state.dataExpense
          }
          legend={this.state.legend}
          highlights={this.state.highlights}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={15}
          drawEntryLabels={true}
          rotationEnabled={true}
          usePercentValues={true}
          styledCenterText={{
            text: '',
            color: processColor('pink'),
            size: 15,
          }}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          onSelect={this.handleSelect.bind(this)}
          onChange={event => console.log(event.nativeEvent)}
          animation={this.state.animation}
        />

        {/* Show total amount of category */}
        {valueChart.map(item => {
          return (
            <View style={styles.itemRow}>
              <Image source={item.categoryImage} style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
              <Text style={{fontSize: 15,fontWeight: 'bold', color:"grey", fontWeight: 'bold'}}>{item.value}</Text>
            </View>
          );
        })}
      </Content>
    );
  }
}

const config = {
  colors: [
    processColor('#FFD000'),
    processColor('#FE5972'),
    processColor('#87DFB0'),
    processColor('#45C1EA'),
    processColor('#EE7720'),
  ],
  valueTextSize: 20,
  valueTextColor: processColor('green'),
  sliceSpace: 5,
  selectionShift: 13,
  valueFormatter: "#.#'%'",
  valueLineColor: processColor('green'),
  valueLinePart1Length: 0.5,
};

const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, null)(Chart);

const styles = StyleSheet.create({
  chart: {
    height: 300,
    width: 300,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'grey',
    borderWidth: 0.5,
    height: 50,
    alignItems: 'center',
    
  },
  icon: {height: 40, width: 40},
  
  label: {fontSize: 15},
});
