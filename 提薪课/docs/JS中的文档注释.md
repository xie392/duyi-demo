<!--
 * @Author: xie392
 * @Date: 2023-09-17 16:44:57
 * @Description: JS中的文档注释
 * @See: https://v.douyin.com/ie9n8uDC/
-->

## 安装

```shell
npm install -g jsdoc
```

## 例子

`example.js`

```js
/**
 * @description: 计算两个值的和
 * 
 * @param {number} a  参数一
 * @param {number} b  参数二
 * @returns {number}  返回值
 */
function add(a, b) {
  return a + b
}
```

## 生成文档

控制台输入 `jsdoc ./doc`



