import api from './api'
/**
 * 配置信息
 */
const isDev = !!api.getStorageSync('isDev')

module.exports = {
  server: `https://api.${isDev?'':'xx.'}xxx.com/`,
  env: 'debug'
}
