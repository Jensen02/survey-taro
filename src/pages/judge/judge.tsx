import Taro, { useReducer } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtMessage, AtTextarea, AtButton, AtInput } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import { setJudge } from '../../actions'
import './judge.scss'

const Judge = () => {
  const reducer = (state, action) => {
    switch(action.type) {
      case 'problem':
        return { ...state, problem: action.payload }
        break
      case 'a':
        return {...state, a_content: action.payload}
        break
      case 'b':
        return {...state, b_content: action.payload}
        break
      default: return { ...state }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    type: 'judge',
    problem: '',
    a_content: '',
    b_content: ''
  })
  const uDispatch = useDispatch()

  const handleClick = (data) => {
    for (let [key, value] of Object.entries(state)) {
      console.log('length: ', String(value).length)
      if (value === '' || (key !== 'problem' && String(value).length > 6)) {
        Taro.atMessage({
          'message': '所有选项不能为空且每项内容字符数量不能多余6位',
          'type': 'warning'
        })
        return
      }
    }
    uDispatch(setJudge(data))
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
          value={state.a_content}
          onChange={(_, e) => dispatch({ type: 'a', payload: (e.target as any).value })}
        />
        <AtInput
          name='b'
          placeholder='选项二'
          value={state.b_content}
          onChange={(_, e) => dispatch({ type: 'b', payload: (e.target as any).value })}
        />
      </View>
      <AtButton type='primary' className='btn' onClick={() => handleClick(state)}>确定</AtButton>
    </View>
  )
}

Judge.config = {
  navigationBarTitleText: '判断题'
}

export default Judge