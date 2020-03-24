/* eslint-disable import/prefer-default-export */
/*
 * @Description: 工具函数
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2020-03-24 20:47:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-24 20:55:28
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