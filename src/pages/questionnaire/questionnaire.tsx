import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import icon1 from '../../images/icon/icon1.png'
// import icon2 from '../../images/icon/icon2.png'
import icon3 from '../../images/icon/icon3.png'
import icon4 from '../../images/icon/icon4.png'
import icon5 from '../../images/icon/icon5.png'
import icon6 from '../../images/icon/icon6.png'
import icon7 from '../../images/icon/icon7.png'
import icon8 from '../../images/icon/icon8.png'
import icon9 from '../../images/icon/icon9.png'
import icon10 from '../../images/icon/icon10.png'
import icon11 from '../../images/icon/icon11.png'

function Questionnaire () {
  const data = [
      {
        image: icon1,
        value: '自定义问卷',
        type: 'customize'
      },
      {
        image: icon3,
        value: '大学生',
        type: 'student'
      },
      {
        image: icon4,
        value: '企业调查类',
        type: 'enterprise'
      },
      {
        image: icon5,
        value: '市场调查类',
        type: 'market'
      },
      {
        image: icon6,
        value: '社会调查类',
        type: 'society'
      },
      {
        image: icon7,
        value: '教育类',
        type: 'educate'
      },
      {
        image: icon8,
        value: '行业调查类',
        type: 'trade'
      },
      {
        image: icon9,
        value: '餐饮类',
        type: 'food'
      },
      {
        image: icon10,
        value: '电子产品类',
        type: 'electron'
      },
      {
        image: icon11,
        value: '旅游类',
        type: 'tour'
      }
    ]
  
  const handleClick = (item: object, index: number) => {
    console.log('item: ', item, 'index: ', index)
    index === 0 && Taro.navigateTo({
      url: '/pages/create/create'
    })
  }
  return (
    <View>
      <AtGrid data={data} onClick={handleClick} />
    </View>
  )
}

Questionnaire.config = {
  navigationBarTitleText: '问卷广场',
}

export default Questionnaire