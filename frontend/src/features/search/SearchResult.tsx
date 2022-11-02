import React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
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
        <CardContent>
          <Link
            variant="h6"
            underline="hover"
            href="#todo"
          >
            {title}
          </Link>
          {content}
        </CardContent>
      </Card>
    </>
  );
}
