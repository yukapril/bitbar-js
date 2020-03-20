const separator = '---'
const br = '\n'

const createSeparator = level => '--'.repeat(level)
const removeEndBr = str => str.replace(/\n$/, '')
const getType = obj => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

/**
 * 将对象数据转化为字符串
 * @param obj
 * @param options
 * @param level
 * @returns {string}
 */
const convertObjectToString = (obj, options, level) => {
  const newObj = { ...options, ...obj }
  if (!newObj.text) {
    throw new Error('[ERR]1002: ' + JSON.stringify(newObj) + ' should provide `text`.')
  }
  // 标题
  const text = createSeparator(level) + obj.text + '|'
  // 竖线后面的参数，需过滤标题后遍历
  const params = Object.keys(newObj).filter(key => key !== 'text').map(key => {
    const value = newObj[key]
    if (key !== 'submenu') {
      const type = getType(value)
      if (type === 'string' || type === 'number' || type === 'boolean') {
        return key + '="' + value + '"'
      } else {
        throw new Error('[ERR]1003: ' + JSON.stringify(value) + ' should be string/number.')
      }
    } else {
      return br + mapLines(value, options, level + 1)
    }
  }).join(' ')
  return text + removeEndBr(params)
}

/**
 * 处理数组数据
 * @param list
 * @param options
 * @param level
 * @returns {string}
 */
const mapLines = (list, options, level) => {
  const result = list.map(line => {
    const type = getType(line)
    if (line === separator) {
      // 分隔符必须优先处理，防止加入竖线
      return createSeparator(level) + line + br
    } else if (type === 'string') {
      // 按照对象形式处理
      return convertObjectToString({ text: line }, options, level) + br
    } else if (type === 'object') {
      // 对象需要转化为字符串
      return convertObjectToString(line, options, level) + br
    } else {
      throw new Error('[ERR]1001: ' + JSON.stringify(line) + ' not support.')
    }
  }).join('')
  return removeEndBr(result)
}

const bitbar = (list, options) => {
  console.log(mapLines(list, options, 0))
}

bitbar.separator = separator
bitbar.darkMode = process.env.BitBarDarkMode === '1'
bitbar.create = bitbar

module.exports = bitbar
