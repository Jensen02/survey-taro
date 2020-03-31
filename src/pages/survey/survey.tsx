import Taro, { useRouter, useShareAppMessage, useState } from '@tarojs/taro'
import { View, RadioGroup, Radio, CheckboxGroup, Checkbox, Text } from '@tarojs/components'
import { AtDivider, AtTextarea, AtButton, AtMessage} from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { getPublicItem, setIsPublic } from '../../actions'
import { convertMapToObject } from '../../utils'
import Header from '../../components/Header/Header'
import './survey.scss'

const dispatch = useDispatch()

const Survey = () => {
  const [isDisabled, setIsDisabled] = useState(true)
  const router = useRouter()
  const { question } = router.params
  const { id, radios, multiples, judges, answers, title, description, endTime, personLimit } = JSON.parse(question)
  const { isPublic } = useSelector((state: any) => state.topicReducer)

  const radiosMap = new Map()
  const mutiplesMap = new Map()
  const answersMap = new Map()
  const judgesMap = new Map()

  useShareAppMessage((res) => {
    console.log('resshare: ', res)
    return {
      title: '问卷详情',
      path: `/pages/survey/survey?question=${question}`
    }
  })

  const handleClick = () => {
    setIsDisabled(false)
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/update/state',
      data: {
        id,
        state: 'public'
      },
      method: 'POST'
    }).then((res) => {
      if (res.data.code === 1) {
        dispatch(getPublicItem())
        dispatch(setIsPublic(true))
      }
    })
  }

  const handleChange = (e: any, topicMap: any, idItem?: string) => {
    const { target } = e
    // eslint-disable-next-line no-shadow
    const { id, value } = target
    idItem ? topicMap.set(idItem, value) : topicMap.set(id, value)
  }

  const handleSubmit = () => {
    console.log(radiosMap, mutiplesMap, judgesMap, answersMap)
    const radio = convertMapToObject(radiosMap)
    const multiple = convertMapToObject(mutiplesMap)
    const judge = convertMapToObject(judgesMap)
    const answer = convertMapToObject(answersMap)
    const data = {
      id,
      radio,
      multiple,
      judge,
      answer
    }
    console.log('data: ', data)
    // Taro.request({
    //   url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/submit/update',
    //   data,
    //   method: 'POST'
    // }).then((res) => {
    //   if (res.data.code === 1) {
    //     Taro.atMessage({
    //       type: 'success',
    //       message: '问卷提交成功，感谢您的参与！'
    //     })
    //   }
    // })
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
                  <RadioGroup id={item.id} onChange={(e) => handleChange(e, radiosMap)}>
                    <Radio value='aNumber' key='a' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.aContent}</Text>
                    </Radio>
                    <Radio value='bNumber' key='b' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.bContent}</Text>
                    </Radio>
                    <Radio value='cNumber' key='c' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.cContent}</Text>
                    </Radio>
                    <Radio value='dNumber' key='d' color='#6190e8' className='item__child' disabled={isDisabled}>
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
                  <CheckboxGroup id={item.id} onChange={(e) => handleChange(e, mutiplesMap)}>
                    <Checkbox value='aNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.aContent}</Text>
                    </Checkbox>
                    <Checkbox value='bNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.bContent}</Text>
                    </Checkbox>
                    <Checkbox value='cNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.cContent}</Text>
                    </Checkbox>
                    <Checkbox value='dNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.dContent}</Text>
                    </Checkbox>
                    <Checkbox value='eNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
                      <Text className='text'>{item.eContent}</Text>
                    </Checkbox>
                    <Checkbox value='fNumber' color='#6190e8' className='item__child' disabled={isDisabled}>
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
                  <RadioGroup id={item.id} onChange={(e) => handleChange(e, judgesMap)} className='item__child__judge'>
                    <Radio value='yesNumber' key='a' color='#6190e8' disabled={isDisabled}>
                      <Text className='text'>{item.yesContent}</Text>
                    </Radio>
                    <Radio value='noNumber' key='b' color='#6190e8' disabled={isDisabled}>
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
                    disabled={isDisabled}
                    onChange={(e) => handleChange(e, answersMap, item.id)}
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
      <AtMessage />
      {
        !isPublic
        ? <AtButton type='secondary' className='btn' openType='share' onClick={() => handleClick()}>
            <View className='at-icon at-icon-share-2'></View>
              发布问卷
          </AtButton>
        : <AtButton type='primary' className='btn' onClick={() => handleSubmit()}>
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