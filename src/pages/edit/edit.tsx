/* eslint-disable react/jsx-no-duplicate-props */
import Taro, { useRouter, useState， useShareAppMessage } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtActionSheet, AtActionSheetItem, AtDivider, AtToast, AtModal } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import Header from '../../components/Header/Header'
import './edit.scss'

const Edit = () => {
  const router = useRouter()
  const { title, description, endTime, persons } = router.params
  const [isOpen, setIsOpen] = useState(false)
  const [isTost, setIsToat] = useState(false)
  const [choseRadio, setChoseRadio] = useState('')

  // const createActionSheetItem = () => {
  //   const temp = ['radio', 'multiple', 'answer', 'judge']
  //   return temp.map((item) => {
  //     return (
  //       <AtActionSheetItem key={item} onClick={() => {
  //         setIsOpen(false)
  //         Taro.navigateTo({ url: `/pages/topic/topic?type=${item}` })
  //         }}
  //       >
  //         多选题
  //       </AtActionSheetItem>
  //     )
  //   })
  // }
  // const item = createActionSheetItem()
  const { radio } = useSelector((state: any) => state.topicReducer)

  const toPage = (page) => {
    setIsOpen(false)
    Taro.navigateTo({ url: `/pages/${page}/${page}` })
  }

  const share = () => {
    useShareAppMessage(res => {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '发布问卷',
        path: '/pages/edit/edit'
      }
    })
  } 

  return (
    <View>
      <Header
        title={title}
        description={description}
        endTime={endTime}
        persons={parseInt(persons, 10)}
      />
      <View className='content'>
        <View className='radio'>
          {
            radio.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${index+1} - ${item.problem}`}</Text>
                  <van-radio-group value={choseRadio} onchange={(e) => console.log(e)} key={index}>
                    <van-radio name='a' key='a' checked-color='#6190e8'>{item.a_content}</van-radio>
                    <van-radio name='b' key='b' checked-color='#6190e8'>{item.b_content}</van-radio>
                    <van-radio name='c' key='c' checked-color='#6190e8'>{item.c_content}</van-radio>
                    <van-radio name='d' key='d' checked-color='#6190e8'>{item.d_content}</van-radio>
                  </van-radio-group>
                  <AtDivider />
                </View>
              )
            })
          }
        </View>
      </View>
      <AtActionSheet
        isOpened={isOpen}
        cancelText='取消'
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        <AtActionSheetItem onClick={() => toPage('radio')}>
          单选题
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => toPage('multiple')}>
          多选题
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => toPage('answer')}>
          简答题
        </AtActionSheetItem>
        <AtActionSheetItem onClick={() => toPage('judge')}>
          判断题
        </AtActionSheetItem>
      </AtActionSheet>
      <AtModal
        isOpened={isTost}
        title='标题'
        cancelText='取消'
        confirmText='确认'
        onCancel={() => setIsToat(false)}
        onConfirm={ () => share() }
        content='问卷创建成功，赶快发布吧!'
      />
      <AtButton type='secondary' className='btn' onClick={() => setIsOpen(true)}>
        <View className='at-icon at-icon-add-circle'></View>
        添加题目
      </AtButton>
      <AtButton type='primary' onClick={() => setIsToat(true)}>创建问卷</AtButton>
    </View>
  )
}

Edit.config = {
  navigationBarTitleText: '问卷编辑',
  usingComponents: {
    'van-radio': '../../components/vant-weapp/dist/radio/index',
    'van-radio-group': '../../components/vant-weapp/dist/radio-group/index'
  }
}

export default Taro.memo(Edit)