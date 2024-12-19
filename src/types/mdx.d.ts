import { FileType } from '@/utils/enum'

export interface MenuItem {
    ext?: string
    title: string,
    url: string,
    type: FileType
    items?: MenuItem[]
}

export interface MDXPath {
    url: string
    ext?: string
}

export interface MDXParams {
    path: []
}

export interface MDXRoutes {
    name: string
    path: string
    ext: string
}