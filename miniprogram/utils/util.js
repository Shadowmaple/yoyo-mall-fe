const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 将时间字符串转换为Date对象
const parseTime = s => {
  s = s.replace("-","/")
  return new Date(Date.parse(s))
}

// 获取当前时间
const getCurrentTime = () => {
  return new Date()
}

module.exports = {
  formatTime,
  parseTime,
  getCurrentTime,
}
