import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'


import "highlight.js/styles/atom-one-dark.css";
import CopyButton from "./copy-button";

import '../../styles/github-markdown-dark.css'

const Markdown = ({ content }: { content: string }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
                pre: ({ children }) => <pre className="not-prose mt-2">{children}</pre>,
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    if (match?.length) {
                        const id = Math.random().toString(36).substring(2, 9);
                        return (
                            <div className="not-prose rounded-md bg-[#2d2d2d] relative md-wrapper">
                                <div className="flex h-12 items-center justify-end px-4 dark:bg-zinc-900">
                                    <CopyButton id={id} />
                                </div>
                                <div className="overflow-x-auto">
                                    <div id={id} className="p-4 pt-0">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <code
                                {...props}
                                className="not-prose rounded bg-gray-100 px-1 dark:bg-zinc-900"
                            >
                                {children}
                            </code>
                        );
                    }
                },
            }}
            className="prose prose-zinc dark:prose-invert markdown-body w-full"
        >
            {content}
        </ReactMarkdown>
    );
};

export default Markdown;
