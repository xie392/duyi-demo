import path from 'path'
import fs from 'fs'

/**
 * 读取目录下的所有文件
 * @param dirName
 * @returns
 */
export function readDirAllFile(dirName: string): string[] {
    const filePath = path.join(process.cwd(), dirName)
    const files = fs.readdirSync(filePath)
    return files.filter((file) => file.startsWith('.md'))
}

/**
 * 生成菜单
 */
export function generateMenu(): string[] {
    const filePath = path.join(process.cwd(), '/posts')
    const files = fs.readdirSync(filePath)
    const menu = []
    for (const file of files) {
        const dirPath = path.join(filePath, file)
        const isDir = fs.statSync(dirPath).isDirectory()
        if (isDir) {
            const subFiles = fs.readdirSync(dirPath)
            const subMenu = subFiles.filter((subFile) => subFile.startsWith('.md'))
        }
    }
    return menu
}
