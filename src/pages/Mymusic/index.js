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
// import musicData from '../../store/states/musicData'
import Icon from 'react-native-vector-icons/Ionicons';
// 常量设置
const INITIAL_PAGE = 1;
class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
      modalVisible: false
    }
  }

  _onPressList = (param) => {
  };
  _keyExtractor = (item, index) => index;
   _renderItem = (item) => {
   return (
   <View style={styles.listCtn}>
   <Icon style={styles.headLogo} name="ios-musical-notes" size={28}/>
   <View style={{flex: 1}}>
   <Text style={[styles.name, {color: '#000'}]}>{item.item.name}</Text>
   </View>
     <TouchableNativeFeedback
       onPress={() => navigation.navigate('Main', {title: '音乐播放'})}
       background={TouchableNativeFeedback.SelectableBackground()}>
       <Icon  style={styles.play} name="ios-play-outline" size={25}/>
     </TouchableNativeFeedback>
     <TouchableNativeFeedback
       onPress={() => navigation.navigate('Main')}
       background={TouchableNativeFeedback.SelectableBackground()}>
   <Icon  style={styles.more} name="ios-more" size={28}/>
     </TouchableNativeFeedback>
   </View>
   )
   }

  render() {
   const {musicList} = this.props
   return (
   <FlatList
   data={musicList}
   // renderItem={({item}) => <Text>{item.name}</Text>}
   renderItem={this._renderItem}
   />
   )
   }

  _onRefresh = () => {
    this.setState({
      isRefresh: true
    });
    setTimeout(() => {
      this.setState({
        isRefresh: false,
        modalVisible: true
      })
    }, 1000)
  };
  _closeModal = () => {
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
    }, 1000)
  }
}
const mapStateToProps = state => {
//  console.log('state', state)
  return {musicData: state.musicData};
}
// 同步store中的action
const mapDispatchToProps = (dispatch) => ({
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