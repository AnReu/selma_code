import React from 'react';
import parse from 'html-react-parser';
import { MathJax } from 'better-react-mathjax';

export function addDelimiters(str: string): string {
  const regex = /(?<open><span class="math-container" id="[a-z0-9]+">)(?<formel>.*?)(?=<\/span>|$)(?<close><\/span>)/g;
  str = str.replaceAll(regex, '$$$<formel>$$');
  return str;
}
interface MarkdownProps {
  text: string
}

export default function Markdown(props: MarkdownProps) {
  const { text } = props;

  return (
    <>
      <MathJax dynamic>
        {parse(addDelimiters(text))}
      </MathJax>
    </>
  );
}
