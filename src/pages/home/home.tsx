import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import icon1 from '../../images/icon/diaocha.png'
import icon2 from '../../images/icon/vote.png'
import './home.scss'

const data = [
  {
    image: icon1,
    value: '调查',
    type: 'look'
  },
  {
    image: icon2,
    value: '投票',
    type: 'vote'
  },
]

const handleClick = (item: any, index: number) => {
  console.log('item: ', item, 'index: ', index)
  if (index === 0) {
      Taro.navigateTo({
      url: '/pages/questionnaire/questionnaire'
    })
  }
}

const Home = () => {
  return (
    <View>
      <AtGrid data={data} onClick={handleClick} />
    </View>
  )
}

Home.config = {
  navigationBarTitleText: '首页'
}

export default Home