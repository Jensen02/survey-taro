import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './record.scss'

const Record = () => {
  const [current, setCurrent] = useState(0)

  const tabList = [{ title: '已发布' }, { title: '未发布' }, { title: '已结束' }]
  return (
    <View>
      <AtTabs current={current} tabList={tabList} onClick={(v) => setCurrent(v)}>
        <AtTabsPane current={current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}

Record.config = {
  navigationBarTitleText: '问卷发布记录'
}

export default Record