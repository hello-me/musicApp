/**
 * Created by licong on 2017/12/14.
 */
import * as types from '../../constants/actionTypes';
import musicState from '../../states/musicData'
 export default function musicData(state = musicState, action) {
  switch (action.type) {
    case types.SET_MUSICLIST: //musicList
    return {
      ...state,
      musicList: action.data
    };
    case types.SET_MUSIC:
    return {
      ...state,
      music: action.data
    }
    default:
      return state;
  }
 }