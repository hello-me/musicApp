/**
 * Created by licong on 2017/12/18.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
            <View style={styles.headerList}>
              {
                this.props.title === '设置' ||  this.props.title === '我的歌单' ?
                  <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                  <View style={[styles.headerList,{justifyContent: 'flex-start', marginRight: 20}]}>
                    <Icon style={[styles.returnFont, {fontSize: 26}]} name="ios-arrow-back" size={10}/>
                    <Text style={[styles.headerFont]}> 首页</Text>
                  </View>
                </TouchableOpacity>
                  :
                  <Image style={styles.headerImg} source={require('../../assets/logo.png')}/>
              }
            </View>
          <View style={[styles.headerList, {justifyContent: 'center'}]}>
            <Text style={styles.headerFont}>{this.props.title}</Text>
          </View>
          <View style={[styles.headerList,{justifyContent: 'flex-end', marginRight: 20}]}>
            {
              this.props.title === '设置' ?
                <TouchableOpacity>
                <Text style={styles.headerFont}>退出登录</Text>
                </TouchableOpacity>
                :
                 <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                 <Icon style={[styles.headerFont, {fontSize: 26}]} name="ios-keypad" size={10}/>
                 </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:  '#ce3d3a',
  },
  headerList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15
  },
  headerFont: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 15
  },
  returnFont: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 15,
    marginLeft: 15
  },
  headerSearch:{
    height: 55,
    borderWidth: 0,
    borderColor: '#eee',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14
  }
});