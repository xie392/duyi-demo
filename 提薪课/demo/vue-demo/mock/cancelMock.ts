/*
 * @Author: xie392
 * @Date: 2023-09-18 12:02:40
 * @Description: 请求取消
 * @See: https://v.douyin.com/ieQj8nN5/
*/
import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

export default [
    {
        url: '/api/search',
        method: 'get',
        response: ({ query }) => {
            const { q = '' } = query
            const list:string[] = []
            // 随机生成 1~5 的随机数
            const num = Math.floor(Math.random() * 5)
            Array.from({length: num}).forEach((_, index) => {
                const text = q + '-'  + faker.lorem.paragraph({ min: 1, max: 1 })
                list.push(text)
            })
            return {
                code: 200,
                data: list,
                message: 'ok',
            }
        },
    },
] as MockMethod[]