/**
 * Created by licong on 2017/12/26.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image,  TouchableOpacity, Animated, Easing, ScrollView, Slider} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../../utils';
import { connect } from 'react-redux';
import {TextTool, Separator, ModalMenu, MenuRow} from '../../widgets'
import { setPlayId, setPlaySong } from '../../redux/actions';
import { SONG_DETAIL, SONG_LYRIC } from '../../api';

const { Normal, Tip, H3 } = TextTool;
 class PlayerScene extends Component {
  static navigationOptions = ({navigation}) => ({
    header: <View style={{width: 0, height: 0}} />,
  });
  constructor () {
  super();/*在使用‘this’之前，必须先调用super(),否则，将导致引用错误*/
  this.state = {
   detail: {},
   lyric: '',
   lyricArr: [],
   currentLrc: '',
   showLyic: false,
   lyricScroll: 0
  };
  this.animatedValue = new Animated.Value(0);
  this.animatedTop = new Animated.Value(0);
  }
   componentDidMount() {
    // const { currentPlayId } = this.props.navigation.state.params;
    console.log('a', this.props.navigation.state.params.id)
     const currentPlayId = this.props.navigation.state.params.id
     this.songDetail(currentPlayId);
     this.songLyric(currentPlayId);
   }
  circling = () => {
  this.animatedValue.setValue(0);
  Animated.timing(this.animatedValue, {
    toValue: 1,
    duration: 12000,
    easing: Easing.linear
  }).start(() => this.circling());
  };
  topAnimate = (start = 0, end = 1) => {
   this.animatedTop.setValue(start);
   Animated.timing(this.animatedTop, {
   toValue: end,
   duration: 150,
   easing: Easing.linear
   }).start();
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  songDetail = id => {
  try {
    (
     async () => {
     const res = await fetch(SONG_DETAIL + id);
      const detail = (await res.json()).songs[0];
      console.log('detail', detail)
      this.setState({
        detail
      });
      this.props.navigation.setParams({name: detail.name, artists: detail.ar.map(v => v.name).join('、')});
      this.circling();
     }
     )();
    } catch (err) {
     alert(err);
    }
  };
  songLyric = id => {
  try {
    (
     async () => {
      const lyRes = await fetch(SONG_LYRIC+ id);
      const lyric = (await lyRes.json()).lrc.lyric;
      const　lyricArr = lyric.split(/\n/);
      this.setState({
      lyric,
      lyricArr
      });
     }
    )();
  } catch (err) {
      alert(err);
    }
  };
  sliderChange = value => {
  const {currentPlay, dispatch} = this.props;
  dispatch(setPlaySong({sliderProgress: value, ff: currentPlay.duration * value}));
  };
  showLyric = () => {
    this.setState({
    showLyic: !this.state.showLyic
    })
  };
  render() {
  const interpolatedAnimation = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg','360deg']
  });
    const {detail, currentLrc, showLyic, lyricArr} = this.state;
    const {params} = this.props.navigation.state;
    const {currentPlay} = this.props;
    return (
    <View style={styles.container}>
      <Image style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.8}} blurRadius={8} source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}} />
      <View style={{zIndex: 5, flex: 1}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="ios-arrow-back-outline" size={25} color={color.white} />
          </TouchableOpacity>
          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Normal color={color.white}>{params.name}</Normal>
            <Tip color={color.white} style={{fontSize: 9}}>{params.artists}</Tip>
          </View>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="ios-redo-outline" size={25} color={color.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cdContainer} onPress={this.showLyric}>
          {
            showLyic ? (
              <View style={styles.cdContainer}>
                <ScrollView style={{width: screen.width}} contentContainerStyle={{alignItems: 'center', paddingTop: '30%', paddingBottom: '30%'}} ref={lyricScroll => this.lyricScroll = lyricScroll}>
                  {
                    lyricArr.map((v, i) => (
                      <Normal color={v === currentLrc ? color.theme : color.white} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>
                    ))
                  }
                </ScrollView>

              </View>
            ) : (
              <View style={styles.cdContainer}>
                <View style={{position: 'absolute', top: 0, left: 34, width: screen.width, alignItems: 'center', zIndex: 18}}>
                  <Image source={require('../../imgs/img/needle-ip6.png')} style={{width: 100, height: 140}}/>
                </View>
                <Image source={require('../../imgs/img/disc-ip6.png')} style={{width: screen.width - 40, height: screen.width - 40, justifyContent: 'center', alignItems: 'center'}}/>
                <Animated.Image
                  source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}}
                  style={[{position: 'absolute', top: 115, left: 55, width: screen.width - 152, height: screen.width - 152, borderRadius: (screen.width - 152) / 2}, {transform: [
                    {rotate: interpolatedAnimation},
                  ]}]}
                />
              </View>
            )
          }
        </TouchableOpacity>
        <View style={styles.topBtn}>
          <TouchableOpacity onPress={() => this.lyricScroll.scrollTo({x: 0, y: 10, animated: true})}>
            <Icon name="ios-heart-outline" size={25} color={color.white} />
          </TouchableOpacity>
          <Icon name="ios-cloud-download-outline" size={25} color={color.white} />
          <Icon name="ios-chatbubbles-outline" size={25} color={color.white} />
          <Icon name="md-more" size={25} color={color.white} />
        </View>
        <View style={styles.sliderBtn}>
          <Tip style={{width: 35}} color={color.white}>1:00</Tip>
          <Slider
            maximumTrackTintColor={color.white}
            minimumTrackTintColor={color.theme}
            thumbStyle={styles.thumb}
            trackStyle={{height: 2}}
            style={{width: screen.width - 100}}
            value={currentPlay.sliderProgress}
            onValueChange={value => this.sliderChange(value)}
          />
          <Tip style={{width: 35}} color="#ffffff">4:00</Tip>
        </View>
        <View style={styles.footerBtn}>
          <Icon name="ios-repeat-outline" size={30} color={color.white} />
          <Icon name="ios-skip-backward-outline" size={30} color={color.white} />
          <Icon name="ios-play-outline" size={30} color={color.white} />
          <Icon name="ios-skip-forward-outline" size={30} color={color.white} />
          <Icon name="ios-list-outline" size={30} color={color.white} />
        </View>
      </View>
    </View>
    )
  }
}
const styles = StyleSheet.create({
      container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
      headerContainer: {
      height: 50,
      width: screen.width,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: '#e0e0e0',
      borderBottomWidth: screen.onePixel
    },
      cdContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
      topBtn: {
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
      sliderBtn: {
      height: 40,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
      thumb: {
      width: 20,
      height: 20,
      backgroundColor: color.theme,
      borderColor: color.white,
      borderWidth: 7,
      borderRadius: 10,
    },
      footerBtn: {
      height: 50,
      width: screen.width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    }
});
const mapStateToProps = (currentPlay) => ({
      currentPlayId: currentPlay.id,
      currentPlay
});
export default connect(mapStateToProps)(PlayerScene)