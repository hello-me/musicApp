/**
 * Created by licong on 2017/12/22.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList, Modal, TouchableNativeFeedback} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// 引入action
import * as musicAction from '../../store/actions/musicData';
import Header from '../../components/header';
import Icon from 'react-native-vector-icons/Ionicons';
// 常量设置
const INITIAL_PAGE = 1;
class MusicList extends Component {
 constructor(props) {
   super(props);
  this.state = {
   }
 }
  _renderItem = (item) => {
  return (
  <View style={styles.listCtn}>
  <Icon style={styles.headLogo} name="ios-musical-notes" size={28}/>
  <View style={{flex:1}}>
    <Text style={[styles.name, {color: '#000'}]}>{item.item.name}</Text>
  </View>
    <TouchableNativeFeedback
    onPress={() => navigation.navigate('Main', {title: '音乐播放'})}
    background={TouchableNativeFeedback.SelectableBackground()}>
    <Icon style={styles.play} name="ios-play-outline" size={25}/>
    </TouchableNativeFeedback>
    <TouchableNativeFeedback
    onPress={() => navigation.navigate('Main')}
    background={TouchableNativeFeedback.SelectableBackground()}>
     <Icon style={styles.more} name="ios-more" size={28}/>
    </TouchableNativeFeedback>
  </View>
  )
  }
  render() {
  const {musicList} = this.props
  return (
  <FlatList
  data={musicList}
  renderItem={this._renderItem}
  />
  )
  }
}
const mapStateToProps = state => {
  return {musicData: state.musicData}
}
const mapDispatchToProps = (dispatch) => ({
/*
 bindActionCreators(actionCreators, dispatch) 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象.
* 惟一会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，
* 却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它
* */
  actions: bindActionCreators(musicAction, dispatch),
  dispatch: dispatch
})

class Mymusic extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const {actions} = this.props;
    actions.getMusicList(INITIAL_PAGE)
  }
  render() {
    return (
      <View>
        <Header title="我的歌单"/>
        <MusicList musicList={this.props.musicData.musicList}/>
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mymusic)
/*函数被调用俩次，第一次是设置参数，第二次是组件与Redux store连接
* connect(mapStateToProps, mapDispatchTOProps, mergeProps)(MyComponent)
* */
const styles = StyleSheet.create({
  listCtn: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    height: 45,
    /*lineHeight: 50,*/
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headLogo: {
     width: 40,
     borderRadius: 20,
     marginRight: 10,
     color: '#ce3d3a'
  },
  more: {
    color: '#a9a9a9',
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
     marginTop: 2,
    borderRadius: 20,
    marginRight: 10,
  },
  play: {
    color: '#a9a9a9',
    borderRadius: 20,
    marginRight: 20,
  },
  returnFont: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 15,
    marginLeft: 15
  }
});
/*想要更新state中的数据，需要发起一个action，Action就是一个普通的js对象，用来描述发生了什么，action就像描述发生了什么的指示器，为了把
* action 和state串起来，开发一些函数，就是reducer.reducer只是一个接收state和action,并返回新的state的函数
* 一般来说会用store.dispatch()将action传入store
* */