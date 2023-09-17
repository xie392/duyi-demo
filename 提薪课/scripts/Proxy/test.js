/*
 * @Author: xie392
 * @Date: 2023-09-17 18:22:56
 * @Description: 使用代理实现单例
 * @See: https://v.douyin.com/ie9K97AL/
 */
const MyVideo = require('./proxy')

const v1 = new MyVideo()
const v2 = new MyVideo()

console.log("v1 === v2:",v1 === v2)