import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './collection.scss'

const Collection = () => {
  return (
    <View>
      <Text>回收站</Text>
    </View>
  )
}

Collection.config = {
  navigationBarTitleText: '回收站'
}

export default Collection