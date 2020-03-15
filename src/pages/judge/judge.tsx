import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtDivider } from 'taro-ui'
import './judge.scss'

const Judge = () => {
  return (
    <View>
      <Text>判断题</Text>
    </View>
  )
}

Judge.config = {
  navigationBarTitleText: '判断题'
}

export default Judge