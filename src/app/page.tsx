'use client'
import HelloWorld from '@/components/hello-world'
import { Button } from '@/components/ui/button'
import { useCountStore } from '@/stores/couter'

export default function Home() {
    const count = useCountStore((state) => state.count)
    const increment = useCountStore((state) => state.increment)
    const update = useCountStore((state) => state.update)

    return (
        <div className="container flex justify-center flex-col items-center min-h-screen">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                    Home Page + Shadcn UI
                </h1>
                <HelloWorld />
                <p>Count: {count}</p>
                <div className="flex space-x-2">
                    <Button size="sm" onClick={increment}>
                        Count + 1
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => update({ count: count - 1 })}>
                        Count - 1
                    </Button>
                </div>
            </div>
        </div>
    )
}
