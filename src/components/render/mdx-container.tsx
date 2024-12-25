import { TocList } from '@/components/toc-list'
import '@/styles/mdx.css'
import { MDX_ID } from '@/utils/constants'

export const MdxContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full md:px-10 px-4">
            <div className="mx-auto flex-1 flex-shrink-0 md:px-10 pt-6 pb-40 max-w-screen-xl overflow-hidden">
                {children}
            </div>
            <div className="min-w-80 w-auto xl:block hidden flex-shrink-0" id="mdx-sidebar">
                <div className="fixed top-16 h-full p-5">
                    <TocList id={MDX_ID} />
                </div>
            </div>
        </div>
    )
}
