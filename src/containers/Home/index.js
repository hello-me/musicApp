/**
 * Created by licong on 2017/12/14.
 */
import React, {Component } from 'react';
import { Text, View, TouchableOpacity, SectionList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, screen } from '../../utils';
import { TextTool, MenuRow, ListFooter } from '../../widgets';
import { USER_PLAYLIST } from '../../api';

const { H4, Tip } = TextTool;

class Home extends Component {
static navigationOptions = ({navigation}) => ({
headerTitle: (
<View style={{width:screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
<TouchableOpacity onPress={() => navigation.navigate('Setting')}>
<H4 color="#ffffff">更多</H4>
</TouchableOpacity>
  <H4 color="#ffffff">我的音乐</H4>
  <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器', id: '529824297'})}>
  <Icon name="ios-stats-outline" size={30} color="#ffffff" /></TouchableOpacity>
</View>
),
  headerStyle: {
   backgroundColor: color.theme
   }
  });
  state = {
  refreshing: true,
  musicPlaylist: [], //本地的音乐
  createPlaylist: [], // 创建的音乐
  collectPlaylist: [],// 收藏的音乐
 };
  componentWillMount() {
  this.requestData();
  }
  requestData = () => {
    (
    async () => {
    const res = await fetch (USER_PLAYLIST + '16750353');
     const json = (await res.json()).playlist;
     console.log(json)
     this.setState({
      musicPlaylist: json,
      createPlaylist: json.filter((v, i) => i < 6),
      collectPlaylist: json.filter((v, i) => i > 5),
      refreshing: false,
     })
    })()
  };
  toDetail = id => {
  const {navigation} = this.props;
  navigation.navigate('Detail', {title: '歌单', id})
  }
  renderHeader = () => (
  <View>
    <TouchableOpacity
    onPress={() =>this.props.navigation.navigate('Mymusic')}>
    <MenuRow title="本地音乐" ionIcon="ios-musical-notes-outline" rightIcon rightTip = {[this.state.musicPlaylist.length]}/>
    </TouchableOpacity>
    <MenuRow title="最近播放" ionIcon="ios-play-outline" rightIcon rightTip="100"/>
    <MenuRow title="我的电台" ionIcon="ios-radio-outline"rightIcon rightTip="5"/>
    <MenuRow title="我的收藏" ionIcon="ios-star-outline" rightIcon rightTip="80" border={false}/>
  </View>
  );
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.toDetail(item.id)}>
      <MenuRow title={item.name} subTitle={`${item.trackCount}首， by ${item.creator.nickname}`} image={{uri: item.coverImgUrl + '?param=140y140'}}/>
    </TouchableOpacity>
  );
  sectionHeader = ({section}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', height:30, backgroundColor: color.border}}>
    <Icon name="ios-arrow-down-outline" size={15} style={{marginLeft: 15}}/>
    <Tip style={{marginLeft: 15}}>{section.title}</Tip>
  </View>
  );
  render() {
  const {refreshing, createPlaylist, collectPlaylist} = this.state;
  const sections = [
    {key: 1, title: `我创建的歌单(${createPlaylist.length})`, data: createPlaylist},
    {key:2, title: `我收藏的歌单(${collectPlaylist.length})`, data: collectPlaylist},
  ];
   return (
   <SectionList
   style={{backgroundColor: '#fff'}}
   onRefresh={this.requestData}
   refreshing={refreshing}
   keyExtractor={(item, index) =>index}
   sections={sections}
   renderItem={this.renderItem}
   renderSectionHeader={this.sectionHeader}
   ListHeaderComponent={this.renderHeader}
   ListFooterComponent={() => <ListFooter/>}
   stickySectionHeadersEnabled
   />
   )
  }
}
export default Home;
/*
*  完全跨平台。
 支持水平布局模式。
 行组件显示或隐藏时可配置回调事件。
 支持单独的头部组件。
 支持单独的尾部组件。
 支持自定义行间分隔线。
 支持下拉刷新。
 支持上拉加载*/
/*SectionList常用属性
* sections：Array相当于ListView中的数据源，sectionList所需要的数据都是经由sections属性传入，数据类型为Array类型
* renderItem: 返回Section中的每个小的Item
* renderSectionHeader: 返回每个section的标志性头部
* refreshing: boolean 是否处于刷新状态
* onRefersh: ()=>void通过函数改变refreshing从而控制刷新与否
* ListHeaderComponent: SectionList 头部组件
* ListfooterComponent: SectionList 尾部组件
* keyExtractor: 默认情况下每个item都需要提供一个不重复的key属性，因此可以通过keyExtractor函数为每一个item生成一个唯一的key。
* onEndReached: 是否到达底部，在默认情况下会有一个默认的distance FromEnd临界值，可以通过此属性来达到上拉加载的效果
* stickySectionHeadersEnabled: boolean 当下一个section把他的前一个section的可视区推离屏幕的时候。让这个section的header粘连在屏幕的顶端。
* 这个属性在iOS是默认可用的
*
* */
const styles = StyleSheet.create({
  listCtn: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    height: 35,
   lineHeight: 50,
  paddingLeft: 15,
  backgroundColor: '#fff',
 // borderBottomWidth: 1,
//s  borderBottomColor: '#eee'
},
musicmenu: {
  display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
    height: 60,
    lineHeight: 50,
    paddingLeft: 15,
   // backgroundColor: '#eee',
  //  borderBottomWidth: 1,
   // borderBottomColor: '#eee'
},
headLogo: {
  width: 40,
    height: 45,
   borderRadius: 20,
  //  marginRight: 10,
  // color: '#ce3d3a'
},
headerIcon: {
  color: '#a9a9a9',
    letterSpacing: 15,
    height: 45
},
headerFont: {
  letterSpacing: 15,
    height: 45,
    marginRight: 10
},
headerList: {
  flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
}
});