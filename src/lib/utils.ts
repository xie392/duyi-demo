import { MDX_CONFIG } from "@/config/mdx"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 解析路径
 * @param url
 */
export function parsePath(url: string[]): string {
  const path = url.join('/')
  return decodeURIComponent(path)
}

/**
 * 匹配两个路径是否一致
 * @param {string} path1
 * @param {string} path2
 * @returns
 */
export function isSamePath(path1: string[], path2: string): boolean {
  const p1 = `/${MDX_CONFIG.SLICE_NAME}/` + parsePath(path1)
  return p1 === path2
}

