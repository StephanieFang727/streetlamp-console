import { Effect, Reducer } from 'umi';

import {queryCurrent, updateUserInfo, getThreshold, updateThreshold} from '@/services/user';
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
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
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
          message: 'update successfully!'
        })
      }else{
        notification.error({
          message: 'fail to update!'
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
          message: 'update successfully!'
        })
      }else{
        notification.error({
          message: 'fail to update!'
        })
      }
      yield put({
        type: 'fetchThreshold',
      });
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
        if (pathname === '/threshold') {
          dispatch({
            type: 'fetchThreshold',
          })
        }
      })
    },
  },
};

export default UserModel;
