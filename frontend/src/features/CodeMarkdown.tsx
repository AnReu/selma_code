import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function addDelimiters(str: string): string {
  return `\`\`\`java\n${str}\n\`\`\``;
}

interface CodeMarkdownProps {
  text: string
}

export default function CodeMarkdown(props: CodeMarkdownProps) {
  const { text } = props;

  return (
    <ReactMarkdown
      components={{
        code({
          node, inline, className, children, ...properties
        }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={dark}
              language={match[1]}
              PreTag="div"
              {...properties}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...properties}>
              {children}
            </code>
          );
        },
      }}
    >
      {addDelimiters(text)}
    </ReactMarkdown>
  );
}
