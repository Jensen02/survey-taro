import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Header from '../../components/Header/Header'
import './survey.scss'

const Survey = () => {
  return (
    <View>
      <Header
        title='调查问卷'
        description='asdasdnaksjdjahsdkasjndasdnakjsdnajk'
        endTime='2020-03-15'
      />
    </View>
  )
}

Survey.config = {
  navigationBarTitleText: '问卷详情'
}

export default Survey