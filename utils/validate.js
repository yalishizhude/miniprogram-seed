/**
 * 表单校验逻辑
 */

// 表单校验规则
const validators = {
  required: {
    rule: /.+/,
    msg: '必填项不能为空'
  },
  phone: {
    rule: /^[\d]{11}$/,
    msg: '手机号格式不正确'
  },
  password: {
    rule: /^\d{6}$/,
    msg: '密码必须为6位数字'
  },
  code: {
    rule: /^\d{4}$/,
    msg: '验证码格式不正确'
  },
  same: {
    rule (val='', sVal='') {
      return val===this.data[sVal]
    },
    msg: '密码不一致'
  }
}
/**
 * 表单校验函数
 * 例子：
 * <input data-name="required" bindblur="validate">
 */
let validate = (e, context) => {
  let form = context.data.form || {}
  let name = e.currentTarget.dataset.name
  let value = (e.detail.value || '').trim()
  let validator = e.currentTarget.dataset.validator ? e.currentTarget.dataset.validator .split(',') : []
  if (name) {
    for (let i = 0; i < validator.length; i++) {
      let ruleName = validator[i].split('=')[0]
      let ruleValue = validator[i].split('=')[1]
      let rule = validators[ruleName].rule || /.*/
      if ('function' === typeof rule) {
        form[name] = rule.call(context, value, ruleValue) ? '' : validators[ruleName].msg
      } else {
        form[name] = rule.test(value) ? '' : validators[ruleName].msg
      }
      context.setData({
        form: form
      })
      if (form[name]) break;
    }
    form.$dirty = true
    form.$invalidMsg = ''
    for( let p in form) {
      if(p!=='$invalidMsg' && p!=='$dirty') form.$invalidMsg = form[p].trim() ? form[p] : form.$invalidMsg
    }
    context.setData({
      form
    })
  } else {
    console.error('缺少name属性值或validator属性值不合法')
  }
}
/**
 * 校验必填项是否为空
 * validateRequired(['phone', 'code'])
 */
let validateRequired = (properties, context) => {
  let form = context.data.form
  properties.forEach((item) => {
    if(!validators.required.rule.test(context.data[item] || '')) form[item] = validators.required.msg
  })
  form.$dirty = true
  form.$invalidMsg = ''
  for (let p in form) {
    if (p !== '$invalidMsg' && p !== '$dirty') form.$invalidMsg = form[p].trim() ? form[p] : form.$invalidMsg
  }
  context.setData({
    form
  })
}

module.exports = {
  validate,
  validateRequired
}