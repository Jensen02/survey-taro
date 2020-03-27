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
import {
  // getCreateItem,
  // getFinishItem,
  // getPublicItem,
  getCollection,
  setIsDelete
} from '../../actions'
import './collection.scss'

const dispatch = useDispatch()

dispatch(getCollection())

const Collection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { collections, deleteId, isDelete }  = useSelector((state: any) => state.topicReducer)

  const handleClick = () => {
    setIsOpen(false)
    console.log('deleteid: ', deleteId)
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/delete',
      data: {
        id: deleteId
      },
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        Taro.atMessage({
          'message': '问卷删除成功',
          'type': 'success'
        })
        dispatch(getCollection())
      } else {
        Taro.atMessage({
          type: 'error',
          message: '问卷删除失败'
        })
      }
    })
  }

  const handleDelete = () => {
    dispatch(setIsDelete(false))
    setIsOpen(true)
  }

  const handleRecover = () => {
    dispatch(setIsDelete(false))
    console.log('recoverid: ', deleteId)
    // Taro.request({
    //   url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection/recover',
    //   data: {
    //     id: deleteId
    //   },
    //   method: 'POST'
    // }).then((res) => {
    //   if (res.data.code === 1) {
    //     Taro.atMessage({
    //       type: 'success',
    //       message: '问卷还原成功'
    //     })
    //     dispatch(getCollection())
        // dispatch(getCreateItem())
        // dispatch(getPublicItem())
        // dispatch(getFinishItem())
    //   }
    // })
  }

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
      <AtModal isOpened={isOpen}>
        <AtModalContent>
          该删除操作将无法进行还原，请确定是否进行删除？
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setIsOpen(false)}>取消</Button>
          <Button onClick={() => handleClick()}>确定</Button>
        </AtModalAction>
      </AtModal>
      <AtActionSheet isOpened={isDelete} cancelText='取消' onCancel={() => dispatch(setIsDelete(false))}>
        <AtActionSheetItem className='delete__item' onClick={() => handleDelete()}>
          删除
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => handleRecover()}>
          还原
        </AtActionSheetItem>
      </AtActionSheet>
      <AtMessage />
    </View>
  )
}

Collection.config = {
  navigationBarTitleText: '回收站'
}

export default Collection