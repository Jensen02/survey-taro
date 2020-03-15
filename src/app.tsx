/* eslint-disable no-unused-vars */
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import store from './store'
import Questionnaire from './pages/questionnaire/questionnaire'
import User from './pages/user/user'
import './app.scss'
import questionnaire from './images/icon/questionnaire.png'
import questionnaireSelected from './images/icon/questionnaire_selected.png'
import user from './images/icon/user.png'
import userSelected from './images/icon/user_selected.png'

class App extends Component {
  config: Config = {
    pages: [
      'pages/questionnaire/questionnaire',
      'pages/user/user',
      'pages/create/create',
      'pages/edit/edit',
      'pages/answer/answer',
      'pages/judge/judge',
      'pages/multiple/multiple',
      'pages/radio/radio',
      'pages/survey/survey'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6190e8',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: 'WeChat'
    },
    tabBar: {
      color: '#444',
      selectedColor: '#6190e8',
      backgroundColor: '#f8f8f8',
      borderStyle: 'white',
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/questionnaire/questionnaire',
          text: '问卷广场',
          iconPath: questionnaire,
          selectedIconPath: questionnaireSelected
        },
        {
          pagePath: 'pages/user/user',
          text: '个人中心',
          iconPath: user,
          selectedIconPath: userSelected
        }
      ]
    }
  }
  render() {
    return (
      <Provider store={store} >
        <Questionnaire />
        <User />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
