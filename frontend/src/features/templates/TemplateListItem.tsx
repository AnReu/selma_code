import React from 'react';
// MUI Components
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// MUI Icons
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
// Others
import { green } from '@mui/material/colors';
import { Template, useDeleteTemplateMutation } from '../../app/services/templates';
import { useAppDispatch } from '../../app/hooks';
import { setSnackbarText, toggleSnackbar } from '../snackbar/snackbarSlice';
import { applyTemplate, setParams } from '../search/searchSlice';

interface TemplateListItemProps {
  template: Template;
  onClose: () => void;
}

export default function TemplateListItem(props: TemplateListItemProps) {
  const dispatch = useAppDispatch();
  const { template, onClose } = props;

  const [deleteTemplate, { isLoading, isSuccess }] = useDeleteTemplateMutation();

  const buttonSx = {
    ...(isSuccess && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleDeleteTemplate = () => {
    deleteTemplate(template.id as number).then(() => {
      dispatch(setSnackbarText('Template deleted successfully.'));
      dispatch(toggleSnackbar(true));
    });
  };

  const handleSelectTemplate = () => {
    dispatch(applyTemplate(template));
    dispatch(setParams());
    onClose();
  };

  return (
    <>
      <ListItem
        key={template.id}
        alignItems="flex-start"
        secondaryAction={(
          <Box sx={{ m: 1, position: 'relative' }}>
            <IconButton
              sx={buttonSx}
              onClick={handleDeleteTemplate}
              edge="end"
              aria-label="delete"
            >
              {isSuccess ? <CheckIcon /> : <DeleteIcon />}
            </IconButton>
            {isLoading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
            )}
          </Box>

        )}
        disablePadding
      >
        <ListItemButton onClick={handleSelectTemplate}>
          <ListItemText
            primary={template.name}
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" />
    </>
  );
}
