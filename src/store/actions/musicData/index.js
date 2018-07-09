/**
 * Created by licong on 2017/12/14.
 */
import * as types from '../../constants/actionTypes';
import axios from 'axios';
/* 设置常量  */
// 每页页数
const PAGE_SIZE = 10
const ftechmusicList = async (currentPage) => {
  let params = {}
  params.currentPage = currentPage;
  params.pageSize = PAGE_SIZE;
  let result = await axios.get('https://api.shifeng1993.com/user/playlist?uid=32953014')
  return result
}
export const getMusicList = (currentPage) => {
  return (dispatch, getState) => {
    return ftechmusicList(currentPage).then((res) => {
      if (res.status === 200) {
        console.log('res.data', res.data)
        let musicList = {}
        if (currentPage === 1) {
          musicList = res.data.playlist
        } else {
          musicList.data = getState().musicData.musicList.data.concat(res.data.data)
          musicList.pageTotal = parseInt(res.data.pageTotal)
          musicList.currentPage = parseInt(res.data.currentPage)
          musicList.pageSize = parseInt(res.data.pageSize)
        }
        console.log('musicList', musicList)
        dispatch(setMusicList(musicList));
      } else {
        alert(res)
      }
    })
  }
}
export const setMusicList = (data) => {
  return {type: types.SET_MUSICLIST, data}
}