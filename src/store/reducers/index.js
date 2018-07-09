/**
 * Created by licong on 2017/12/14.
 */
import {combineReducers} from 'redux';
import musicData from './musicData'
 const reducers = {
   musicData
 };
 // 和导航相关的reducer 通过调用出传递进去
 export default function getReducers(navReducer) {
   return combineReducers({
     ...reducers,
     nav: navReducer
   });
 }
