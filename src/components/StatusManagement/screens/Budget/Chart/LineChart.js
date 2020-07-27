import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';
import { Content } from 'native-base';


import { BarChart } from 'react-native-charts-wrapper';
import { connect } from 'react-redux';
import moment from 'moment';

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: moment().format('YYYY-MM'),
      modalVisible: false,
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
      },
      dataIncome: {},
      dataExpense: {},
      highlights: [],
      xAxis: {},
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
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }
  }

  // Load data to state
  loadData = () => {
    const { budgetList } = this.props;
    const { selectedMonth } = this.state;

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
        // income data
        if (budget.type === 'Income') {
          if (!indexIncome[budget.date]) {
           
            indexIncome[budget.date] = {
              y: Number(budget.amount),
              x: Number(budget.date.split('-', 1)) - 1,
            };
          } else {
            indexIncome[budget.date].y =
              indexIncome[budget.date].y + Number(budget.amount);
          }
        } 
        // expense data
        else {
          if (!indexExpense[budget.date]) {
            indexExpense[budget.date] = {
              y: Number(budget.amount),
              x: Number(budget.date.split('-', 1)) - 1,
            };
          } else {
            indexExpense[budget.date].y =
              indexExpense[budget.date].y + Number(budget.amount);
          }
        }
      }
    });

    Object.keys(indexIncome).forEach(key => {
      valueChartIncome.push({
        y: indexIncome[key].y,
        x: indexIncome[key].x,
      });
    });
    Object.keys(indexExpense).forEach(key => {
      valueChartExpense.push({
        y: indexExpense[key].y,
        x: indexExpense[key].x,
      });
    });

    this.setState({
      dataIncome: {
        dataSets: [
          {
            values: valueChartIncome,
            label: '',
            config:config
          },
        ],
      },
      dataExpense: {
        dataSets: [
          {
            values: valueChartExpense,
            label: '',
            config: config
          },
        ],
      },
      xAxis: {
        valueFormatter: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
        granularityEnabled: true,
        granularity: 1,
        drawGridLines: false,
        position: 'BOTTOM',
      },

      valueChartIncome,
      valueChartExpense,
    });
  };

  render() {
    return (
      <Content padder>
        <View style={styles.viewtitle}>
          <Text style={{fontSize: 20, color:this.props.typePieChart == 'Income' ?'green': 'red', fontWeight: 'bold'}}>
            {this.props.typePieChart == 'Income'
              ? 'Income a day in month'
              : 'Expense a day in month'}
          </Text>
        </View>
      
        <BarChart
          style={styles.chart}
          data={
            this.props.typePieChart == 'Income'
              ? this.state.dataIncome
              : this.state.dataExpense
          }
          xAxis={this.state.xAxis}
          animation={{ durationX: 2000 }}
          legend={this.state.legend}
          gridBackgroundColor={processColor('white')}
          visibleRange={{ x: { min: 15, max: 31 } }}
          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}
          onSelect={this.handleSelect.bind(this)}
          highlights={this.state.highlights}
          onChange={event => console.log(event.nativeEvent)}
          yAxis={{
            left: { drawGridLines: false },
            right: { drawGridLines: false },
          }}
        />
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
    processColor('#CD5CAC'),
    processColor('#35ADB5'),
    processColor('#FE3334'),
    processColor('#FFA601'),
  ],
  valueTextSize: 10,
  valueTextColor: processColor('green'),
  sliceSpace: 5,
  selectionShift: 13,
  valueFormatter: '#.#',
  valueLineColor: processColor('green'),
  valueLinePart1Length: 0.5,

}



const mapStateToProps = state => {
  return {
    budgetList: state.budgetReducer.budgetList,
  };
};
export default connect(mapStateToProps, null)(LineChart);

const styles = StyleSheet.create({
  chart: {
    height: 250,
    width: 360,
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  viewtitle:{
     alignItems: 'center', margin: 20 
  }
});
