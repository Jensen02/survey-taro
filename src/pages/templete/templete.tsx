import Taro, { useRouter } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Card from '@/components/Card/Card'
import './templete.scss'

const Templete = () => {
  const router = useRouter()
  const { type } = router.params

  return (
    <View>
      <Text>{ type }</Text>
      <Card />
      <Card />
      <Card />
    </View>
  )
}

Templete.config = {
  navigationBarTitleText: '模板列表'
}

export default Templete