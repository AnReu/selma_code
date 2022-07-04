import React from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import DeleteIcon from '@mui/icons-material/Delete';
import { examplesState, Example, useExamplesMutations } from '../../recoil/selectors';
import { QueryState, queryState } from '../../recoil/atoms';

interface ExamplesListItemProps {
  example: Example;
  isLast: boolean;
  onChooseExample: SetterOrUpdater<QueryState>;
  onClose: () => void;
}

function ExamplesListItem(props: ExamplesListItemProps) {
  const {
    example: {
      id,
      name,
      text,
      url,
      database,
      model,
      index,
      code,
      language,
      equation,
      mode,
    },
    isLast,
    onChooseExample: setQuery,
    onClose: closeDialog,
  } = props;
  const { deleteExample } = useExamplesMutations();

  const handleChooseTemplate = () => {
    const newQuery: QueryState = {
      database,
      model,
      index,
      language,
      mode,
      page: 1,
    };

    if (mode === 'default') {
      newQuery.text = text;
    } else if (mode === 'separated') {
      newQuery.code = code;
      newQuery.equation = equation;
    } else if (mode === 'url') {
      newQuery.url = url;
    } else {
      console.error('TODO');
    }

    setQuery(newQuery);
    closeDialog();
  };

  const handleDelete = () => {
    // TODO: review non-null assertion operator (aka !)
    deleteExample(id!);
    // TODO: Implement error handling in case example cannot be deleted
    closeDialog();
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
            onClick={handleDelete}
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

interface ExamplesListProps {
  onClose: () => void;
}

export default function ExamplesList(props: ExamplesListProps) {
  const { onClose } = props;
  const examples = useRecoilValue(examplesState);
  const [, setQuery] = useRecoilState(queryState);

  if (examples.length === 0) {
    return <h1>0 Results</h1>;
  }

  return (
    <>
      {examples.map((example, index) => (
        <ExamplesListItem
          onClose={onClose}
          key={example.id}
          onChooseExample={setQuery}
          example={example}
          isLast={index === examples.length - 1}
        />
      ))}
    </>
  );
}
