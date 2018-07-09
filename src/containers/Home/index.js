/**
 * Created by licong on 2017/12/14.
 */
import React, {Component } from 'react';
import { Text, View, TouchableOpacity, SectionList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, screen } from '../../utils';
import { TextTool, MenuRow, ListFooter } from '../../widgets';
import { USER_PLAYLIST } from '../../api';
import Header from '../../components/header';

const { H4, Tip } = TextTool;

class Home extends Component {
 static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={{width: screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <H4 color="#ffffff">更多</H4>
        </TouchableOpacity>
        <H4 color="#ffffff">我的音乐</H4>
        <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器', id: '529824297'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" /></TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: color.theme
    }
  });
  state = {
    refreshing: true,
    musicPlaylist: [],       //本地音乐
    createPlaylist: [],     // 创建的歌单
    collectPlaylist: [],    // 收藏的歌单
  };
  componentWillMount() {
    this.requestData();
  }
  requestData = () => {
    (
      async () => {
        const res = await fetch(USER_PLAYLIST + '16750353');
        const json = (await res.json()).playlist;
       // console.log(json)
        this.setState({
          musicPlaylist: json,
          createPlaylist: json.filter((v, i) => i < 6),
          collectPlaylist: json.filter((v, i) => i > 5),
          refreshing: false,
        })
      }
    )();
  };
  toDetail = id => {
    const { navigation } = this.props;
    navigation.navigate('Detail', {title: '歌单', id})
  };
  renderHeader = () => (
    <View>
    {/*<Header title="我的音乐"/>*/}
     <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Mymusic')}>
      <MenuRow title="本地音乐" ionIcon="ios-musical-notes-outline" rightIcon rightTip={[this.state.musicPlaylist.length]}/>
      </TouchableOpacity>
      <MenuRow title="最近播放" ionIcon="ios-play-outline" rightIcon rightTip="100" />
      <MenuRow title="我的电台" ionIcon="ios-radio-outline" rightIcon rightTip="5" />
      <MenuRow title="我的收藏" ionIcon="ios-star-outline" rightIcon rightTip="80" border={false} />
    </View>
  );
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.toDetail(item.id)}>
      <MenuRow title={item.name} subTitle={`${item.trackCount}首，  by ${item.creator.nickname}`} image={{uri: item.coverImgUrl + '?param=140y140'}} />
    </TouchableOpacity>
  );
  sectionHeader = ({section}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: color.border}}>
      <Icon name="ios-arrow-down-outline" size={15} style={{marginLeft: 15}} />
      <Tip style={{marginLeft: 15}}>{section.title}</Tip>
    </View>
  );
  render() {
    const { refreshing, createPlaylist, collectPlaylist} = this.state;
    const sections = [
      {key: 1, title: `我创建的歌单(${createPlaylist.length})`, data: createPlaylist},
      {key: 2, title: `我收藏的歌单(${collectPlaylist.length})`, data: collectPlaylist},
    ];
    return (
      <SectionList
        style={{backgroundColor: '#fff'}}
        onRefresh={this.requestData}
        refreshing={refreshing}
        keyExtractor={(item, index) => index}
        sections={sections}
        renderItem={this.renderItem}
        renderSectionHeader={this.sectionHeader}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={() => <ListFooter />}
        stickySectionHeadersEnabled
      />
    )
  }
}
export default Home;
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