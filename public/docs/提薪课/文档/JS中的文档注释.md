---
    title: JS中的文档注释
    updated: 2024-12-23
    author: xie392
    url: https://v.douyin.com/ie9n8uDC/
---

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



