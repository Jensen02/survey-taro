import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtModal, AtModalContent, AtModalAction, AtMessage, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import Card from '@/components/Card/Card'
import {
  getCreateItem,
  getFinishItem,
  getPublicItem,
  getCollection,
  setIsCollection
} from '../../actions'
import './record.scss'

const dispatch = useDispatch()
dispatch(getCreateItem())
dispatch(getFinishItem())
dispatch(getPublicItem())

const Record = () => {
  const [current, setCurrent] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { createItem, publicItem, finishItem, isCollection, collectionId } = useSelector((state: any) => state.topicReducer)
  const tabList = [{ title: '已发布' }, { title: '未发布' }, { title: '已结束' }]

  const handleCollection = () => {
    dispatch(setIsCollection(false))
    setIsOpen(true)
  }

  const handleClick = () => {
    setIsOpen(false)
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/collection',
      data: {
        id: collectionId
      },
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        Taro.atMessage({
          'message': '问卷已放入回收站',
          'type': 'success'
        })
        dispatch(getCollection())
        dispatch(getCreateItem())
        dispatch(getPublicItem())
        dispatch(getFinishItem())
      }
    })
  }

  const handlePublic = () => {
    dispatch(setIsCollection(false))
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/id',
      data: {
        id: collectionId
      },
      method: 'GET'
    }).then((res) => {
      if (res.data.code === 1) {
        Taro.navigateTo({url: `/pages/survey/survey?question=${JSON.stringify(res.data.data)}`})
      }
    })
  }
  
  return (
    <View>
      <AtTabs current={current} tabList={tabList} onClick={(v) => setCurrent(v)}>
        <AtTabsPane current={current} index={0} >
          <View>
            {
              publicItem && publicItem.map((item, index) => {
                const { id, title, description } = item
                return (
                  <Card
                    key={index}
                    type='public'
                    qId={id}
                    titleItem={title}
                    content={description}
                  />
                )
              })
            }
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View>
            {
              createItem && createItem.map((item, index) => {
                const { id, title, description } = item
                return (
                  <Card
                    key={index}
                    type='create'
                    qId={id}
                    titleItem={title}
                    content={description}
                  />
                )
              })
            }
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View>
            {
              finishItem && finishItem.map((item, index) => {
                const { id, title, description } = item
                return (
                  <Card
                    key={index}
                    type='finish'
                    qId={id}
                    titleItem={title}
                    content={description}
                  />
                )
              })
            }
          </View>
        </AtTabsPane>
      </AtTabs>
      <AtModal isOpened={isOpen}>
        <AtModalContent>
          问卷删除后将无法使用，可在回收站进行还原，即可正常使用，请确定是否删除？
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setIsOpen(false)}>取消</Button>
          <Button onClick={() => handleClick()}>确定</Button>
        </AtModalAction>
      </AtModal>
      <AtActionSheet isOpened={isCollection} cancelText='取消' onCancel={() => dispatch(setIsCollection(false))}>
        <AtActionSheetItem className='delete__item' onClick={() => handleCollection()}>
          回收问卷
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => handlePublic()}>
          发布问卷
        </AtActionSheetItem>
      </AtActionSheet>
      <AtMessage />
    </View>
  )
}

Record.config = {
  navigationBarTitleText: '问卷发布记录'
}

export default Record