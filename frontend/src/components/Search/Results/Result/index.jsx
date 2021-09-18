// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types,react/no-array-index-key */

import React from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import Markdown from '../../../Markdown';

const useStyles = makeStyles(() => ({
  heading: {
    flexBasis: '33.3%',
    flexShrink: 0,
    flexGrow: 1,
  },
  formControl: {
    paddingRight: '2%',
  },
  AccordionDetails: {
    flexDirection: 'column',
  },
}));

const Result = ({
  result, expanded, onExpand, onRelevanceCheck,
}) => {
  const classes = useStyles();

  return (
    <Accordion
      expanded={expanded === result.id}
      onChange={onExpand(result.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.exp}>
        <div className={classes.heading}>
          <Markdown text={`Document: ${result.text}`} />
        </div>
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
      </AccordionSummary>
      <AccordionDetails className={classes.AccordionDetails}>
        <Markdown text={result.text} />
        <div>
          <RouterLink to={`/document/${result.id}`} target="_blank">
            Full Document
          </RouterLink>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Result;
