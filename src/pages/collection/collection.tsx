import Taro, { useState, useCallback } from '@tarojs/taro'
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
import { setCollections } from '../../actions'
import './collection.scss'

// 获取所有回收站问卷
const getConllections = useCallback(() => {
  const dispatch = useDispatch()
  Taro.request({
    url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/query/all',
    data: {},
    method: 'GET'
  }).then((res) => {
    if (res.data.code === 1) {
      dispatch(setCollections(res.data.data))
    }
  })
}, [])

// 删除问卷
// const deleteCollection = useCallback((id: string) => {
//   Taro.request({
//     url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/delete',
//     data: {
//       id
//     },
//     method: 'POST'
//   }).then((res) => {
//     if (res.data.code === 1) {
//       Taro.atMessage({
//         'type': 'success',
//         'message': '问卷删除成功'
//       })
//     }
//   })
// }, [])

// // 还原问卷
// const recoverQuestionnaire = useCallback((id: string) => {
//   Taro.request({
//     url: 'https://wwwzhaosongsong.cn/api/v1/questionnnaire/collection/recover',
//     data: {
//       id
//     },
//     method: 'POST'
//   })
// }, [])

getConllections()

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