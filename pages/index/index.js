import request from '../../utils/request'
import {formatDate, formatTime, getTomorrow, getAfterDays} from '../../utils/datetime'
import {combine} from '../../utils/util'
import tab from '../../components/tab'
import { validate,validateRequired } from '../../utils/validate'
import api from '../../utils/api'

let self = {}

let page = {
  data: {
    tabList: [{
      id: 'tab1',
      name: '表单'
    }, {
      id: 'tab2',
      name: '空'
    }],
    selectedTab: 'tab1',
    phone: '',
    refreshText: '下拉刷新',
    form: {}
  },
  onLoad(options) {
    self = this
    self.setData({
      selectedTab: options.tab || 'tab1'
    })
  },
  validate(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
    validate(e, this)
  },
  submit() {
    // 因blur事件在click事件之后触发，避免未校验直接提交
    validateRequired(['phone'], self)
    if(''===self.data.form.$invalidMsg) {
      console.log('valid')
    } else {
      console.log('invalid')
    }
  }
}
combine(page, tab)
Page(page)
