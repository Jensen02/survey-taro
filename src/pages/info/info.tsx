import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './info.scss'

const Info = () => {
  return (
    <View>
      <Text>问卷信息统计</Text>
    </View>
  )
}

Info.config = {
  navigationBarTitleText: '问卷信息统计'
}

export default Info