/* eslint-disable import/no-commonjs */
/*
 * @Description: 通用配置
 * @GitHub: https://github.com/Jensen02
 * @Author: Jensen
 * @Date: 2019-12-13 23:01:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-05 21:08:43
 */
// import path from 'path'
const path = require('path')

const config = {
  projectName: 'surveyTaro',
  date: '2019-12-13',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
  },
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  },
  defineConstants: {
  },
  copy: {
    patterns: [
      {
        from: 'src/components/vant-weapp/dist/wxs/',
        to: 'dist/components/vant-weapp/dist/wxs/'
      },
      {
        from: 'src/components/vant-weapp/dist/common/',
        to: 'dist/components/vant-weapp/dist/common/'
      }
    ],
    options: {
    }
  },
  mini: {
    compile: {
      exclude: ['src/components/ec-canvas/echarts.js']
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {
          // designWidth: 750,
          // platform: 'weapp',
          // selectorBlackList: [/^.van-.*?$/, /^.weui-.*?$/]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
