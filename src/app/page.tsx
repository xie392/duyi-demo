import Link from 'next/link'

export default function RootPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">更新中...</h1>
            <Link href="/docs/介绍" className="text-blue-500 hover:underline">
                预览文档
            </Link>
        </div>
    )
}
