import React from 'react';
import Box from '@mui/material/Box';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination/Pagination';
import { useRecoilState } from 'recoil';
import { Typography } from '@mui/material';
import SearchResult from './features/search/SearchResult';
import ResultsNavbar from './features/navbar/ResultsNavbar';
import { queryState } from './recoil/atoms';

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
  const [results, setResults] = React.useState<Result[] | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [endIndex] = React.useState(10);
  const [query, setQuery] = useRecoilState(queryState);
  const page = Number(searchParams.get('page')) as number;
  const text = searchParams.get('text') as string;
  const database = searchParams.get('database') as string;
  const model = searchParams.get('model') as string;
  const index = searchParams.get('index') as string;
  const navigate = useNavigate();

  React.useEffect(() => {
    setQuery({
      ...query,
      ...{
        text, database, model, index, page,
      },
    });

    const getResults = async () => {
      const URL = 'http://localhost:5000/api/v1/search?'
        + `text=${text}&`
        + `database=${database}&`
        + `model=${model}&`
        + `index=${index}&`
        + `page=${page}&`
        + 'model-language=english';

      const response = await fetch(URL, { mode: 'no-cors' });
      const data = await response.json();

      setResults(data.results);
      setIsLoading(false);
    };
    setIsLoading(true);
    getResults();
  }, [searchParams]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate({
      search: createSearchParams({
        text, // TODO: review non-null assertion operator (aka !)
        database,
        model,
        index,
        language: 'english',
        page: `${value}`,
      }).toString(),
    });
  };

  let mainContent = <>TODO: Error</>;

  if (isLoading) {
    mainContent = (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (Array.isArray(results)) {
    if (results.length === 0) {
      mainContent = <Typography variant="h1" color="text.primary">😭 0 Results</Typography>;
    } else {
      mainContent = (
        <>
          {results!.slice(0, endIndex).map(
            (result) => <SearchResult key={result.id} result={result} />,
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              color="secondary"
              page={page}
              count={10}
              onChange={handlePageChange}
              sx={{ mt: 4, mb: 8 }}
            />
          </Box>
        </>
      );
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      bgcolor: 'background.paper',
      minHeight: '100%',
    }}
    >
      <ResultsNavbar />
      <main style={{
        maxWidth: 'sm',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '135px',
        paddingTop: '12px',
      }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex', justifyContent: 'center', flexDirection: 'column', flexGrow: 1,
          }}
        >
          {mainContent}
        </Container>
      </main>
    </Box>
  );
}
