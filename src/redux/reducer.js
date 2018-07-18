
import { combineReducers } from 'redux';
import { TYPE } from './actions';

const currentPlay = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_ID:
            return {...state, id: action.id};
        case TYPE.SET_PLAY_SONG:
            return {...state, ...action.song};
        default:
            return {...state};
    }
};

const currentPlayVideo = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_VIDEO:
            return {...state, ...action.video};
        default:
            return {...state};
    }
};

export default combineReducers({
    currentPlay,
    currentPlayVideo,
})
/*combineReducers()所做的是生成一个函数，这个函数来调用你的一系列reducer,每个reducer根据它们的
* key值来筛选出state的一部分数据并处理，然后这个生成的函数再将所有的reducer的结果合并成一个大的对象，
* 正如其他的reducers,如果combineReducers()中包含的所有reducers都没有更新state，那么也就不会创建一个新的对象*/
/*数据流 dispatch进行分发
* 项目结构
* */