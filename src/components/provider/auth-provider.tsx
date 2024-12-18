'use client'
import { useUserStore } from '@/stores/user'
import { redirect, usePathname } from 'next/navigation'

const whiteList = ['/sign-in', '/sign-up']

function AuthProvider({ children }: React.PropsWithChildren<{ children: React.ReactNode }>) {
    const isLogged: string | null = useUserStore((state) => state.token)
    const pathname = usePathname()

    if (!isLogged && !whiteList.includes(pathname)) {
        return redirect('/sign-in')
    }

    // 已登录，但访问登录注册页面，跳转到主页
    if (isLogged && whiteList.includes(pathname)) {
        return redirect('/')
    }

    return children
}

export default AuthProvider
