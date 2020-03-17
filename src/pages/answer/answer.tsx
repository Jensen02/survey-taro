import Taro, { useReducer } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtMessage, AtTextarea, AtButton } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { setAnswer } from '../../actions'
import './answer.scss'

const Answer = () => {
  const reducer = (state, action) => {
    switch(action.type) {
      case 'problem':
        return { ...state, problem: action.payload }
        break
      default: return { ...state }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    type: 'answer',
    problem: ''
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
    uDispatch(setAnswer(data))
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
      <AtButton type='primary' className='btn' onClick={() => handleClick(state)}>确定</AtButton>
    </View>
  )
}

Answer.config = {
  navigationBarTitleText: '简答题'
}

export default Answer