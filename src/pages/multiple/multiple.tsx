import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtDivider } from 'taro-ui'
import './multiple.scss'

const Multiple = () => {
  return (
    <View>
      <Text>多选题</Text>
    </View>
  )
}

Multiple.config = {
  navigationBarTitleText: '多选题'
}

export default Multiple