import { CodeBlock, CodeBlockProps } from 'react-code-block'
import { renderToString } from 'react-dom/server'

export const Code = ({ children, lines = [], words = [] }: CodeBlockProps) => {
    return (
        <CodeBlock code={renderToString(children)} language="js" lines={lines} words={words}>
            <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="table-row">
                    <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                    <CodeBlock.LineContent className="table-cell">
                        <CodeBlock.Token />
                    </CodeBlock.LineContent>
                </div>
            </CodeBlock.Code>
        </CodeBlock>
    )
}
