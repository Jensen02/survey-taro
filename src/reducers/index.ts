/*
 * @Description: reducers
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-18 01:43:58
 */
import { combineReducers } from 'redux'
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM,
  USER_INFO,
  USER_IS_LOGIN
} from '../contants'

interface Topic {
  radio: any[],
  multiple: any[],
  judge: any[],
  answer: any[],
  number: number,
  userInfo: object,
  isLogin: boolean
}

const INIT_STATE: Topic = {
  radio: [],
  multiple: [],
  judge: [],
  answer: [],
  number: 0,
  userInfo: {},
  isLogin: false
}

const topicReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action
  console.log('type: ', type, 'payload: ', payload)
  switch(type) {
    case RADIO_ITEM:
      return {
        ...state,
        radio: payload,
        number: state.number + 1
      }
      break
    case MULTIPLE_ITEM:
      return {
        ...state,
        multiple: payload,
        number: state.number + 1
      }
      break
    case JUDGE_ITEM:
      return {
        ...state,
        judge: payload,
        number: state.number + 1
      }
      break
    case ANSWER_ITEM:
      return {
        ...state,
        answer: payload,
        number: state.number + 1
      }
      break
    case USER_INFO:
      return {
        ...state,
        userInfo: payload
      }
    case USER_IS_LOGIN:
      return {
        ...state,
        isLogin: payload
      }
    default:
      return {
        ...state
      }
      break
  }
}

export default combineReducers({
  topicReducer
})