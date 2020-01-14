/*
 * @Description: 
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-13 23:01:20
 * @LastEditors: 
 * @LastEditTime: 2019-12-13 23:23:56
 */
import { observable } from 'mobx'

const counterStore = observable({
  counter: 0,
  counterStore() {
    this.counter++
  },
  increment() {
    this.counter++
  },
  decrement() {
    this.counter--
  },
  incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
})
export default counterStore