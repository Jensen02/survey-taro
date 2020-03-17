/* eslint-disable react/jsx-no-duplicate-props */
import Taro, { useRouter, useState } from '@tarojs/taro'
import { View, Text, Radio, RadioGroup, Checkbox, CheckboxGroup } from '@tarojs/components'
import { AtButton, AtActionSheet, AtActionSheetItem, AtDivider, AtModal, AtTextarea } from 'taro-ui'
import { useSelector } from '@tarojs/redux'
import Header from '@/components/Header/Header'
import './edit.scss'

const Edit = () => {
  const router = useRouter()
  const { title, description, endTime, persons } = router.params
  const [isOpen, setIsOpen] = useState(false)
  const [isTost, setIsToat] = useState(false)
  const { radio, multiple, judge, answer, number } = useSelector((state: any) => state.topicReducer)

  const toPage = (page) => {
    setIsOpen(false)
    Taro.navigateTo({ url: `/pages/${page}/${page}` })
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
                  <Text className='problem'>{`${number} - ${item.problem}`}</Text>
                  <RadioGroup key={index} onChange={(e) => console.log(e)}>
                    <Radio value='a' key='a' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.a_content}</Text>
                    </Radio>
                    <Radio value='b' key='b' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.b_content}</Text>
                    </Radio>
                    <Radio value='c' key='c' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.c_content}</Text>
                    </Radio>
                    <Radio value='d' key='d' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.d_content}</Text>
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
                  <Text className='problem'>{`${number} - ${item.problem}`}</Text>
                  <CheckboxGroup>
                    <Checkbox value='a' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.a_content}</Text>
                    </Checkbox>
                    <Checkbox value='b' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.b_content}</Text>
                    </Checkbox>
                    <Checkbox value='c' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.c_content}</Text>
                    </Checkbox>
                    <Checkbox value='d' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.d_content}</Text>
                    </Checkbox>
                    <Checkbox value='e' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.e_content}</Text>
                    </Checkbox>
                    <Checkbox value='f' color='#6190e8' className='item__child'>
                      <Text className='text'>{item.f_content}</Text>
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
                  <Text className='problem'>{`${number} - ${item.problem}`}</Text>
                  <RadioGroup key={index} onChange={(e) => console.log(e)} className='item__child__judge'>
                    <Radio value='a' key='a' color='#6190e8'>
                      <Text className='text'>{item.a_content}</Text>
                    </Radio>
                    <Radio value='b' key='b' color='#6190e8'>
                      <Text className='text'>{item.b_content}</Text>
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
                  <Text className='problem'>{`${number} - ${item.problem}`}</Text>
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
      <AtModal
        isOpened={isTost}
        title='标题'
        cancelText='取消'inline-block
        confirmText='确认'
        onCancel={() => setIsToat(false)}
        // onConfirm={ () => share() }
        content='问卷创建成功，赶快发布吧!'
      />
      <AtButton type='secondary' className='btn' onClick={() => setIsOpen(true)}>
        <View className='at-icon at-icon-add-circle'></View>
        添加题目
      </AtButton>
      <AtButton type='primary' onClick={() => setIsToat(true)} className='create__topic'>创建问卷</AtButton>
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