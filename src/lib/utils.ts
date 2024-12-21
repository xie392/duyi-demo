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

export function flattenArray(arr: MenuItem[]) {
    let result: MenuItem[] = []
    arr.forEach((item) => {
        if (item.type === FileType.File) {
            result.push(item)
        }
        if (item.items && item.items.length > 0) {
            const subItems = flattenArray(item.items)
            result = result.concat(subItems)
        }
    })
    return result
}

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
