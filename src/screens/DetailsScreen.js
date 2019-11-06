import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';


export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalInterest: 0,
    }

  }

  render() {
    const { navigation } = this.props;
    const preMoney = navigation.getParam('preMoney', 'NO-ID');
    const totalmoney = navigation.getParam('totalmoney', 'NO-ID') - preMoney;
    let totalmoneyRate = navigation.getParam('totalmoney', 'NO-ID') - preMoney;
    let totalmoneyTotal = navigation.getParam('totalmoney', 'NO-ID') - preMoney;
    let totalmoney2 = navigation.getParam('totalmoney', 'NO-ID') - preMoney;
    const period = navigation.getParam('period', 'NO-ID');
    const installmentDay = navigation.getParam('installmentDay', 'NO-ID');
    const rate = navigation.getParam('rate', 'NO-ID')/100;
    const finalValue = Math.round((totalmoney * (rate / 12)) * (Math.pow((1 + (rate / 12)), installmentDay)) / (Math.pow((1 + (rate / 12)), installmentDay) - 1));
    const finalValue1 = Math.floor(totalmoney / installmentDay)
    const way = navigation.getParam('way', 'NO-ID');
    let continueMoney = totalmoney
    let sumRate = 0
    let value = 0
    let numbers = Array.from({ length: installmentDay }, (e, i) => i);
    const resultRate = numbers.map((num) => {
      way == 0 && (num != 0 && (continueMoney = totalmoneyRate - (finalValue -  Math.round(totalmoneyRate*(rate/12)))))
      way == 1 && (num != 0 && (continueMoney = totalmoneyRate - (finalValue1 +  Math.round(totalmoneyRate*(rate/12)))))
      way == 2 && (num != 0 && (continueMoney = totalmoneyRate - (finalValue -  Math.round(totalmoneyRate*(rate/12)))))
      totalmoneyRate = continueMoney
      return continueMoney
    });
    totalmoneyRate = totalmoney
    totalmoneyTotal = totalmoney
    const resultTotal = numbers.map((num) => {
      way == 0 && (continueMoney = totalmoneyTotal - (finalValue -  Math.round(totalmoneyTotal*(rate/12))))
      way == 1 && (continueMoney = totalmoneyTotal - finalValue1)
      way == 2 && (continueMoney = totalmoneyTotal - (finalValue -  Math.round(totalmoneyTotal*(rate/12))))
      totalmoneyTotal = continueMoney
      return continueMoney
    });
    const price = numbers.map((num) => {
      value = (way == 0 && Math.round(resultTotal[num])) ||
      (way == 1 && Math.round(resultTotal[num])) ||
      (way == 2 && 0);
      return value
    });
    const payment = numbers.map((num) => {
      value =
      (way == 0 && Math.round(finalValue)) ||
      (way == 1 && Math.floor((finalValue1 + (resultRate[num] * rate/12)))) ||
      (way == 2 && Math.round((finalValue1 + (resultRate[num] * rate/12))));
      return value
    });
    const principal = numbers.map((num) => {
      value =
      (way == 0 && Math.round(finalValue - resultRate[num] * rate/12)) ||
      (way == 1 && Math.floor(finalValue1)) ||
      (way == 2 && Math.round(finalValue1));
      return value
    });
    const itemrate = numbers.map((num) => {
      value = 
      (way == 0 && Math.round(resultRate[num] * rate/12)) ||
      (way == 1 && Math.round(resultRate[num] * rate/12)) ||
      (way == 2 && Math.round(resultRate[num] * rate/12));
      return value
    });

    const sumItemRate = numbers.map((num) => {
      num == 0 
      ? value = (Math.round(resultRate[num] * rate/12))
      : value = (value + Math.round(resultRate[num] * rate/12))
      return value
    });

    const DATA = [
      {
      },
    ];

    Itemway = ({num , way }) => {

      return (
        <View style={styles.item}>
          <Text style={styles.title2}>{numbers[num] + 1}개월차</Text>

          {(num != installmentDay-1) 
            ? <Text style={styles.title2}>남은 금액 : {price[num].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            : <Text style={styles.title2}>남은 금액 : 0원</Text>}

          <Text style={styles.title2}>상환액:{payment[num].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
           
          {(num != installmentDay-1)
          ? <Text style={styles.title2}>원금:{principal[num].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          : <Text style={styles.title2}>원금:{(principal[num] + price[num]).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
  
          {(num != installmentDay) 
          ? <Text style={styles.title2}>이자:{itemrate[num].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          : way == 0 && <Text style={styles.title2}>이자:{(itemrate[num] - price[num]).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
          {(num != installmentDay)
          ? <Text style={styles.title2}>이자합계:{sumItemRate[num].toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          : way == 0 && <Text style={styles.title2}>이자합계:{(sumItemRate[num] - price[num]) .toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
        }
        </View>
      );

    }

    renderHeader = (num) => {

      return (
        <View style={styles.item}>
          {num == 0 && (<Text style={styles.title2}>총액 : {(finalValue * installmentDay).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>)}
          {num == 1 && <Text style={styles.title2}>총액 : {(finalValue1 * installmentDay).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
          {num == 2 && <Text style={styles.title2}>총액 : {(finalValue * installmentDay).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>}
          <Text style={styles.title2}>총이자 : {(sumItemRate[installmentDay-1] - price[installmentDay-1]).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          <Text style={styles.title2}>{installmentDay}개월</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, paddingBottom: 30, paddingLeft: 10, }}>자동차할부계산기</Text>
          <View style={{ width: "100%", borderBottomWidth: 0.5, borderColor: '#444' }} />
        </View>
        <View style={styles.content}>
          <View style={styles.elem}>
          </View>
        </View>
          <FlatList
            data={DATA}
            ListHeaderComponent={renderHeader(way)}
            renderItem={({ item }) => numbers.map(num => (<Itemway num={num} way={way}/>))}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: 'green',
  },
  footer: {
    height: 60,
    backgroundColor: 'red',
  },
  content: {
    flex: 1,
  },
  title: {
    width: '100%',
    height: '18%',
    justifyContent: 'center',
    fontSize: 32,
    //backgroundColor: '#9aa9ff',
  },
  title2: {
    fontSize: 32,
    //backgroundColor: '#9aa9ff',
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  moneyBtn: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    borderColor: '#eee',
    justifyContent: 'center',
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userComment: {
    padding: 8,
    borderRadius: 5,
    height: 50,
    width: 60,
  },
  inputComment: {
    padding: 8,
    borderRadius: 5,
    height: 50,
    width: 100,
  },
  name: {
    paddingLeft: 10,
  },
  specialText: {
    paddingLeft: 23,
  },
  supportText: {
    padding: 7,
  },
  inputText: {
    padding: 4,
  },
  inputBtn: {
    height: 50,
  },
  footer: {
    width: '100%',
    height: '15%',
    //backgroundColor: '#1ad657',
  },
  item: {
    backgroundColor: 'skyblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

});