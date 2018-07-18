/**
 * Created by licong on 2017/12/28.
 */
import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity, Image, SectionList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextTool, Avatar, IconWidget} from '../../widgets';
import {screen, color} from '../../utils';
import {PLAYLIST_DETAIL, TOP_LIST} from '../../api'
import { NavigationActions } from 'react-navigation';
import {setPlayId} from '../../redux/actions'
 const {H3, Tip, Normal} = TextTool;
class DetailScene extends PureComponent {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
 state = {
  dataList: [],
  refreshing: true,
  paused: false,
  data: {creator: {}, tracks: []}
  };
  componentWillMount() {
  }
  componentDidMount() {
  }
  requestDetail = () => {
    (
    async () => {
    const {id, type='playlist'} = this.props.navigation.state.params;
    const url = type === 'playlist' && PLAYLIST_DETAIL || type === 'top' && TOP_LIST;
    const res = await fetch(url +id);
    const {playlist, result} = await res.json();
    const json = playlist || result;
    this.setState({
    dataList: json.tracks.map(v => ({...v, title:v.name + ((v.alia && v.alia.length > 0) ? `(${v.alia})` : ''),
    subTitle:(v.ar || v.artists).map(a=>a.name).join(',') + '-' + (v.al || v.album).name})),
      refreshing: false,
      data: json
    })
    }
    )()
  };
  playSong = id => {
  const {dispatch, navigation} = this.props;
  dispatch(setPlayId(id));
  navigation.navigate('Player', {id: id})
  }
  scrollToLocation = (params) => {
  console.log(params)
  }
  toUserPage = id => {
  this.props.navigation.naviagte('UserDetail', {id})
  };
  renderHeader = () => {
  const {data} = this.state;
  return (
  <View style={styles.header}>
  <Imgae source={{uri: `${data.coverImgUrl}? param =250y250`}} resizeMode="cover" style={[styles.bg, {top: -50, height:screen.width * 0.6 +50}]} blurRadius={4}/>
  <View style={{flex: 1, flexDirection:'row', alignItems: 'center', paddingLeft: 10, backgroundColor:'transparent'}}>
  <View style={{width: screen.width * 0.3, height: acreen.width * 0.3}}>
  <Image source={{uri: `${data.coverImgUrl} ? param=250y250`}} style={{width: '100%', height: '100%'}}/>
  </View>
  <View style={{flex: 1, marginLeft: 15, height: '80%'}}>
   <H3 style={{paddingTop: 15, paddingBottom: 10}} color={color.white}>{data.name}</H3>
    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() =>this.toUserPage(data.creator.userId)}>
      <Avatar img={{uri: `${data.creator.avatarUrl}?param=80y80`}} size={30}/>
      <Normal style={{paddingVertical: 10, paddingHorizontal: 10}} color={color.white}>{data.creator.nickname} ></Normal>
    </TouchableOpacity>
  </View>
  </View>
  </View>
  )
  }
  render() {
   return (
   <SectionList
   style={{backgroundColor: '#fff'}}
   onRefresh={this.requestDetail}
   refreshing={refreshing}
   sections={[{key: '1', data: dataList}]}
   rednerItem={}
   ListHeaderComponent={}
   keyExtractor={}
   scrollToLocation={this.scrollToLocation}
   renderSectionHeader={}
   />
   )
  }
}
/**/

const styles = StyleSheet.create({
  header: {
    height: screen.width * 0.6,
    width: screen.width,
    backgroundColor: '#777777',
    // top: -50,
    // paddingTop: 15,
  },
  bg: {
    position: 'absolute',
    top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    opacity: 0.3,
    height: screen.width * 0.6,
    width: screen.width,
  },
});
const mapStateToProps = (currentPlay) => ({
  currentPlayId: currentPlay.id,
});
 export default connect(mapStateToProps)(DetailScene)