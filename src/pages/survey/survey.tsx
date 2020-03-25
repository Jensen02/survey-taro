import Taro, { useRouter, useShareAppMessage, useState } from '@tarojs/taro'
import { View, RadioGroup, Radio, CheckboxGroup, Checkbox, Text } from '@tarojs/components'
import { AtDivider, AtTextarea, AtButton } from 'taro-ui'
import Header from '../../components/Header/Header'
import './survey.scss'

const Survey = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const router = useRouter()
  const { question } = router.params
  const { id, radios, multiples, judges, answers, title, description, endTime, personLimit } = JSON.parse(question)

  useShareAppMessage((res) => {
    console.log('resshare: ', res)
    setIsSubmit(true)
    return {
      title: '问卷详情',
      path: `/pages/survey/survey?question=${question}`
    }
  })

  const handleClick = () => {
    setIsSubmit(true)
    console.log('share')
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/update/state',
      data: {
        id,
        state: 'public'
      },
      method: 'POST'
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
            radios && radios.map((item, index) => {
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
            multiples && multiples.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radios.length + index + 1} - ${item.problem}`}</Text>
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
            judges && judges.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radios.length + multiples.length + index + 1} - ${item.problem}`}</Text>
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
            answers && answers.map((item, index) => {
              return (
                <View key={index}>
                  <Text className='problem'>{`${radios.length + multiples.length + judges.length + index +1} - ${item.problem}`}</Text>
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
      {
        !isSubmit
        ? <AtButton type='secondary' className='btn' openType='share' onClick={() => handleClick()}>
            <View className='at-icon at-icon-share-2'></View>
              发布问卷
          </AtButton>
        : <AtButton type='primary' className='btn'>
            提交
          </AtButton>
      }
    </View>
  )
}

Survey.config = {
  navigationBarTitleText: '问卷详情'
}

export default Survey