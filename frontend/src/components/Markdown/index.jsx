// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */

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
  const { text } = props;
  return <>{processor.processSync(text).result}</>;
}
