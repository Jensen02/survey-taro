import Taro, { useState } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { AtTextarea, AtInput, AtButton, AtMessage } from 'taro-ui'
import moment from 'moment'
import './create.scss'

const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')
  const [persons, setPersons] = useState()
  const [endTime, setDate] = useState(moment(moment().add(1, 'days')).format('YYYY-MM-DD'))

  const toEdit = () => {
    if (title === '') {
      Taro.atMessage({
        'message': '问卷标题不能为空',
        'type': 'error'
      })
      return
    }
    if (description === '') {
      Taro.atMessage({
        'message': '问卷描述不能为空',
        'type': 'error'
      })
      return
    }
    if (endTime === '') {
      Taro.atMessage({
        'message': '问卷截止时间不能为空',
        'type': 'error'
      })
      return
    }
    const url = `/pages/edit/edit?title=${title}&description=${description}&persons=${persons}&endTime=${endTime}`
    Taro.navigateTo({ url: url })
  }

  return (
    <View >
      <View className='item'>
        <View>
          <Text className='market'>*</Text>
          <Text className='label'>问卷标题</Text>
        </View>
        <AtTextarea
          className='content'
          maxLength={50}
          height={50}
          placeholder='请输入问卷标题'
          value={title}
          onChange={(e) => setTitle((e.target as any).value)}
        />
      </View>
      <View className='item'>
        <View>
          <Text className='market'>*</Text>
          <Text className='label'>问卷描述</Text>
        </View>
        <AtTextarea
          className='content'
          placeholder='请输入问卷描述'
          value={description}
          onChange={(e) => setDesc((e.target as any).value)}
        />
      </View>
      <View className='item'>
        <AtInput
          name='persons'
          title='限制人数'
          type='number'
          placeholder='限制人数'
          value={persons}
          onChange={(_, e) => setPersons((e.target as any).value)}
        />
      </View>
      <View className='page-section item'>
        <View className='date'>
          <Picker
            mode='date'
            value={endTime}
            start={moment(moment().add(1, 'days')).format('YYYY-MM-DD')}
            onChange={(e) => setDate((e.detail as any).value)}
          >
            <View className='picker'>
            <Text className='market'>*</Text>
              截止时间：{endTime}
            </View>
          </Picker>
        </View>
      </View>
      <AtMessage />
      <AtButton type='primary' className='btn' onClick={toEdit}>下一步</AtButton>
    </View>
  )
}

Create.config = {
  navigationBarTitleText: '创建问卷'
}

export default Create