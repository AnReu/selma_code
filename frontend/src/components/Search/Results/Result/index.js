import React  from 'react';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MathJax from "react-mathjax3";

const Result = ({ result, expanded, handleExpand }) => {
  result.text = result.text.replace(/<img[^>]*>/g, '');

  return (
    <ExpansionPanel expanded={expanded === result.id} onChange={handleExpand(result.id)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Document-ID: {result.id}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Result;