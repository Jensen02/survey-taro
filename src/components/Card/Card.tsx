import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon} from 'taro-ui'
import { useDispatch } from '@tarojs/redux'
import PropTypes from 'prop-types'
import {
  setAnswerWithTemplete,
  setJudgeWithTemplete,
  setMultipleWithTemplete,
  setRadioWithTemplete,
  setCollectionId,
  setIsCollection,
  setIsDelete,
  setDeleteId
} from '../../actions'
import './Card.scss'

const Card = (props) => {
  const { qId, type, titleItem, content } = props
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setIsCollection(true))
    dispatch(setCollectionId(qId))
  }

  const handleDelete = () => {
    dispatch(setIsDelete(true))
    dispatch(setDeleteId(qId))
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
      {type === 'finish' && <AtIcon value='close-circle' size='20' onClick={() => handleClick()}></AtIcon>}
      {type === 'collection' && <AtIcon value='menu' size='20' onClick={() => handleDelete()}></AtIcon>}
      {['create', 'public'].includes(type) && <AtIcon value='menu' size='20' onClick={() => handleClick()}></AtIcon>}
      <View className='at-article__h2 card__title'>
        { titleItem }
      </View>
      <View className='at-article__p card__content'>
        { content }
      </View>
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