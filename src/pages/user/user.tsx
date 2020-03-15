import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

function User () {
  return (
    <View>
      <Text>
        个人中心
      </Text>
    </View>
  )
}

User.config = {
  navigationBarTitleText: '个人中心',
}

export default User

