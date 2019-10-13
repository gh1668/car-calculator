import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native';


export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    let totalmoney = navigation.getParam('totalmoney', 'NO-ID');
    const preMoney = navigation.getParam('preMoney', 'NO-ID');
    const period = navigation.getParam('period', 'NO-ID');
    const installmentDay = navigation.getParam('installmentDay', 'NO-ID');
    const rate = navigation.getParam('rate', 'NO-ID');
    const finalValue = Math.round(((totalmoney-preMoney) * (rate / 1200)) * (Math.pow((1 + (rate / 1200)), installmentDay)) / (Math.pow((1 + (rate / 1200)), installmentDay) - 1));
    this.state = {
      totalInterest: 0,
    }
    
  }

  render() {
    const { navigation } = this.props;
    const preMoney = navigation.getParam('preMoney', 'NO-ID');
    let totalmoney = navigation.getParam('totalmoney', 'NO-ID') - preMoney;
    const period = navigation.getParam('period', 'NO-ID');
    const installmentDay = navigation.getParam('installmentDay', 'NO-ID');
    const rate = navigation.getParam('rate', 'NO-ID');
    const finalValue = Math.round((totalmoney * (rate / 1200)) * (Math.pow((1 + (rate / 1200)), installmentDay)) / (Math.pow((1 + (rate / 1200)), installmentDay) - 1));

    let continueMoney = 0
    totalmoney = finalValue * installmentDay
    let numbers = Array.from({ length: installmentDay }, (e, i) => i);
    let result = numbers.map((num) => {
      continueMoney = totalmoney - finalValue
      totalmoney = continueMoney
      return continueMoney
    });
    let testval = 0 
    const DATA = [
      {
        money: finalValue,
      },
    ];

    Item = ({money , num} ) => {
      testval = (testval + Math.round(result[num]*0.03))
      return (
        <View style={styles.item}>
          <Text style={styles.title2}>{numbers[num]+1}개월차</Text>
          <Text style={styles.title2}>남은 금액 : {result[num].toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          <Text style={styles.title2}>상환액:{money.toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          <Text style={styles.title2}>원금:{Math.round(money - result[num]*0.03).toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          <Text style={styles.title2}>이자:{Math.round(result[num]*0.03).toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          <Text style={styles.title2}>이자합계:{testval.toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
        </View>
      );
    }
    renderHeader = () => {
      return (
        <View style={styles.item}>
        <Text style={styles.title2}>총액 : {(finalValue*installmentDay).toString().replace(/,/g,"").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
        <Text style={styles.title2}>{installmentDay}개월</Text>
      </View>
     )
   }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>자동차할부계산기</Text>
          <View style={{ width: "100%", borderBottomWidth: 0.5, borderColor: '#444' }} />
        </View>
        <View style={styles.content}>
          <View style={styles.elem}>
          </View>
        </View>
        <FlatList
          data={DATA}
          ListHeaderComponent={renderHeader()}
          renderItem={({ item }) => numbers.map(num =>(<Item money = {item.money} num = {num}/>))}
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