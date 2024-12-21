import { GlobalResponse } from '@/utils/response'
import fs from 'fs'
import { NextRequest } from 'next/server'
import path from 'path'

export const GET = (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url)
        const filePath = searchParams.get('path')
        if (!filePath) return GlobalResponse.error('请输入参数')
        const content = fs.readFileSync(path.join(process.cwd(), 'public', filePath), 'utf-8')
        return GlobalResponse.success({ content })
    } catch {
        return GlobalResponse.error('Error Page')
    }
}
