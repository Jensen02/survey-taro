/*
 * @Description: store
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-13 23:01:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-14 17:08:49
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import topicReducer from '../reducers/index'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

const store = createStore(topicReducer, applyMiddleware(...middlewares))

export default store
