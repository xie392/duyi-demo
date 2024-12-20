import { MDX_CONFIG } from '@/config/mdx'
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
