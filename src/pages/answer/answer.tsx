import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtDivider } from 'taro-ui'
import './answer.scss'

const Answer = () => {
  return (
    <View>
      <Text>简答题</Text>
    </View>
  )
}

Answer.config = {
  navigationBarTitleText: '简答题'
}

export default Answer