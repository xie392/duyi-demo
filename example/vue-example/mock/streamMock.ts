/*
 * @Author: xie392
 * @Date: 2023-09-18 12:02:40
 * @Description: 数据的流式获取
 * @See: https://v.douyin.com/iexwVnv8/
*/
import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

const content = faker.lorem.paragraph({ min: 3, max: 5 })

export default [
  {
    url: '/api/stream',
    method: 'post',
    // response: () => {
    //   return response(200, 'success', {content})
    // },
    rawResponse: async (req, res) => {
      // 设置响应头，指定内容类型为流
      res.setHeader('Content-Type', 'application/octet-stream');
      // 创建一个可写流，并将其绑定到响应对象
      const stream = res;

      // 将内容分成小块，每个小块一个字符，并逐个发送
      for (const char of content) {
        stream.write(char);
        await new Promise(resolve => setTimeout(resolve, 100)); // 添加延迟以模拟逐字逐字发送
      }
      res.end()
    }
  },
] as MockMethod[]