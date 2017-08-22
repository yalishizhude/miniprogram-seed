/**
 * 微信原生API封装
 * 建议所有可设置多个参数的API都进行封装
 * 1. 处理兼容性问题
 * 2. 设置默认参数
 * 为了避免代码混乱（一部分调用封装函数，一部分调用wx函数），保证一致性，所有原生API都做封装
 */
export default {
  getStorageSync: wx.getStorageSync,
  getUserInfo: wx.getUserInfo,
  hideLoading: wx.hideLoading ? wx.hideLoading : wx.hideToast,
  login: wx.login,
  navigateBack: wx.navigateBack,
  navigateTo: wx.navigateTo,
  redirectTo: wx.redirectTo,
  reLaunch: wx.reLaunch ? wx.reLaunch : wx.redirectTo,
  request: wx.request,
  scanCode: wx.scanCode,
  setNavigationBarTitle: wx.setNavigationBarTitle,
  showModal(param) {
    let dftParam = {
      confirmColor: '#59cbff'
    }
    wx.showModal(Object.assign(dftParam, param))
  },
  showLoading: wx.showLoading ? wx.showLoading : (param) => {
    let dftParam = {
      icon: 'loading',
      duration: 100000
    }
    wx.showToast(Object.assign(dftParam, param))
  },
  showToast: wx.showToast,
  stopPullDownRefresh: wx.stopPullDownRefresh,
  switchTab: wx.switchTab
}