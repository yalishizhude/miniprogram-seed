import request from './utils/request'

let self = {}
App({
  onLaunch(p) {
    self = this
  },
  data: {},
  // 缓存全局数据
  setData(key, value) {
    this.data[key] = value
  },
  // 获取全局数据
  getData(key) {
    return this.data[key]
  }
})
