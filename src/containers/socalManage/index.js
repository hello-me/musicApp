/**
 * Created by licong on 2017/12/14.
 */
import React, { Component } from 'react';
import { Text, SectionList, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../../utils';
import { TextTool, VerticalSeparator, EventItem } from '../../widgets';
import { FRIENDS_EVENT } from '../../api';

const { H3, H4, Tip, Normal } = TextTool;

class socalManage extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: <Icon name="ios-person-add-outline" size={30} color={color.white} />,
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器', id: '529824297'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" style={{marginRight: 20}} /></TouchableOpacity>,
    headerStyle: {
      backgroundColor: color.theme,
      paddingHorizontal: 20
    }
  });
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 40, backgroundColor: color.backgroundColor, marginBottom: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="ios-create-outline" size={30} />
            <H4 style={{marginLeft: 10}}>发动态</H4>
          </View>
          <VerticalSeparator />
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Icon name="ios-videocam-outline" size={30} />
            <H4 style={{marginLeft: 10}}>发布视频</H4>
          </View>
        </View>
      </View>
    )
  }
}

export default socalManage;