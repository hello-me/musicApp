/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, {Component} from "react";
 import {Provider, connect} from "react-redux";
 import {AsyncStorage, BackHandler} from "react-native";
 import {NavigationActions, addNavigationHelpers} from "react-navigation";
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import Faicon from 'react-native-vector-icons/FontAwesome';
 import getStore from "./src/store";
 import AppNavigator from './src/router';
 import http from './src/utils/http'
 //进入http 并注册到全局
 global.http = http
 global.storage = AsyncStorage
 global.Ionicon = Ionicons
 global.Faicon = Faicon
 const navReducer = (state, action) => {
  const newState = AppNavigator
    .router
    .getStateForAction(action, state);
    return newState || state;
 };
 const mapStateToProps = (state) => ({nav: state.nav});
  class App extends Component {
   /*处理安卓硬件返回按键 开始*/
   componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
   }
   componentWillUnmount() {
   BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
   }
   onBackPress = () => {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
    return false;
    }
    dispatch(NavigationActions.back());
    return true;
   };
   /* 处理安卓硬件返回按键 结束*/
    render() {
    const {dispatch, nav} = this.props;
    const navigation = addNavigationHelpers({dispatch, state:nav});
      global.navigation = navigation
    return (<AppNavigator navigation={navigation}/>);
    }
  }
  const AppWithNavigationState = connect(mapStateToProps)(App);
  const store = getStore(navReducer);
export default function Root() {
 return (
   <Provider store={store}>
     <AppWithNavigationState/>
   </Provider>
 )
}
/*
于是connect 就是将store 中的必要数据作为props传递给React组件来
render,并包装action creator 用于在相应用户操作时dispatch
* */
