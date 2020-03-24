/*
 * @Description: reducers
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-24 23:27:03
 */
import { combineReducers } from 'redux'
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM,
  USER_INFO,
  USER_IS_LOGIN,
  QUESTION_ITEM,
  CREATE_ITEM,
  PUBLIC_ITEM,
  FINISH_ITEM
} from '../contants'

interface Topic {
  radio: any[],
  multiple: any[],
  judge: any[],
  answer: any[],
  number: number,
  userInfo: object,
  isLogin: boolean,
  question: object,
  createItem: any[],
  publicItem: any[],
  finishItem: any[]
}

const INIT_STATE: Topic = {
  radio: [],
  multiple: [],
  judge: [],
  answer: [],
  number: 0,
  userInfo: {},
  isLogin: false,
  question: {},
  createItem: [],
  publicItem: [],
  finishItem: []
}

const topicReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action
  console.log('type: ', type, 'payload: ', payload)
  switch(type) {
    case RADIO_ITEM:
      return {
        ...state,
        radio: payload
      }
      break
    case MULTIPLE_ITEM:
      return {
        ...state,
        multiple: payload
      }
      break
    case JUDGE_ITEM:
      return {
        ...state,
        judge: payload
      }
      break
    case ANSWER_ITEM:
      return {
        ...state,
        answer: payload
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
    case QUESTION_ITEM:
      return {
        ...state,
        question: payload
      }
    case CREATE_ITEM:
      return {
        ...state,
        createItem: payload
      }
    case PUBLIC_ITEM:
      return {
        ...state,
        publicItem: payload
      }
    case FINISH_ITEM:
      return {
        ...state,
        finishItem: payload
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