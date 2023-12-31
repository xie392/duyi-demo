
/**
 * 数字转中文
 * 
 * @see:https://v.douyin.com/ieaCXeU3/
 * @param {Number} num  万亿以下的数字
 * @returns {String}
 * @example
 * numToChinese(12323400)  // 一千二百三十二万三千四百
 * numToChinese(1111)      // 一千一百一十一
 */
function numToChinese(num) {
    // 1、将数字转换为字符串，以万为单位分割
    const numStr =  num.toString().replace(/(?=(\d{4})+$)/g,',').split(',').filter(Boolean)

    const chars = ['零','一','二','三','四','五','六','七','八','九']
    const units = ['','十','百','千']

    // 处理多个零的情况
    function handleZreo(str) {
        return str.replace(/零{2,}/g,'零').replace(/零+$/,'')
    }

    // 转换四位数
    function _transform(n) {
        if(n === '0000')  return chars[0]
        let reslut = ''
        for (let i = 0; i < n.length; i++) {
            // 取出中文数字
            let c = chars[+n[i]] 
            // 取出单位 个 十 百 千
            let u = units[n.length - i - 1]
            // 0 不加单位
            if(c === chars[0]) {
                u = ''
            }
            reslut += c + u
        }
        reslut = handleZreo(reslut)
        return reslut
    }

    const bigUnit = ['','万','亿']
    let reslut = ''
    // 2、转换每一部分，再加上单位
    for (let i = 0; i < numStr.length; i++) {
        const part = numStr[i]
        const c = _transform(part)
        let u = bigUnit[numStr.length - i - 1]
        if(c === chars[0] ) {
            u = ''
        }
        reslut += c + u
    }
    // 去除多余的零
    reslut = handleZreo(reslut)
    return reslut
}

/**
 * 数字转中文，且中文数字为繁体
 * 
 * @param {*} num   万亿以下的数字
 * @returns 
 */
function toBeChineseNumber(num) {
    const reslut = numToChinese(num)
    const map = {
        '零': '零',
        '一': '壹',
        '二': '贰',
        '三': '叁',
        '四': '肆',
        '五': '伍',
        '六': '陆',
        '七': '柒',
        '八': '捌',
        '九': '玖',
        '十': '拾',
        '百': '佰',
        '千': '仟',
        '万': '万',
        '亿': '亿',
    }
    return reslut.split('').map(s=>map[s]).join('')
}

console.log(numToChinese('12323400'))  // 一千二百三十二万三千四百
console.log(numToChinese('1111'))        // 一千一百一十一
console.log(toBeChineseNumber('12340000123400'))  // 壹拾贰叁仟肆佰亿零壹拾贰万叁仟肆佰

