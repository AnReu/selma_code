import React from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import DeleteIcon from '@mui/icons-material/Delete';
import { examplesState, Example } from '../../recoil/selectors';
import { QueryState, queryState } from '../../recoil/atoms';

interface ExamplesListItemProps {
  example: Example;
  isLast: boolean;
  onChooseExample: SetterOrUpdater<QueryState>;
}

function ExamplesListItem(props: ExamplesListItemProps) {
  const {
    example: {
      id,
      name,
      text,
      database: db,
      model,
      index,
      code,
      language,
      equation,
      mode,
    }, isLast, onChooseExample: setQuery,
  } = props;

  const handleChooseTemplate = () => {
    console.log(db);
    setQuery({
      text,
      db,
      model,
      index,
      code,
      language,
      equation,
      mode,
      page: 1,
    });
  };

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
        <ListItemButton onClick={handleChooseTemplate}>
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
  const [, setQuery] = useRecoilState(queryState);

  if (examples.length === 0) {
    return <h1>0 Results</h1>;
  }

  return (
    <>
      {examples.map((example, index) => (
        <ExamplesListItem
          key={example.id}
          onChooseExample={setQuery}
          example={example}
          isLast={index === examples.length - 1}
        />
      ))}
    </>
  );
}
