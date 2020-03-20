import Taro, { useReducer } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTextarea, AtInput, AtButton, AtMessage } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { setRadio } from '../../actions/index'
import './radio.scss'

const Radio = () => {
  const reducer = (state, action) => {
    switch(action.type) {
      case 'problem':
        return { ...state, problem: action.payload }
        break
      case 'a':
        return {...state, aContent: action.payload}
        break
      case 'b':
        return {...state, bContent: action.payload}
        break
      case 'c':
        return {...state, cContent: action.payload}
        break
      case 'd':
        return {...state, dContent: action.payload}
        break
      default: return { ...state }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    type: 'radio',
    problem: '',
    aContent: '',
    bContent: '',
    cContent: '',
    dContent: ''
  })
  const uDispatch = useDispatch()

  const handleClick = (data) => {
    for (let value of Object.values(state)) {
      if (value === '') {
        Taro.atMessage({
          'message': '所有选项不能为空',
          'type': 'warning'
        })
        return
      }
    }
    uDispatch(setRadio(data))
    Taro.navigateBack()
  }

  return (
    <View>
      <AtMessage />
      <View className='item'>
        <View>
          <Text className='market'>*</Text>
          <Text className='title'>标题</Text>
        </View>
        <AtTextarea
          maxLength={50}
          height={50}
          placeholder='请输入标题'
          value={state.problem}
          onChange={(e) => dispatch({ type: 'problem', payload: (e.target as any).value })}
        />
      </View>
      <View className='content'>
        <Text className='title'>选项内容</Text>
        <AtInput
          name='a'
          placeholder='选项一'
          value={state.aContent}
          onChange={(_, e) => dispatch({ type: 'a', payload: (e.target as any).value })}
        />
        <AtInput
          name='b'
          placeholder='选项二'
          value={state.bContent}
          onChange={(_, e) => dispatch({ type: 'b', payload: (e.target as any).value })}
        />
        <AtInput
          name='c'
          placeholder='选项三'
          value={state.cContent}
          onChange={(_, e) => dispatch({ type: 'c', payload: (e.target as any).value })}
        />
        <AtInput
          name='d'
          placeholder='选项四'
          value={state.dContent}
          onChange={(_, e) => dispatch({ type: 'd', payload: (e.target as any).value })}
        />
      </View>
      <AtButton type='primary' className='btn' onClick={() => handleClick(state)}>确定</AtButton>
    </View>
  )
}

Radio.config = {
  navigationBarTitleText: '单选题'
}

export default Radio