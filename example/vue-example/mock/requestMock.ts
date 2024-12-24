/*
 * @Author: xie392
 * @Date: 2023-09-17 10:44:22
 * @Description: 
 */
import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

type InfoItem = {
    id: string
    age: number
    name: string
    gender: '男' | '女'
    major: string
}

const infoList: InfoItem[] = []
for (let i = 0; i < 500; i++) {
  infoList.push({
    id: faker.string.uuid(),
    age: faker.number.int({ min: 0, max: 100 }),
    name: faker.person.fullName(),
    gender: ['男', '女'][Math.floor(Math.random() * 2)] as '男' | '女',
    major: faker.person.jobArea()
  })
}

function response(code: number, message: string, data: any): any {
  return {
    code,
    message,
    data
  }
}

export default [
  {
    url: '/api/request',
    method: 'get',
    response: () => {
      return response(200, 'success', infoList)
    },
  },
] as MockMethod[]
