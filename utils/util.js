import {env} from './config'

let now = () => (new Date()).getTime()

// 防抖函数封装
let debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result;

  var later = function () {
    var last = now - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = now
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
// 融合对象与函数，基本数据类型直接覆盖
let combine = (target, ...source) => {
  source.forEach(function(arg) {
    if('object' === typeof arg) {
      for(let p in arg) {
        if('array' === typeof arg[p]) {
          target[p] = target[p] || arg[p].concat()
        } else if('object' === typeof arg[p]) {
          target[p] = target[p] || {}
          Object.assign(target[p], arg[p])
        } else if('function' === typeof arg[p]) {
          let fun = target[p] ? target[p] : function(){}
          delete target[p]
          target[p] = function() {
            arg[p].apply(this, arguments)
            fun.apply(this, arguments)
          }
        } else {
          target[p] = target[p] || arg[p]
        }
      }
    }
  })
}
// 将json对象转为url参数
let toUrl = (param) => {
  let array = []
  for(let e in param) {
    array.push(`${e}=${(void 0 !== param[e] && null !== param[e]) ? param[e] : ''}`)
  }
  return '?' + array.join('&')
}
// 过滤对象数组
let filter = (list, filterObj) => {
  let result = {}
  list.forEach((item) => {
    let isEqual = true
    for(let p in filterObj) {
      if(filterObj[p] !== item[p]) {
        isEqual = false
        break
      }
    }
    if(isEqual) result = item
  })
  return result
}
// 输出调试信息
let debug = (...arg) => {
  if ('debug'===env) console.log.apply(null, arg)
}

let noop = function() {} 


module.exports = {
  debounce,
  combine,
  toUrl,
  filter,
  noop,
  debug
}
