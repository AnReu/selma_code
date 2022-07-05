import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
// import Typography from '@mui/material/Typography';
import Markdown from '../Markdown';
import CodeMarkdown from '../CodeMarkdown';

export interface Result {
  acceptedAnswerId?: number | null;
  body: string;
  id: number;
  parentId?: number;
  postTypeId?: number;
  title: string;
  tags: string | null;
  cut: boolean;
  relevantSentence: string;
  language?: string;
  comment?: string;
  url?: string;
}

interface SearchResultProps {
  result: Result;
}

export default function SearchResult(props: SearchResultProps) {
  const { result } = props;
  const {
    title, body, language,
  } = result;

  const content = (language === 'java')
    ? <CodeMarkdown text={body} />
    : <Markdown text={body} />;

  return (
    <>
      <Card sx={{ mb: 4 }}>
        <CardActionArea>
          <CardHeader title={title} sx={{ pb: 0 }} />
          <CardContent sx={{ py: 0 }}>
            {content}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
