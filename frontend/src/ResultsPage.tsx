import React from 'react';
import Box from '@mui/material/Box';
import { useSearchParams, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination/Pagination';
import PaginationItem from '@mui/material/PaginationItem/PaginationItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import SearchResult from './features/search/SearchResult';
import ResultsNavbar from './features/navbar/ResultsNavbar';
import { queryStringState } from './recoil/selectors';
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
  const queryString = useRecoilValue(queryStringState);
  const [query, setQuery] = useRecoilState(queryState);
  const page = Number(searchParams.get('page')) as number;
  const text = searchParams.get('text') as string;
  const db = searchParams.get('db') as string;
  const model = searchParams.get('model') as string;
  const index = searchParams.get('index') as string;

  React.useEffect(() => {
    setQuery({
      ...query,
      ...{
        text, db, model, index, page,
      },
    });

    const getResults = async () => {
      const URL = 'http://127.0.0.1:5000/api/v1/search?'
        + `text=${text}&`
        + `db=${db}&`
        + `model=${model}&`
        + `index=${index}&`
        + `page=${page}&`
        + 'model-language=english';

      const response = await fetch(URL, { mode: 'cors' });
      const data = await response.json();

      setResults(data.results);
      setIsLoading(false);
    };
    setIsLoading(true);
    getResults();
  }, [searchParams]);

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
    mainContent = (
      <>
        {results!.slice(0, endIndex).map(
          (result) => <SearchResult key={result.id} result={result} />,
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            page={page}
            count={10}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={queryString}
                {...item}
              />
            )}
            sx={{ mt: 4, mb: 8 }}
          />
        </Box>
      </>
    );
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
