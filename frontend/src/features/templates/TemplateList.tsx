import { List, Typography } from '@mui/material';
import React from 'react';
import { useGetTemplatesQuery } from '../../app/services/templates';
import TemplateListItem from './TemplateListItem';

interface TemplateListProps {
  onClose: () => void;
}

export default function TemplateList(props: TemplateListProps) {
  const { onClose } = props;
  const { data: templates } = useGetTemplatesQuery();

  if (templates?.length === 0) {
    return (<Typography variant="subtitle1">No templates yet...</Typography>);
  }

  return (
    <List>
      {templates?.map((t) => <TemplateListItem onClose={onClose} key={t.id} template={t} />)}
    </List>
  );
}
