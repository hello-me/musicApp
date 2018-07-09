/**
 * Created by licong on 2017/12/26.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/header'
export default class player extends Component {
  render() {
    return (
      <View>
        <Header title="音乐播放"/>
      </View>
    )
  }
}