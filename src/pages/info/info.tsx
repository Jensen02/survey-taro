import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import './info.scss'

const Info = () => {
  return (
    <View className='info'>
      <Text>问卷信息统计</Text>
      <View className='change__btn'>
        <AtFab className='fab__left'>
          <Text className='at-fab__icon at-icon at-icon-chevron-left'></Text>
        </AtFab>
        <AtFab className='fab__right'>
          <Text className='at-fab__icon at-icon at-icon-chevron-right'></Text>
        </AtFab>
      </View>
    </View>
  )
}

Info.config = {
  navigationBarTitleText: '问卷信息统计'
}

export default Info