/* eslint-disable import/prefer-default-export */
/*
 * @Description: actios
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-17 23:00:16
 */
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM,
  USER_INFO,
  USER_IS_LOGIN
} from '../contants'

export const setRadio = (data: any) => {
  return (dispatch, getState) => {
    const { radio } = getState().topicReducer
    dispatch({
      type: RADIO_ITEM,
      payload: [...radio, data]
    })
  }
}

export const setMultiple = (data: any) => {
  return (dispatch, getState) => {
    const { multiple } = getState().topicReducer
    dispatch({
      type: MULTIPLE_ITEM,
      payload: [...multiple, data]
    })
  }
}
export const setJudge = (data: any) => {
  return (dispatch, getState) => {
    const { judge } = getState().topicReducer
    dispatch({
      type: JUDGE_ITEM,
      payload: [...judge, data]
    })
  }
}
export const setAnswer = (data: any) => {
  return (dispatch, getState) => {
    const { answer } = getState().topicReducer
    dispatch({
      type: ANSWER_ITEM,
      payload: [...answer, data]
    })
  }
}

export const setUserInfo = (data) => {
  return {
    type: USER_INFO,
    payload: data
  }
}

export const setUserIsLogin = (data) => {
  return {
    type: USER_IS_LOGIN,
    payload: data
  }
}