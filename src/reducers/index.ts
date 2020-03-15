/*
 * @Description: 
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-14 17:52:42
 */
import { combineReducers } from 'redux'
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM
} from '../contants'

interface Topic {
  radio: any[],
  multiple: any[],
  judge: any[],
  answer: any[]
}

const INIT_STATE: Topic = {
  radio: [],
  multiple: [],
  judge: [],
  answer: []
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