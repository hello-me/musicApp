/**
 * Created by licong on 2017/12/14.
 */
import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, Text, DrawerLayoutAndroid} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Setting from '../pages/Setting'
import Mymusic from '../pages/Mymusic'
import { createStore } from 'redux';
import reducer from '../redux/reducer'
import PlayerScene from '../pages/player/PlayerScene';
import {DetailScene} from '../pages/detail'
//引入页面容器
import {
  Home,
  DiscoverMusic,
  socalManage,
  Login
} from '../containers'
const store = createStore(reducer)
console.log(store.getState());
 const {height, width} = Dimensions.get('window');
 const tabbar = TabNavigator({
   Home: {
     screen: Home,
     navigationOptions: ({navigation}) => ({
       tabBarLabel: '我的音乐',
       tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="ios-home" size={28} color={tintColor} />
       )
     })
   },
   DiscoverMusic: {
     screen: DiscoverMusic,
     navigationOptions: ({navigation}) => ({
       tabBarLabel: '发现音乐',
       tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="ios-musical-notes" size={28} color={tintColor} />
       )
     })
   },
   musicManage: {
     screen: socalManage,
     navigationOptions: ({navigation}) => ({
       tabBarLabel: '社交管理',
       tabBarIcon: ({ focused, tintColor }) => (
         <Icon name="ios-paper" size={28} color={tintColor} />
       )
     })
   }
 }, {
   tabBarPosition: 'bottom',
   swipeEnabled: false,
   animationEnabled: false,
   lazy: true,
   backBehavior: 'initialRoute',
   tabBarOptions: {
     style: {
       height: (Platform.OS === 'ios')
         ? width / 8
         : width / 7 - 5,
       backgroundColor: '#fff',
       borderTopWidth: 0.5,
       borderColor: '#e4e4e4'
     },
     labelStyle: {
       fontSize: width / 35
     },
     iconStyle: {
       height: width / 20
     },
     indicatorStyle: {
       height: 0
     },
     scrollEnabled: false,
     activeBackgroundColor: '#fff',
     activeTintColor: '#ce3d3a',
     inactiveBackgroundColor: '#fff',
     inactiveTintColor: '#444444',
     showLabel: true,
     showIcon: true
   }
 });
const Navigator = StackNavigator(
{
  Main: {screen: tabbar},
  Login: {screen: Login},
  Setting: {screen: Setting},
  Player: { screen: PlayerScene},
  Detail: {screen: DetailScene}
 },
  {
    navigationOptions: {
      headerBackTitle: '返回',
      headerTintColor: '#333333',
      showIcon: true
    }
  }
);
const AppNavigator = StackNavigator(
  {
    MainNavigator: { screen: Navigator },
    Mymusic:  {screen: Mymusic},
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
export default AppNavigator;