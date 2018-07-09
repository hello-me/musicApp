/**
 * Created by licong on 2017/12/14.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import getReducers from './reducers';
export default function getStore(navReducer) {
return createStore(
  getReducers(navReducer),
  undefined,
  applyMiddleware(thunk)
 );
}