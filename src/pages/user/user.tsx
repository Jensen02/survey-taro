import Taro, { useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtAvatar,
  AtDivider,
  AtList,
  AtListItem,
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtToast
} from 'taro-ui'
import { useDispatch, useSelector } from '@tarojs/redux'
import { setUserInfo, setUserIsLogin } from '../../actions'
import collectionIcon from '../../images/icon/collection.png'
import recordIcon from '../../images/icon/record.png'
import infoIcon from '../../images/icon/info.png'
import './user.scss'

const dispatch = useDispatch()

// 用户登录
const userLogin = () => {
  Taro.login().then((res) => {
    Taro.request({
      url: 'https://www.zhaosongsong.cn/api/v1/user/login',
      data: {
        code: res.code
      },
      method: 'POST'
    }).then((response) => {
      if (response.data.skey) {
        Taro.setStorage({ key: 'skey', data: response.data.skey })
        dispatch(setUserIsLogin(true))
        Taro.setStorage({ key: 'isLogin', data: true })
      }
    })
  }).catch((error) => {
    console.log('error: ', error)
  })
}

// 授权
const auth = () => {
  Taro.openSetting().then((res) => {
    if (res.authSetting['scope.userInfo']) {
      Taro.getUserInfo().then(response => {
        userLogin()
        Taro.setStorage({ key: 'userInfo', data: response.userInfo })
        // Taro.setStorage({ key: 'isLogin', data: true })
        dispatch(setUserInfo(response.userInfo))
        // dispatch(setUserIsLogin(true))
      }).catch(() => {
      })
    }
  })
}

// 退出登录
const userLoginOut = () => {
  Taro.setStorage({ key: 'skey', data: '' })
  Taro.setStorage({ key: 'userInfo', data: {} })
  Taro.setStorage({ key: 'isLogin', data: false })
  dispatch(setUserInfo({}))
  dispatch(setUserIsLogin(false))
}

const user = Taro.getStorageSync('userInfo')
const login = Taro.getStorageSync('isLogin')
if (login) {
  dispatch(setUserInfo(user))
  dispatch(setUserIsLogin(login))
}

const User = () => {
  const { userInfo, isLogin } = useSelector((state: any) => state.topicReducer)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenToast, setIsOpenToast] = useState(false)

  // 获取用户信息
  const getUserInfo = (e) => {
    if (e.detail.userInfo) {
      dispatch(setUserInfo(e.detail.userInfo))
      Taro.setStorage({ key: 'userInfo', data: e.detail.userInfo })
      userLogin()
      return
    }
    setIsOpenToast(false)
    setIsOpen(true)
    console.log('fail', isOpen)
  }

  return (
    <View>
      <View className='person__info'>
        <AtAvatar size='large' image={userInfo.avatarUrl}></AtAvatar>
        <Text className='person__info__name'>{ userInfo.nickName }</Text>
      </View>
      <AtDivider />
      <AtList>
        <AtListItem
          title='信息统计'
          arrow='right'
          thumb={infoIcon}
          onClick={() => Taro.navigateTo({ url: '/pages/info/info' })}
        />
        <AtListItem
          title='发布记录'
          arrow='right'
          thumb={recordIcon}
          onClick={() => Taro.navigateTo({ url: '/pages/record/record' })}
        />
        <AtListItem
          title='回收站'
          extraText='详细信息'
          arrow='right'
          thumb={collectionIcon}
          onClick={() => Taro.navigateTo({ url: '/pages/collection/collection' })}
        />
      </AtList>
      <AtModal isOpened={isOpen}>
        <AtModalHeader>授权确认</AtModalHeader>
        <AtModalContent>
          此授权仅用于个人登录，如果拒绝授权将无法登录使用该小程序，请确认是否继续前往进行授权操作？
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => {
              setIsOpen(false)
              setIsOpenToast(true)
            }}
          >
            取消
          </Button>
          <Button onClick={() => {
              setIsOpenToast(false)
              setIsOpen(false)
              auth()
            }}
          >
            授权
          </Button>
        </AtModalAction>
      </AtModal>
       <AtToast isOpened={isOpenToast} text='授权失败' status='error'></AtToast>
      <AtToast isOpened={isOpenToast} text='授权失败' status='error'></AtToast>
      {
        !isLogin
        ? <AtButton
          type='primary'
          className='login__btn'
          openType='getUserInfo'
          onGetUserInfo={(e) => getUserInfo(e)}
        >
          登录
        </AtButton>
        : <AtButton type='primary' className='login__btn' onClick={() => userLoginOut()}>退出登录</AtButton>
      }
    </View>
  )
}

User.config = {
  navigationBarTitleText: '个人中心',
}

export default User