import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import Card from '@/components/Card/Card'
import { getCreateItem, getFinishItem, getPublicItem } from '../../actions'
import './record.scss'

const dispatch = useDispatch()
dispatch(getCreateItem())
dispatch(getFinishItem())
dispatch(getPublicItem())

const Record = () => {
  const [current, setCurrent] = useState(0)
  const { createItem, publicItem, finishItem } = useSelector((state: any) => state.topicReducer)
  const tabList = [{ title: '已发布' }, { title: '未发布' }, { title: '已结束' }]
  
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
                    type='question'
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
                    type='question'
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
                    type='question'
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
    </View>
  )
}

Record.config = {
  navigationBarTitleText: '问卷发布记录'
}

export default Record