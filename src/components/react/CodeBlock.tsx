import { Code } from "astro-expressive-code/components";
import type { FC, ComponentProps } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


interface CodeBlockProps {
	language: ComponentProps<typeof Code>["lang"];
	children: string;
	filename?: string;
}

export const CodeBlock: FC<CodeBlockProps> = ({ language, children, filename }) => {
	return (
		<div className="bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
			<div className="flex p-4">
				{filename && <span className="text-sm text-white font-mono">{filename}</span>}
			</div>
			<div className="flex items-center justify-between p-4 dark:bg-gray-800">
				<SyntaxHighlighter language={language} style={docco}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}