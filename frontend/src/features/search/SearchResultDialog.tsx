import React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import sanitizeHtml from 'sanitize-html';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Result } from '../../app/services/results';
import { useAddRelevanceMutation, Relevance } from '../../app/services/relevances';
import { useAppSelector } from '../../app/hooks';
import { selectSearchState } from './searchSlice';
import Markdown from '../Markdown';

interface SearchResultDialogProps {
  onClose: () => void,
  result: Result;
  open: boolean;
}

export default function SearchResultDialog(props: SearchResultDialogProps) {
  const { result, onClose, open } = props;
  const { id, title, body } = result;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [addRelevance] = useAddRelevanceMutation();
  const search = useAppSelector(selectSearchState);

  const handleUpVote = async () => {
    try {
      const relevance: Relevance = {
        query: {
          id: -1,
          code: search.code,
          equations: search.equation,
          text: search.text,
          exchange: search.exchange,
        },
        result_id: id,
        value: 'yes',
      };
      await addRelevance(relevance);
      throw Error('TODO');
    } catch {
      throw Error('TODO');
    }
  };

  const handleDownVote = () => {
    throw Error('TODO');
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="lg"
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ color: (t) => t.palette.secondary.main, display: 'flex', alignItems: 'center' }}>
        {title}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ mx: (t) => t.spacing(2) }}>
          <Typography variant="body2" color="textPrimary">Is this relevant?</Typography>
        </Box>
        <IconButton onClick={handleUpVote}>
          <ThumbUpIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handleDownVote}>
          <ThumbDownIcon fontSize="small" />
        </IconButton>

      </DialogTitle>
      <DialogContent>
        <DialogContentText />
        <Typography
          component="div"
          variant="body1"
        >
          <Markdown text={body} />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          close
        </Button>
      </DialogActions>

    </Dialog>
  );
}
