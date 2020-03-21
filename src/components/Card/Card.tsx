import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import PropTypes from 'prop-types'
import './Card.scss'

const Card = () => {
  // const { id } = props

  return (
    <View className='card'>
      <View className='at-article__h2 card__title'>
        关于元宵节的调查
      </View>
      <View className='at-article__p card__content'>
      这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段落。这是文本段sdfsdfgsdgsdfg三等分动
      </View>
    </View>
  )
}

Card.propTypes = {
  // id: PropTypes.string.isRequired
}

export default Taro.memo(Card)