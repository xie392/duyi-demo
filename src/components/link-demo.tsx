import Link from "next/link"

export const LinkButtonMemo = () => {
    return (
        <div className='flex flex-col gap-2'>
            <Link className="text-black" href="/docs/提薪课/文档/JS中的文档注释">JS中的文档注释</Link>
            <Link className="text-black" href="/docs/提薪课/文档/你真正理解虚拟DOM吗">你真正理解虚拟DOM吗</Link>
        </div>
    )
}