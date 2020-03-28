/* eslint-disable react/jsx-no-duplicate-props */
import Taro, { useRouter, useState } from '@tarojs/taro'
import { View, Text, Radio, RadioGroup, Checkbox, CheckboxGroup } from '@tarojs/components'
import { AtButton, AtActionSheet, AtActionSheetItem, AtDivider, AtTextarea, AtToast } from 'taro-ui'
import { useSelector, useDispatch } from '@tarojs/redux'
import Header from '@/components/Header/Header'
import { getCreateItem, setAnswer, setJudge, setRadio, setMultiple } from '../../actions'
import './edit.scss'

const Edit = () => {
  const router = useRouter()
  const { title, description, endTime, personLimit } = router.params
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenToast, setIsOpenToast] = useState(false)
  const dispatch = useDispatch()
  const { radio, multiple, judge, answer } = useSelector((state: any) => state.topicReducer)

  const toPage = (page) => {
    setIsOpen(false)
    Taro.navigateTo({ url: `/pages/${page}/${page}` })
  }

  const data = {
    title,
    description,
    endTime,
    multiple,
    judge,
    answer,
    radio,
    personLimit
  }

  const createQuestion = () => {
    const skey = Taro.getStorageSync('skey')
    data['skey'] = encodeURIComponent(skey)
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/create',
      data,
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        setIsOpenToast(true)
        dispatch(getCreateItem())
        setTimeout(() => {
          dispatch(setAnswer({}))
          dispatch(setJudge({}))
          dispatch(setRadio({}))
          dispatch(setMultiple({}))
          Taro.navigateTo({url: `/pages/survey/survey?question=${JSON.stringify(res.data.data)}`})
        }, 3000)
      }
    })
  }

  return (
    <View>
      <Header
        title={title}
        description={description}
        endTime={endTime}
        persons={parseInt(personLimit, 10)}
      />
      <View className='content'>
        <View className='radio'>
          {
            radio.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${index + 1} - ${item.problem}`}</Text>
                  <RadioGroup key={index} onChange={(e) => console.log(e)}>
                    <Radio value='a' key='a' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.aContent}</Text>
                    </Radio>
                    <Radio value='b' key='b' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.bContent}</Text>
                    </Radio>
                    <Radio value='c' key='c' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.cContent}</Text>
                    </Radio>
                    <Radio value='d' key='d' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.dContent}</Text>
                    </Radio>
                  </RadioGroup>
                  <AtDivider />
                </View>
              )
            })
          }
        </View>
        <View className='multiple'>
          {
            multiple.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radio.length + index + 1} - ${item.problem}`}</Text>
                  <CheckboxGroup>
                    <Checkbox value='a' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.aContent}</Text>
                    </Checkbox>
                    <Checkbox value='b' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.bContent}</Text>
                    </Checkbox>
                    <Checkbox value='c' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.cContent}</Text>
                    </Checkbox>
                    <Checkbox value='d' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.dContent}</Text>
                    </Checkbox>
                    <Checkbox value='e' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.eContent}</Text>
                    </Checkbox>
                    <Checkbox value='f' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.fContent}</Text>
                    </Checkbox>
                  </CheckboxGroup>
                  <AtDivider />
                </View>
              )
            })
          }
        </View>
        <View className='judge'>
          {
            judge.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radio.length + multiple.length + index + 1} - ${item.problem}`}</Text>
                  <RadioGroup key={index} onChange={(e) => console.log(e)} className='item__child__judge'>
                    <Radio value='a' key='a' color='#6190e8'>
                      <Text className='text'>{item.yesContent}</Text>
                    </Radio>
                    <Radio value='b' key='b' color='#6190e8'>
                      <Text className='text'>{item.noContent}</Text>
                    </Radio>
                  </RadioGroup>
                  <AtDivider />
                </View>
              )
            })
          }
        </View>
        <View className='answer'>
          {
            answer.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radio.length + multiple.length + judge.length + index +1} - ${item.problem}`}</Text>
                  <AtTextarea
                    showConfirmBar
                    count={false}
                    value=''
                    onChange={() => {}}
                    maxLength={200}
                    placeholder='你的回答是...'
                  />
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
      <AtToast isOpened={isOpenToast} text='问卷创建成功' status='success'></AtToast>
      <AtButton type='secondary' className='btn' onClick={() => setIsOpen(true)}>
        <View className='at-icon at-icon-add-circle'></View>
        添加题目
      </AtButton>
      <AtButton type='primary' onClick={() => createQuestion()} className='create__topic'>创建问卷</AtButton>
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