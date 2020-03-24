import Taro, { useState } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtIcon, AtModal, AtModalContent, AtModalAction, AtToast } from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import PropTypes from 'prop-types'
import {
  setAnswerWithTemplete,
  setJudgeWithTemplete,
  setMultipleWithTemplete,
  setRadioWithTemplete
} from '../../actions'
import './Card.scss'

const Card = (props) => {
  const { qId, type, titleItem, content } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isToast, setIsToast] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    setIsOpen(false)
    const api = type === 'collection' ? 'collection' : 'delete'
    Taro.request({
      url: `https://www.zhaosongsong.cn/api/v1/questionnaire/${api}`,
      data: {
        id: qId
      },
      method: 'POST'
    }).then((res) => {
      if (parseInt(res.data.code, 10) === 1) {
        setIsToast(true)
      }
    })
  }

  const editQuestion = () => {
    if (type !== 'templete') {
      return
    }
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/questionnaire/query/id',
      data: {
        id: qId
      },
      method: 'GET'
    }).then((res) => {
      const data = res.data.data
      const { title, description, personLimit, endTime } = data
      if (res.data.code === 1) {
        dispatch(setAnswerWithTemplete(data.answers))
        dispatch(setJudgeWithTemplete(data.judges))
        dispatch(setMultipleWithTemplete(data.multiples))
        dispatch(setRadioWithTemplete(data.radios))
        Taro.navigateTo({
          url: `/pages/edit/edit?title=${title}&description=${description}&personLimit=${personLimit}&endTime=${endTime}`
        })
      }
    })
  }

  return (
    <View className='card' onClick={() => editQuestion()}>
      {type !== 'templete' && <AtIcon value='close-circle' size='20' onClick={() => setIsOpen(true)}></AtIcon>}
      <View className='at-article__h2 card__title'>
        { titleItem }
      </View>
      <View className='at-article__p card__content'>
        { content }
      </View>
      <AtModal isOpened={isOpen}>
        <AtModalContent>
          问卷删除后将无法使用，可在回收站进行还原，即可正常使用，请确定是否删除？
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setIsOpen(false)}>取消</Button>
          <Button onClick={() => handleClick()}>确定</Button>
        </AtModalAction>
      </AtModal>
      <AtToast isOpened={isToast} text='问卷成功放入回收站' status='success'></AtToast>
    </View>
  )
}

Card.propTypes = {
  qId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  titleItem: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Taro.memo(Card)