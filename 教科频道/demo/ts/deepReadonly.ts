/*
 * @Author: xie392
 * @Date: 2023-09-18 22:17:53
 * @Description: 不可变类型
 * @See: https://v.douyin.com/ieQpoEYa/
 */
type DeepReadonly<T extends Record<string|symbol, any>> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>  // 深度克隆
}

interface Person {
    name: string
    age: number
    obj: {
        a: number
    }
}

const person: DeepReadonly<Person> = {
    name: 'xie',
    age: 18,
    obj: {
        a: 1
    }
}

// person.obj.a = 2  // error: 无法为“a”赋值，因为它是只读属性。
