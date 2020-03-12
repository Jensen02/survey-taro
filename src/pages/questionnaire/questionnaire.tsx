import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

function Questionnaire () {
  return (
    <View>
      <Text>
        问卷广场
      </Text>
    </View>
  )
}

Questionnaire.config = {
  navigationBarBackgroundColor: '#6190e8',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '问卷广场',
  
}

export default Questionnaire