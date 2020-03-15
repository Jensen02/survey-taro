/* eslint-disable import/prefer-default-export */
/*
 * @Description: 
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-14 18:05:09
 */
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM
} from '../contants'

export const setRadio = (data: any) => {
  return (dispatch, getState) => {
    const { radio } = getState().topicReducer
    // radio.push(data)
    dispatch({
      type: RADIO_ITEM,
      payload: [...radio, data]
    })
  }
  // return {
  //   type: RADIO_ITEM,
  //   payload: data
  // }
}

export const setMultiple = (data: any) => {
  return (dispatch, getState) => {
    const { multiple } = getState()
    multiple.push(data)
    dispatch({
      type: MULTIPLE_ITEM,
      payload: multiple
    })
  }
}
export const setJudge = (data: any) => {
  return (dispatch, getState) => {
    const { answer } = getState()
    answer.push(data)
    dispatch({
      type: ANSWER_ITEM,
      payload: answer
    })
  }
}
export const setAnswer = (data: any) => {
  return (dispatch, getState) => {
    const { judge } = getState()
    judge.push(data)
    dispatch({
      type: JUDGE_ITEM,
      payload: judge
    })
  }
}