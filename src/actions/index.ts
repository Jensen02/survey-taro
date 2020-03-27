/* eslint-disable import/prefer-default-export */
/*
 * @Description: actios
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-14 12:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-27 21:05:18
 */
import Taro from '@tarojs/taro'
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
  COLLECTION_ITEMS,
  IS_DELETE,
  IS_COLLECTION,
  COLLECTION_ID,
  DELETE_ID
} from '../contants'

// 自定义单选题
export const setRadio = (data: any) => {
  return (dispatch, getState) => {
    const { radio } = getState().topicReducer
    const payload = data.type ? [...radio, data] : []
    dispatch({
      type: RADIO_ITEM,
      payload
    })
  }
}

// 自定义多选题
export const setMultiple = (data: any) => {
  return (dispatch, getState) => {
    const { multiple } = getState().topicReducer
    const payload = data.type ? [...multiple, data] : []
    dispatch({
      type: MULTIPLE_ITEM,
      payload
    })
  }
}

// 自定义判断题
export const setJudge = (data: any) => {
  return (dispatch, getState) => {
    const { judge } = getState().topicReducer
    const payload = data.type ? [...judge, data] : []
    dispatch({
      type: JUDGE_ITEM,
      payload
    })
  }
}

// 自定义简答题
export const setAnswer = (data: any) => {
  return (dispatch, getState) => {
    const { answer } = getState().topicReducer
    const payload = data.type ? [...answer, data] : []
    dispatch({
      type: ANSWER_ITEM,
      payload
    })
  }
}

// 选择模板单选题
export const setRadioWithTemplete = (data: any) => {
  return {
    type: RADIO_ITEM,
    payload: data
  }
}

// 选择模板多选题
export const setMultipleWithTemplete = (data: any) => {
  return {
    type: MULTIPLE_ITEM,
    payload: data
  }
}

// 选择模板判断题
export const setJudgeWithTemplete = (data: any) => {
  return {
    type: JUDGE_ITEM,
    payload: data
  }
}

// 选择模板简答题
export const setAnswerWithTemplete = (data: any) => {
  return {
    type: ANSWER_ITEM,
    payload: data
  }
}

// 设置用户信息
export const setUserInfo = (data) => {
  return {
    type: USER_INFO,
    payload: data
  }
}

// 设置用户登录状态
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

// 设置已创建问卷
export const setCreateItem = (data) => {
  return {
    type: CREATE_ITEM,
    payload: data
  }
}

// 设置已发布问卷
export const setPublicItem = (data) => {
  return {
    type: PUBLIC_ITEM,
    payload: data
  }
}

// 设置已结束问卷
export const setFinishItem = (data) => {
  return {
    type: FINISH_ITEM,
    payload: data
  }
}

// 设置回收站问卷
export const setCollections = (data) => {
  return {
    type: COLLECTION_ITEMS,
    payload: data
  }
}

// 打开或关闭回收问卷modal
export const setIsCollection = (data) => {
  return {
    type: IS_COLLECTION,
    payload: data
  }
}

// 打开或关闭删除问卷modal
export const setIsDelete = (data) => {
  return {
    type: IS_DELETE,
    payload: data
  }
}

// 设置要回收问卷的id
export const setCollectionId = (data) => {
  return {
    type: COLLECTION_ID,
    payload: data
  }
}

// 设置要删除问卷的id
export const setDeleteId = (data) => {
  return {
    type: DELETE_ID,
    payload: data
  }
}

// 获取已创建问卷
export const getCreateItem = () => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/state',
      data: {
        state: 'create'
      },
      method: 'GET'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(setCreateItem(res.data.data))
      }
    })
  }
}

// 获取已发布问卷
export const getPublicItem = () => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/state',
      data: {
        state: 'public'
      },
      method: 'GET'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(setPublicItem(res.data.data))
      }
    })
  }
}

// 获取已结束问卷
export const getFinishItem = () => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/state',
      data: {
        state: 'finish'
      },
      method: 'GET'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(setFinishItem(res.data.data))
      }
    })
  }
}

// 获取已回收问卷
export const getCollection = () => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/query/all',
      data: {},
      method: 'GET'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(setCollections(res.data.data))
      }
    })
  }
}

// 删除已回收问卷
export const deleteQuestionnaire = (id) => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/delete',
      data: {
        id
      },
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(getCollection())
      }
    })
  }
}

// 还原已回收问卷
export const recoverQuestionnaire = (id) => {
  return (dispatch: any) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/recover',
      data: {
        id
      },
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(getCollection())
        dispatch(getCreateItem())
        dispatch(getFinishItem())
        dispatch(getFinishItem())
      }
    })
  }
}