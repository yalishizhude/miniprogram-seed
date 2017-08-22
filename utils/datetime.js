/**
 * 日期处理函数
 */

let formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let formatDate = (date=new Date()) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

let formatTime = (date=new Date()) => {
  let hour = date.getHours()
  let minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

let formatDatetime = (date) => formatDate(date) + ' ' + formatTime(date)

let toDatetime = (dateString) => {
  return new Date(dateString.replace(/\-/g, '/'))
}

let getTomorrow = (date=new Date()) => {
  return new Date(date.getTime() + 1000 * 60 * 60 * 24)
}

let getAfterDays = (date=new Date(), days=180) => {
  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days)
}

let formatDateStr = (dateString) => {
  let date = new Date(dateString.replace(/\-/g, '/'))
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${year}年${month}月${day}日`
}
module.exports = {
  formatDate,
  formatTime,
  formatDatetime,
  toDatetime,
  getTomorrow,
  getAfterDays,
  formatDateStr
}
