/* eslint-disable import/prefer-default-export */
/*
 * @Description: actios
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-25 11:57:10
 */
import {
  RADIO_ITEM,
  MULTIPLE_ITEM,
  JUDGE_ITEM,
  ANSWER_ITEM,
  USER_INFO,
  USER_IS_LOGIN,
  QUESTION_ITEM,
  CREATE_ITEM,
  FINISH_ITEM,
  PUBLIC_ITEM,
  COLLECTION_ITEMS
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

export const setRadioWithTemplete = (data: any) => {
  return {
    type: RADIO_ITEM,
    payload: data
  }
}

export const setMultipleWithTemplete = (data: any) => {
  return {
    type: MULTIPLE_ITEM,
    payload: data
  }
}
export const setJudgeWithTemplete = (data: any) => {
  return {
    type: JUDGE_ITEM,
    payload: data
  }
}
export const setAnswerWithTemplete = (data: any) => {
  return {
    type: ANSWER_ITEM,
    payload: data
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

export const setQuestion = (data) => {
  return {
    type: QUESTION_ITEM,
    payload: data
  }
}

export const setCreateItem = (data) => {
  return {
    type: CREATE_ITEM,
    payload: data
  }
}

export const setPublicItem = (data) => {
  return {
    type: PUBLIC_ITEM,
    payload: data
  }
}

export const setFinishItem = (data) => {
  return {
    type: FINISH_ITEM,
    payload: data
  }
}

export const setCollections = (data) => {
  return {
    type: COLLECTION_ITEMS,
    payload: data
  }
}