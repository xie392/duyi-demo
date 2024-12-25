import { MDX_CONFIG } from '@/config/mdx'
import { MenuItem } from '@/types/mdx'
import { FileType } from '@/utils/enum'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * 解析路径
 * @param url
 */
export function parsePath(url: string[]): string {
    const path = `/${MDX_CONFIG.SLICE_NAME}/` + url.join('/')
    return decodeURIComponent(path)
}

/**
 * 匹配两个路径是否一致
 * @param {string} path1
 * @param {string} path2
 * @returns
 */
export function isSamePath(path1: string, path2: string): boolean {
    return path1 === path2
}

/**
 * 解码路径
 * @param {string[]} path
 * @returns string[]
 */
export function decodePath(path: string[]): string[] {
    return path.map(decodeURIComponent)
}

/**
 * 展平菜单
 * @param arr     菜单数组
 * @param fileTypes 保留的文件类型, 默认保留文件
 * @returns
 */
export function flattenArray(arr: MenuItem[], fileTypes: FileType[] = [FileType.File]) {
    let result: MenuItem[] = []
    arr.forEach((item) => {
        if (fileTypes.includes(item.type)) {
            result.push(item)
        }
        if (item.items && item.items.length > 0) {
            const subItems = flattenArray(item.items, fileTypes)
            result = result.concat(subItems)
        }
    })
    return result
}

/**
 * 模糊搜索菜单
 * @param flattenedData 菜单数组
 * @param name 搜索关键字
 * @returns 搜索结果
 */
export function fuzzySearch(flattenedData: MenuItem[], name: string): MenuItem[] {
    const result: MenuItem[] = []
    flattenedData.forEach((item) => {
        if (item.title.toLowerCase().includes(name.toLowerCase())) {
            result.push(item)
        }
    })
    return result
}

/**
 * 搜索文档
 * @param {MenuItem[]} menu
 * @param {string} name
 */
export function searchDocs(menu: MenuItem[], name: string) {
    const flatMenu = flattenArray(menu)
    const searchResult = fuzzySearch(flatMenu, name)
    return searchResult
}

/**
 * 解析所有路径
 * @param {string[]} path
 * @returns string[]
 */
export function transformPath(path: string[]): string[] {
    const result: string[] = []
    const decodePath = path.map(decodeURIComponent)
    for (let i = 0; i < decodePath.length; i++) {
        let currentPath = '/' + MDX_CONFIG.SLICE_NAME
        for (let j = 0; j <= i; j++) {
            currentPath += `/${decodePath[j]}`
        }
        result.push(currentPath)
    }
    return result
}

/**
 * 传入路径，返回 key
 * @param {string[]} path
 * @param {MenuItem[]} menu
 * @returns string[]
 */
export function getKeysByPath(path: string[], menu: MenuItem[]): string[] {
    const flatMenu = flattenArray(menu, [FileType.File, FileType.Dir])
    const trPath = transformPath(path)
    const filterMenu = flatMenu.filter((menu) => trPath.includes(menu.url))
    const keys: string[] = filterMenu.map((menu) => menu.key)
    return keys
}
