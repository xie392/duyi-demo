/*
 * @Author: xie392
 * @Date: 2023-09-18 23:15:37
 * @Description: 实现 Optional 
 * @See: https://v.douyin.com/ieQ7ytem/
 */
interface Article {
    title: string
    content: string
    author: string
    date: Date
}

// 看下面 Omit 、Partial 、Pick 的例子
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type CreateArticleOptions = Optional<Article, 'author' | 'date'>

function createArticle(options: CreateArticleOptions) { }

createArticle({title: '11', content: ''})


/**
 * =============================================================================================
 * 下面分别是 Omit 、Partial 、Pick 的例子
 * =============================================================================================
 */

interface Todo {
    title: string
    description: string
    completed: boolean
}

/**
 * Omit
 * 移除某些属性，新类型中不能有这些属性
 */
// 移除两个属性 'description' | 'completed'
type TodoOmit = Omit<Todo, 'description' | 'completed'>

const todo: TodoOmit = {
    title: '1'
}

/**
 * Pick
 * 挑选某些属性,新类型中必须要拥有这些属性
 */
// 挑选两个属性 'title' | 'description'
type TodoPick = Pick<Todo,'title' | 'description'>

const todo2: TodoPick = {
    title: '1',
    description: ''
}

/**
 * Partial
 * 部分属性类型，新类型中变为可选
 */
// 全部类型变为可选
type TodoPartial = Partial<Todo>

const todo3: TodoPartial = {}

