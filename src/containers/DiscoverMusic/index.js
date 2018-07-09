/**
 * Created by licong on 2017/12/14.
 */
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
 import MainScene from './MainScene';
 import PlaylistScene from './PlaylistScene';
import TopScene from './TopScene';
import RadioScene from './RadioScene';
import { screen, color } from '../../utils';

class DiscoverMusic extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchBar}>
        <Icon style={styles.headerIcon} name="ios-search-outline" size={15} color="#cccccc" />
        <TextInput  style={styles.headerSearch} placeholder="搜索音乐、歌词、电台"/>
      </TouchableOpacity>
    ),
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('ModalMenu', {title: '测试'})}><Icon name="ios-microphone-outline" size={30} color="#ffffff" style={{marginLeft: 20}} /></TouchableOpacity>,
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器', id: '529824297'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" style={{marginRight: 20}} /></TouchableOpacity>,
    headerStyle: {
      backgroundColor: color.theme
    }
  });
  componentDidMount() {
    console.log(this.tabView);
  }
  render() {
    const types = [
      {title: '个性推荐', component: MainScene},
      {title: '歌单', component: PlaylistScene},
      {title: '主播电台', component: RadioScene},
      {title: '排行榜', component: TopScene},
    ];
    return (
      <ScrollableTabView
        style={{flex: 1, backgroundColor: '#FBFCFE'}}
        tabBarBackgroundColor="#ffffff"
        tabBarActiveTextColor="#D43C33"
        tabBarInactiveTextColor="#000000"
        tabBarUnderlineStyle={{backgroundColor: '#D43C33'}}
        renderTabBar={() => <DefaultTabBar />}
      >
        {types.map((v, i) => {
        const Component = v.component;
        return <Component key={i} tabLabel={v.title} natigation={this.props.navigation}/>
        })}
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: screen.width / 3 * 2 ,
    height: screen.width / 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    height: 55,
    borderColor: '#eee',
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingTop: 20
  },
  headerSearch:{
    borderRadius: 30,
    borderWidth: 0,
    height: 55,
    borderColor: '#eee',
    width: screen.width / 3 * 2,
    backgroundColor: '#fff',
    paddingLeft: 0,
    fontSize: 14
  }
});

export default DiscoverMusic;