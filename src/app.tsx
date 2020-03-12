/* eslint-disable no-unused-vars */
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
// import counterStore from './store/counter'
import Questionnaire from './pages/questionnaire/questionnaire'
import User from './pages/user/user'
import './app.scss'
import questionnaire from '../public/icon/questionnaire.png'
import questionnaireSelected from '../public/icon/questionnaire_selected.png'
import user from '../public/icon/user.png'
import userSelected from '../public/icon/user_selected.png' 

const store = {
  // counterStore
}

class App extends Component {
  config: Config = {
    pages: [
      'pages/questionnaire/questionnaire',
      'pages/user/user'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'WeChat'
    },
    tabBar: {
      color: '#444',
      selectedColor: '#6190e8',
      backgroundColor: '#fff',
      borderStyle: 'black',
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

// App.config = {
//   pages: [
//     'pages/questionnaire/questionnaire',
//     'pages/user/user'
//   ],
//   window: {
//     backgroundTextStyle: 'light',
//     navigationBarBackgroundColor: '#fff',
//     navigationBarTextStyle: 'black',
//     navigationBarTitleText: 'WeChat'
//   },
//   tabBar: {
//     color: '#444',
//     selectedColor: '#6190e8',
//     backgroundColor: '#fff',
//     borderStyle: 'block',
//     position: 'bottom',
//     list: [
//       {
//         pagePath: 'pages/questionnaire/questionnaire',
//         text: '问卷广场',
//         iconPath: '../public/icon/questionnaire.png',
//         selectedIconPath: '../public/icon/questionnaire_selected.png'
//       },
//       {
//         pagePath: 'pages/user/user',
//         text: '个人中心',
//         iconPath: '../public/icon/user.png',
//         selectedIconPath: '../public/icon/user_selected.png'
//       }
//     ]
//   }
// }

Taro.render(<App />, document.getElementById('app'))
