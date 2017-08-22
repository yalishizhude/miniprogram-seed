import api from '../utils/api'
module.exports = {
  tabClick(e) {
    let data = e.target ? e.target.dataset : {}
    this.setData({
      selectedTab: data.id || ''
    })
    api.setNavigationBarTitle({
      title: data.name || data.name
    })
  }
}