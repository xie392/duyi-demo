'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function RootPage() {
    useEffect(() => {
        redirect('/docs/介绍')
    }, [])

    return null
}
