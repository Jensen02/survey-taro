import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '@/components/Card/Card'
import './templete.scss'



const Templete = () => {
  const router = useRouter()
  const { type } = router.params

  return (
    <View>
      <Card
        qId='sdgdsfgdsfgsd34f34fdf3rr3d'
        type='templete'
        titleItem='关于元宵节的调查'
        content='这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段sdfsdfgsd'
      />
    </View>
  )
}

Templete.config = {
  navigationBarTitleText: '模板列表'
}

export default Templete