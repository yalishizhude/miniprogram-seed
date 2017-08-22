/**
 * api.request单独封装
 * 包含登录校验、laoding处理等
 */
import {combine, noop, debug} from 'util'
import {server} from 'config'
import api from 'api'


let sessionId = ''

let getSessionId = () => new Promise((resolve, reject) => {
  if(sessionId) resolve(sessionId)
  else refreshSession(resolve, reject)
})

let refreshSession = (resolve, reject) => {
  sessionId = ''
  api.login({
    success(res) {
      api.getUserInfo({
        success(resp) {
          resp.code = res.code
          api.request({
            url: `${server}auth/login`,
            method: 'POST',
            data: resp,
            success(response) {
              sessionId = response.data.sessionId
              getApp().setData('hasAdminPassword', response.data.hasAdminPassword)
              resolve(sessionId)
            },
            fail(err) {
              console.error(JSON.stringify(err))
              reject()
            }
          })
        },
        fail(err) {
          console.error(JSON.stringify(err))
          reject()
        }
      })
    },
    fail(err) {
      console.error(JSON.stringify(err))
      reject()
    }
  })
}

let request = (obj) => {
  let param = {}
  // resp.data.errorCode && resp.status==200
  let success = obj.success || noop
  // resp.status!=200
  let fail = obj.fail || noop
  let complete = obj.complete || noop
  delete obj.success
  delete obj.fail
  delete obj.complete
  combine(param, obj) 
  if(false!=obj.showLoading && !obj.toast)api.showLoading({
    title: obj.loading || '',
  })
  
  param.success = (resp) => {
    debug(param.url, obj.method||'GET', obj.data||'', JSON.stringify(resp.data, null, 2))
    if (false !== obj.showLoading && !obj.toast)api.hideLoading()
    if(401==resp.statusCode) {
      //回话过期，重置sessionId
      refreshSession((id) => {
        request(obj)
      }, () => {
        fail(resp)
      })
    } else if (200 !== resp.statusCode || resp.data.errorCode) {
      if(false!==obj.showError) api.showModal({
        title: '操作失败',
        content: resp.data.errorMsg || '网络或系统异常',
        showCancel: false,
        confirmText: '关闭',
        confirmColor: '#4980eb'
      })
      fail(resp)
    } else {
      if(obj.toast) {
        api.showToast({
          title: obj.toast.title,
          icon: obj.toast.icon || 'success',
          duration: 2000,
          success() {
            setTimeout(() => success(resp), 1000)
          }
        }) 
      } else {
        success(resp)
      }
    }
  }
  param.fail = (resp) => {
    if (false != obj.showLoading && !obj.toast)api.hideLoading()
    fail({})
    console.error(resp)
  }
  param.complete = () => {
    if (false != obj.showLoading && !obj.toast)api.hideLoading()
    complete()
  }
  param.url = server + param.url
  getSessionId().then((id) => {
    param.header = {
      sessionId: id
    }
    api.request(param)
  }, (err) => {
    api.showModal({
      title: '登录失败',
      content: err.errorMsg,
    })
  })
}

module.exports = request