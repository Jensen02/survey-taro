import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import Card from '@/components/Card/Card'
import { getTempletesWithType } from '../../actions'
import './templete.scss'

const dispatch = useDispatch()
// dispatch(getTempletesWithType())

const Templete = () => {
  dispatch(getTempletesWithType())
  const { templetes } = useSelector((state: any) => state.topicReducer)
  return (
    <View>
      {
        templetes && templetes.map((item) => {
          const { id, title, description } = item
          return (
            <Card
              qId={id}
              key={id}
              type='templete'
              titleItem={title}
              content={description}
            />
          )
        })
      }
    </View>
  )
}

Templete.config = {
  navigationBarTitleText: '模板列表'
}

export default Templete