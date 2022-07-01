import React from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRecoilValue } from 'recoil';
import DeleteIcon from '@mui/icons-material/Delete';
import { examplesState, Example } from '../../recoil/selectors';

interface ExamplesListItemProps {
  example: Example;
  isLast: boolean;
}

function ExamplesListItem(props: ExamplesListItemProps) {
  const { example: { id, name }, isLast } = props;
  return (
    <>
      <ListItem
        key={id}
        alignItems="flex-start"
        secondaryAction={(
          <IconButton
            edge="end"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        )}
        disablePadding
      >
        <ListItemButton>
          <ListItemText
            primary={name}
          />
        </ListItemButton>
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
}

export default function ExamplesList() {
  const examples = useRecoilValue(examplesState);

  if (examples.length === 0) {
    return <h1>0 Results</h1>;
  }

  return (
    <>
      {examples.map((example, index) => (
        <ExamplesListItem example={example} isLast={index === examples.length - 1} />
      ))}
    </>
  );
}
