'use client'
import { useConfigStore } from '@/stores/config'
import { useEffect } from 'react'

export const Giscus = () => {
    const theme = useConfigStore((state) => state.theme)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://giscus.app/client.js'
        script.setAttribute('data-repo', process.env.NEXT_PUBLIC_GISCUS_REPO!)
        script.setAttribute('data-repo-id', process.env.NEXT_PUBLIC_GISCUS_REPO_ID!)
        script.setAttribute('data-category', process.env.NEXT_PUBLIC_GISCUS_CATEGORY!)
        script.setAttribute('data-category-id', process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!)
        script.setAttribute('data-mapping', 'pathname')
        script.setAttribute('data-strict', '0')
        script.setAttribute('data-reactions-enabled', '1')
        script.setAttribute('data-emit-metadata', '0')
        script.setAttribute('data-input-position', 'top')
        script.setAttribute('data-theme', theme)
        script.setAttribute('data-lang', 'zh-CN')
        script.setAttribute('data-loading', 'lazy')
        script.setAttribute('crossorigin', 'anonymous')
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, [theme])

    return <div className="giscus mt-20 w-full border-t border-gray-200 dark:border-gray-700 pt-5 overflow-auto"></div>
}
