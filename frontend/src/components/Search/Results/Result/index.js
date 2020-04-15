import React  from 'react';

import { Paper, ListItem } from '@material-ui/core';
import styled from 'styled-components';

import MathJax from "react-mathjax3";

const StyledPaper = styled(Paper)`
  width: 100%;
  padding: 10px;
`;

const Result = ({ result }) => {
  result.text = result.text.replace(/<img[^>]*>/g, '');

  return (
    <ListItem disableGutters={true}>
      <StyledPaper>
        <MathJax.Context
          input='tex'
          options={{
            tex2jax: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
              processEscapes: true,
            }
          }}
        >
          <MathJax.Html html={ result.text } />
        </MathJax.Context>
      </StyledPaper>
    </ListItem>
  );
};

export default Result;