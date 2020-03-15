import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import PropTypes from 'prop-types'
import './Header.scss'

const Header = (props) => {
  console.log('props: ', props)
  const { title, description, endTime, persons } = props

  return (
    <View className='at-article header'>
      <View className='at-article__h2'>{ title }</View>
      <View className='at-article__p'>{ description }</View>
      <View className='at-article__info info'>
        <Text>问卷限制人数：{ persons || '' }</Text>
        <Text>问卷截止时间：{ endTime }</Text>
      </View>
      <AtDivider />
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  persons: PropTypes.number
}

export default Taro.memo(Header)