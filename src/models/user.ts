import { Effect, Reducer } from 'umi';

import {queryCurrent, updateUserInfo, getThreshold,
  updateThreshold,updateLightStatus} from '@/services/user';
import {notification} from "antd";
import {Subscription} from "@@/plugin-dva/connect";

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
  threshold?: object;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
  //  fetch: Effect;
    fetchCurrent: Effect;
    updateUserInfo: Effect;
    fetchThreshold: Effect;
    updateThreshold: Effect;
    updateLightStatus:Effect;
  };
  reducers: {
    save: Reducer;
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };

  subscriptions:{
    setup: Subscription;
  }
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent({payload:{ userid }}, { call, put }) {
      const response = yield call(queryCurrent, userid);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchThreshold(_, { call, put }) {
      const response = yield call(getThreshold);
      yield put({
        type: 'save',
        threshold: response.data[0],
      });
    },
    *updateUserInfo({payload},{call, put}){
      const response = yield call(updateUserInfo, payload);
      if (response.status==='success'){
        notification.success({
          message: '更新成功!'
        })
      }else{
        notification.error({
          message: '更新失败!'
        })
      }
      yield put({
        type: 'fetchCurrent',
        payload: { userid: payload.userid },
      });
    },
    *updateThreshold({payload},{call, put}){
      const response = yield call(updateThreshold, payload);
      if (response.status==='success'){
        notification.success({
          message: '更新成功！'
        })
      }else{
        notification.error({
          message: '更新失败！'
        })
      }
      yield put({
        type: 'fetchThreshold',
      });
    },
    *updateLightStatus({id, state},{call,put}){
      const payload = {
        light_id: id,
        light_status: state,
      }
      const response = yield call(updateLightStatus,payload);
      const mes = state ? '开启' : '关闭';
      if (response.status==='success'){
        notification.success({
          message: `路灯${mes}成功！`
        })
      }else{
        notification.error({
          message: `路灯${mes}失败！`
        })
      }
    }
  },

  reducers: {
    save(state, action){
      return{
        ...state,
        ...action,
      }
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data[0]|| {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/setting') {
          dispatch({
            type: 'fetchThreshold',
          })
        }
      })
    },
  },
};

export default UserModel;
