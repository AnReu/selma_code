import React from 'react';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import SearchResult from './features/search/SearchResult';
import ResultsNavbar from './features/navbar/ResultsNavbar';

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

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const text = searchParams.get('text');
  const db = searchParams.get('db');
  const model = searchParams.get('model');
  const index = searchParams.get('index');

  const [results, setResults] = React.useState<Result[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [endIndex] = React.useState(10);

  React.useEffect(() => {
    const getResults = async () => {
      const URL = 'http://127.0.0.1:5000/api/v1/search?'
        + `text=${text}&`
        + `db=${db}&`
        + `model=${model}&`
        + `index=${index}&`
        + 'model-language=english&';

      const response = await fetch(URL);
      const data = await response.json();

      setResults(data.results);
      setIsLoading(false);
    };

    getResults();
  }, [searchParams]);

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      bgcolor: 'background.paper',
    }}
    >
      <ResultsNavbar />
      <Container maxWidth="md">
        <main style={{
          maxWidth: 'sm',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '135px',
          paddingTop: '12px',
        }}
        >
          {results!.slice(0, endIndex).map(
            (result) => <SearchResult key={result.id} result={result} />,
          )}
        </main>
      </Container>
    </Box>
  );
}
