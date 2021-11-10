import React from 'react';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Markdown from '../Markdown';
import { Result } from '../../app/services/results';
import SearchResultDialog from './SearchResultDialog';

interface SearchResultProps {
  result: Result;
}

export default function SearchResult(props: SearchResultProps) {
  const { result } = props;
  const {
    title, body,
  } = result;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ListItem
        alignItems="flex-start"
      >
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemText
            primary={title}
          >
            <Markdown text={body} />
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" component="li" />
      <SearchResultDialog result={result} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
