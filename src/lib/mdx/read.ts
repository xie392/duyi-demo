import path from 'path'
import fs from 'fs'
import { MDX_CONFIG } from '@/config/mdx'
import { MDXPath, MDXRoutes, MenuItem } from '@/types/mdx'
import { FileType } from '@/utils/enum'
import { parsePath } from '@/lib/utils'

/**
 * 生成文件菜单
 * @param dir 基本路径，默认：/public/docs
 * @returns
 */
export function generateMdxDirsToMenu(dir: string = ''): MenuItem[] {
    const tree: MenuItem[] = []
    try {
        const mdxPath = dir ? dir : path.join(process.cwd(), MDX_CONFIG.BASE_PATH)
        const files = fs.readdirSync(mdxPath)

        for (const file of files) {
            const filePath = path.join(mdxPath, file)
            const isDir = fs.statSync(filePath).isDirectory()
            const title = isDir ? file : removeFileExtension(file)
            const extractPath = getRelativePath(filePath)
            const ext = getFileExtension(filePath)

            const node: MenuItem = {
                title,
                url: removeFileExtensionAndKeepPath(extractPath),
                type: isDir ? FileType.Dir : FileType.File,
                ext,
                key: Math.random().toString(36).substr(2, 9)
            }

            if (isDir) {
                const subTree = generateMdxDirsToMenu(filePath)
                node.items = subTree
            }

            tree.push(node)
        }

        return tree
    } catch (error: any) {
        console.error(error.message)
        return []
    }
}

/**
 * 截取路径
 * @param filePath
 * @returns
 */
export function getRelativePath(filePath: string): string {
    const basePath = filePath.replace(/\\/g, '/').split('/').slice(1).join('/')
    const startIndex = basePath.indexOf(MDX_CONFIG.SLICE_NAME)
    return basePath.slice(startIndex - 1)
}

/**
 * 去除文件扩展名
 * @param filePath
 * @returns
 */
export function removeFileExtension(filePath: string): string {
    return path.parse(filePath).name
}

/**
 * 获取文件扩展名
 * @param filePath
 * @returns
 */
export function getFileExtension(filePath: string): string {
    return path.parse(filePath).ext
}

/**
 * 去除文件扩展名，并保留原路径
 * @param filePath
 * @returns
 */
export function removeFileExtensionAndKeepPath(filePath: string): string {
    return path.parse(filePath).dir + '/' + path.parse(filePath).name
}

/**
 * 生成路由
 * @param menu
 */
export function extractMDXMenuPaths() {
    const menu = generateMdxDirsToMenu()
    const paths: MDXPath[] = []

    const generatePaths = (menu: MenuItem[]): void => {
        menu.forEach((item) => {
            if (item.type === FileType.File) {
                const url = item.url.replace(/\.[^.]+$/, '')
                paths.push({
                    url,
                    ext: item.ext
                })
            }
            if (item.items) {
                generatePaths(item.items)
            }
        })
    }
    generatePaths(menu)
    return paths
}

/**
 * 获取文件内容
 * @param {MDXParams} params
 * @returns
 */
export function getMDXContent(filePath: string[]): string {
    const basePath = path.join(process.cwd(), 'public', parsePath(filePath) + '.md')
    console.log('basePath', basePath)
    // 读取文件
    const content = fs.readFileSync(basePath, 'utf-8')
    return content
}

/**
 * 生成路由表
 * @param {MenuItem} menu
 * @returns MDXRoutes[]
 */
export function generateRoutes(menu: MenuItem[]): MDXRoutes[] {
    const routes: { name: string; path: string; ext: string }[] = []
    const generateRoutes = (menu: MenuItem[]): void => {
        menu.forEach((item) => {
            if (item.type === FileType.File) {
                const url = item.url.replace(/^\/docs\//, '')
                routes.push({
                    name: item.title,
                    path: url,
                    ext: item.ext ?? '.md'
                })
            }
            if (item.items) {
                generateRoutes(item.items)
            }
        })
    }
    generateRoutes(menu)
    return routes
}

/**
 * 根据名字去匹配路由
 * @param {MenuItem[]} menu
 * @param {string} name
 */
export function matchRouteByName(menu: MenuItem[], name: string): MenuItem | undefined {
    return menu.find((item) => item.title === name)
}
