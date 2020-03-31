/* eslint-disable import/prefer-default-export */
/*
 * @Description: 工具函数
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-24 20:47:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-31 17:11:28
 */

/**
 * @description: 将获取到的服务端数据按照类型分类
 * @param {type} 
 * @return: 
 */
export const classifyQuestionItem = (data: [], type: string) => {
  if (!data.length || !type.length) {
    return []
  }

  const result = data.map((item) => {
    if (item['type'] === type) {
      return item
    }
    return
  })

  return result
}

/**
 * @description: 将map转换为object
 * @param {Map} map 为需要转换的map对象
 * @return: object
 */
export const convertMapToObject = (map: any) => {
  if (map.size === 0) {
    return {}
  }
  const result = Object.create(null)
  for (const [key, value] of map) {
    result[key] = value
  }
  return result
}