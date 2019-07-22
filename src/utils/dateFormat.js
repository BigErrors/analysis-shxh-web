const dateForMatMap = new Map([
  ['date', new Map([
    ['yyyy-mm-dd', (dateString) => dateString.substring(0, 4) + '-' + dateString.substring(4, 6) + '-' + dateString.substring(6, 8)],
    ['yyyy-m-d', (dateString) => dateString.substring(0, 4) + '-' + parseInt(dateString.substring(4, 6)) + '-' + parseInt(dateString.substring(6, 8))],
    ['yyyy-mm', (dateString) => dateString.substring(0, 4) + '-' + dateString.substring(4, 6)],
    ['yy-m-d', (dateString) => parseInt(dateString.substring(2, 4)) + '-' + parseInt(dateString.substring(4, 6)) + '-' + parseInt(dateString.substring(6, 8))],
    ['yyyy-m', (dateString) => dateString.substring(0, 4) + '-' + parseInt(dateString.substring(4, 6))],
    ['yy-mm', (dateString) => dateString.substring(2, 4) + '-' + dateString.substring(4, 6)],
    ['yy-m', (dateString) => dateString.substring(2, 4) + '-' + parseInt(dateString.substring(4, 6))],
    ['yyyy年mm月dd日', (dateString) => dateString.substring(0, 4) + '年' + dateString.substring(4, 6) + '月' + dateString.substring(6, 8) + '日'],
    ['yyyy年m月d日', (dateString) => dateString.substring(0, 4) + '年' + parseInt(dateString.substring(4, 6)) + '月' + parseInt(dateString.substring(6, 8)) + '日'],
    ['yyyy年mm月', (dateString) => dateString.substring(0, 4) + '年' + dateString.substring(4, 6) + '月'],
    ['yyyy年m月', (dateString) => dateString.substring(0, 4) + '年' + parseInt(dateString.substring(4, 6)) + '月'],
    ['yyyy/mm/dd', (dateString) => dateString.substring(0, 4) + '/' + dateString.substring(4, 6) + '/' + dateString.substring(6, 8)],
    ['yyyy/m/d', (dateString) => dateString.substring(0, 4) + '/' + parseInt(dateString.substring(4, 6)) + '/' + parseInt(dateString.substring(6, 8))],
    ['yyyy/mm', (dateString) => dateString.substring(0, 4) + '/' + dateString.substring(4, 6)],
    ['yyyy/m', (dateString) => dateString.substring(0, 4) + '/' + parseInt(dateString.substring(4, 6))]
  ])],
  ['time', new Map([
    ['hh:mi:ss', (dateString) => dateString.substring(8, 10) + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)],
    ['h:mi:ss', (dateString) => parseInt(dateString.substring(8, 10)) + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)],
    ['hh:mi', (dateString) => dateString.substring(8, 10) + ':' + dateString.substring(10, 12)],
    ['h:mi', (dateString) => parseInt(dateString.substring(8, 10)) + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)],
    ['12h:mi:ss', (dateString) => hours12Format(2, dateString)],
    ['12hh:mi:ss', (dateString) => hours12Format(1, dateString)],
    ['12h:mi', (dateString) => hours12Format(2, dateString).substring(0, hours12Format(2, dateString).length - 3)],
    ['12hh:mi', (dateString) => hours12Format(1, dateString).substring(0, hours12Format(2, dateString).length - 3)]
  ])],
  ['week', new Map([
    ['1', '星期一'],
    ['2', '星期二'],
    ['3', '星期三'],
    ['4', '星期四'],
    ['5', '星期五'],
    ['6', '星期六'],
    ['7', '星期日']
  ])]
])
const hours12Format = (type, dateString) => {
  let hour = parseInt(dateString.substring(8, 10))
  if (type === 1) {
    if (hour < 10) {
      return '上午 0' + hour + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    } else if (hour < 12) {
      return '上午 ' + hour + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    } else if (hour < 22) {
      return '下午 0' + (hour - 12) + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    } else {
      return '下午 ' + hour + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    }
  }
  if (type === 2) {
    if (hour < 12) {
      return '上午 ' + hour + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    } else {
      return '下午 ' + (hour - 12) + ':' + dateString.substring(10, 12) + ':' + dateString.substring(12, 14)
    }
  }
}

const getCustomDate = (date, type, format) => {
  if (date.getFullYear !== 'undefined') {
    let fullMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let fullDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let fullHour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let fullMinute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let fullSecond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    date = '' + date.getFullYear() + fullMonth + fullDay + fullHour + fullMinute + fullSecond + date.getDay()
  } else if (date.length !== 15) {
    console.log('请输入正确得字符串格式!')
  }
  if (type === 'week') {
    return dateForMatMap.get(type).get(date.substring(date.length - 1, date.length))
  }
  if (type === 'default') {
    return dateForMatMap.get('date').get('yyyy-mm-dd')(date) + ' ' + dateForMatMap.get('time').get('hh:mi:ss')(date) + ' ' + dateForMatMap.get('week').get(date.substring(date.length - 1, date.length))
  }
  return dateForMatMap.get(type).get(format)(date)
}
// const test = {
//   getCustomDate,
//   dateForMatMap
// }
export { getCustomDate }
