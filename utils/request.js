// import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (getToken() && !isToken) {
    // config.header['Authorization'] = 'Bearer ' + getToken()
    config.header['Authorization'] = getToken();
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
        if (error) {
            console.log(error,"error")
        //   toast('后端接口连接异常')
          reject('后端接口连接异常')
          return
        }
        // console.log(res.data, "DDDDDDDDDDDDDDDDDDDDDD")
        const code = res.data.code || 200
        // console.log(code, "CCCCCCCCCCCCCC")
        const msg = errorCode[code] || res.data.msg || res.data.message || errorCode['default']
        if (res.data == "404 page not found") {
            reject('404 page not found')
            toast('404 page not found')
            return;
        }
        if (code === 401) {
          showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
            if (res.confirm) {
            //   store.dispatch('LogOut').then(res => {
            //     uni.reLaunch({ url: '/pages/login' })
            //   })
            }
          })
          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
        //   toast(msg)
          reject('500')
        } else if (code !== "SUCCESS") {
          toast(msg)
          reject(code.message || msg || code)
        }
        resolve(res.data)
      })
      .catch(error => {
        let { message } = error
        console.log(message, "message")
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        toast(message)
        reject(error)
      })
  })
}

export default request
