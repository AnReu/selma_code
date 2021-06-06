import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import rehype2react from 'rehype-react';
import 'katex/dist/katex.min.css';

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(math)
  .use(katex, {
    throwOnError: false,
    displayMode: false,
  })
  .use(rehype2react, { createElement: React.createElement });

export default function Markdown(props) {
  return <>{processor.processSync(props.text).result}</>
}

// TODO: use lint to format files
// TODO: uninstall unused packages
// TODO: fraction missing line
// TODO: refactor this component
// TODO: reuse component this component in other places
// TODO: when done, delete component 'Markdown' and rename this one
// TODO: be sure that we need react-scripts, otherwise uninstall it
// TODO: deal with  eslint-disable import/no-extraneous-dependencies
// TODO: deal with eslint-disable react/destructuring-assignment
