import Taro, { useState, useCallback } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import Card from '@/components/Card/Card'
import { setCreateItem, setPublicItem, setFinishItem } from '../../actions'
import './record.scss'

const queryData = useCallback((state) => {
  const dispatch = useDispatch()
  Taro.request({
    url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/state',
    data: {
      state: state
    },
    method: 'GET'
  }).then((res) => {
    if (parseInt(res.data.code, 10) === 1) {
      if (state === 'create') {
        dispatch(setCreateItem(res.data.data))
      }
      if (state === 'public') {
        dispatch(setPublicItem(res.data.data))
      }
      if (state === 'finish') {
        dispatch(setFinishItem(res.data.data))
      }
    }
  })
}, [])
queryData('create')
queryData('public')
queryData('finish')

const Record = () => {
  const [current, setCurrent] = useState(0)
  const { createItem, publicItem, finishItem } = useSelector((state: any) => state.topicReducer)
  console.log('c: ', createItem, 'p: ', publicItem, 'f: ', finishItem)

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