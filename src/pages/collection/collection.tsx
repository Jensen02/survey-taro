import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { useDispatch, useSelector } from '@tarojs/redux'
import {
  AtActionSheet,
  AtActionSheetItem,
  AtModal,
  AtModalContent,
  AtModalAction,
  AtMessage
} from "taro-ui"
import Card from '@/components/Card/Card'
import { getCollection } from '../../actions'
import './collection.scss'

const dispatch = useDispatch()

dispatch(getCollection())

const Collection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { collections }  = useSelector((state: any) => state.topicReducer)

  return (
    <View className='collection'>
      <View className='collection__items'>
        {
          collections && collections.map((item, index) => {
            const { id, title, description } = item
            return (
              <Card
                key={index}
                qId={id}
                titleItem={title}
                content={description}
                type='collection'
              />
            )
          })
        }
      </View>
      <AtMessage />
      <AtModal isOpened>
        <AtModalContent>
          该删除操作将无法进行还原，请确定是否进行删除？
        </AtModalContent>
        <AtModalAction>
          <Button>取消</Button>
          <Button>确定</Button>
        </AtModalAction>
      </AtModal>
      <AtActionSheet isOpened={isOpen} cancelText='取消' onCancel={() => setIsOpen(false)}>
        <AtActionSheetItem className='delete__item'>
          删除
        </AtActionSheetItem>
        <AtActionSheetItem>
          还原
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  )
}

Collection.config = {
  navigationBarTitleText: '回收站'
}

export default Collection