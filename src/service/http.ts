/*
 * @Description: 封装请求函数
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-16 13:40:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-17 00:03:16
 */
import Taro from '@tarojs/taro'

/**
 * @description: 封装请求函数
 * @param {object} params 请求的api、data、method
 * @return: 服务端的响应数据
 */
const request = (params) => {
  // let response
  const { api, data, method } = params
  const url = `https://www.zhaosongsong.cn/api/v1${api}`
  Taro.request({
    url,
    data,
    method
  })
  .then((res) => {
    console.log('http: ', res)
    return res
  })
  .catch(() => {
  })
  // return response
}

export default request