import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
// import Typography from '@mui/material/Typography';
import Markdown from '../Markdown';
import CodeMarkdown from '../CodeMarkdown';
import { Result } from '../../app/services/results';
import SearchResultDialog from './SearchResultDialog';

interface SearchResultProps {
  result: Result;
}

export default function SearchResult(props: SearchResultProps) {
  const { result } = props;
  const {
    title, body, language,
  } = result;
  const [open, setOpen] = React.useState(false);

  const content = (language === 'java')
    ? <CodeMarkdown text={body} />
    : <Markdown text={body} />;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardHeader title={title} sx={{ pb: 0 }} />
          <CardContent sx={{ py: 0 }}>
            {content}
          </CardContent>
        </CardActionArea>
      </Card>
      <SearchResultDialog result={result} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
