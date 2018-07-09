/**
 * Created by licong on 2017/12/20.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../../utils';
export default class Setting extends Component {
  static navigationOptions = ({navigation}) => ({
    header: <View style={{width: 0, height: 0}}/>
  });
  goBack = () => {
    const backAction = NavigationActions.back();
    console.log(backAction);
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="ios-arrow-back-outline" size={25} color={color.white} />
          </TouchableOpacity>
          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: '#f8f8ff'}}>设置</Text>
          </View>
          <TouchableOpacity>
            <Icon name="ios-stats-outline" size={25} color={color.white} onPress={() => navigation.navigate('Player', {title: '播放器'})} />
          </TouchableOpacity>
        </View>
       <Text>设置</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  headerContainer: {
    height: 50,
    width: screen.width,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ce3d3a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: screen.onePixel,
    borderColor: 'rgba(245, 245, 245, 0.21)'
  }
})