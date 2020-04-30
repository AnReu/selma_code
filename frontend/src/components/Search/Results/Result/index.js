import React  from 'react';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import MathJax from "react-mathjax3";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heading: {
    flexBasis: '33.3%',
    flexShrink: 0,
    flexGrow: 1,
  },
  formControl: {
    paddingRight: '2%',
  },
  expansionPanelDetails: {
    flexDirection: "column",
  },
}));

const Result = ({ result, expanded, onExpand, onRelevanceCheck }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded={expanded === result.id}
      onChange={onExpand(result.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>Document-ID: {result.id}</Typography>
        <FormControl
          onChange={(event) => onRelevanceCheck(result.id, event.target.value)}
          className={classes.formControl}
          component="fieldset"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        >
          <FormLabel component="legend">Relevant?</FormLabel>
          <RadioGroup row aria-label="position" name="position">
            <FormControlLabel
              value="no"
              control={<Radio color="primary" />}
              label="No"
              labelPlacement="start"
            />
            <FormControlLabel
              value="yes"
              control={<Radio color="primary" />}
              label="Yes"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
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