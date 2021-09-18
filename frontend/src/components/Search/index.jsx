// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */
/* eslint-disable react/no-array-index-key,jsx-a11y/tabindex-no-positive */

import React from 'react';
import {
  Tab, Tabs,
} from '@mui/material';
// import { useSelector } from 'react-redux';
// import SearchBar from './Bar';
import SearchResults from './Results';
// import Markdown from '../Markdown';
// import FileUpload from '../FileUpload';
import MainSearchField from './MainSearchField';
import EquationSearchField from './EquationSearchField';
import CodeSearchField from './CodeSearchField';

function Search(props) {
  const { onError } = props;
  const [isLoading] = React.useState(false);
  const [results] = React.useState([]);
  const [resultResponses, setResultResponses] = React.useState([]);
  // const [statusCode, setStatusCode] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  const [query] = React.useState({
    text: [], code: [], equations: [], id: '', exchange: [],
  });

  // const language = useSelector((state) => state.language);
  // const model = useSelector((state) => state.model);

  // TODO: rename variable q. It was previous 'query'
  // const handleQueryChange = (q, title) => {
  //   const stateQuery = { ...q };
  //   stateQuery[title] = q;
  //   // TODO: check value passed to setQuery()
  //   setQuery(stateQuery);
  // };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const handleSearch = () => {
  //   setIsLoading(true);
  //   setResults([]);
  //
  //   let params;
  //   if ([0, 1].includes(tabValue)) {
  //     params = `text=${encodeURIComponent(query.text)}&`
  //              + `code=${encodeURIComponent(query.code)}&`
  //              + `equations=${encodeURIComponent(query.equations)}&`
  //              + `model=${encodeURIComponent(model)}&`
  //              + `model-language=${encodeURIComponent(language)}`;
  //   } else {
  //     params = `id=${encodeURIComponent(query.id)}&`
  //              + `exchange=${encodeURIComponent(query.exchange)}&`
  //              + `model=${encodeURIComponent(model)}&`
  //              + `model-language=${encodeURIComponent(language)}`;
  //   }
  //
  //   fetch(`/api/v1/search?${params}`)
  //     .then((response) => {
  //       if (![200, 404].includes(response.status)) {
  //         throw Error('Bad status code!');
  //       }
  //       setStatusCode(response.status);
  //       return response.json();
  //     })
  //     .then((json) => {
  //       if (statusCode === 404) {
  //         throw Error(json.error);
  //       }
  //       setIsLoading(false);
  //       setResults(json.results);
  //     })
  //     .catch((e) => {
  //       setIsLoading(false);
  //       setResults([]);
  //       onError(e.message !== 'Bad status code!' ? e.message : null);
  //     });
  // };

  const handleRelevanceCheck = (resultId, value) => {
    setResultResponses([...resultResponses, resultId]);

    fetch('/api/v1/relevance', {
      method: 'post',
      body: JSON.stringify({
        result_id: resultId,
        value,
        query,
      }),
    })
      .then((response) => {
        if (response.status !== 204) {
          throw Error('Bad status code!');
        }
      })
      .catch((e) => {
        // TODO: fix error feedback
        // eslint-disable-next-line
        console.log(e);
        onError();
      });
  };

  // const idValidation = (value) => {
  //   let exchange = [];
  // eslint-disable-next-line max-len
  //   const stackexchangeTlds = ['stackexchange', 'stackoverflow', 'serverfault', 'superuser', 'askubuntu'];
  // eslint-disable-next-line max-len
  //   const regex = new RegExp(`:\\/\\/(?:(\\w+)\\.)?(${stackexchangeTlds.join('|')})\\.com/questions/(\\d+)`);
  //   const matched = value.match(regex);
  //
  //   let tempValue = value;
  //
  //   if (matched) {
  //     exchange = [matched[1], matched[2]];
  //     // TODO: fix
  //     // eslint-disable-next-line prefer-destructuring
  //     tempValue = matched[3];
  //   }
  //
  //   handleQueryChange(exchange, 'exchange');
  //
  //   return tempValue;
  // };

  // const textToMarkdown = (text) => `$${text}$`;

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Default" />
        <Tab label="Separated" />
        <Tab label="ID" />
        <Tab label="File" />
      </Tabs>

      <MainSearchField />
      <div>
        <EquationSearchField />
        <CodeSearchField />
      </div>

      {/* <SearchBar */}
      {/*  titles={[{ */}
      {/*    name: 'mono_search', */}
      {/*    query_key: 'text', */}
      {/*    label: 'Text', */}
      {/* eslint-disable-next-line max-len */}
      {/*    helperText: 'This is a Markdown text field. For code use ``` as delimiter, like ```my code here```. For Equations use $ as delimiter.', */}
      {/*  }]} */}
      {/*  multiline */}
      {/*  onQueryChange={handleQueryChange} */}
      {/*  onSearch={handleSearch} */}
      {/*  tabValue={tabValue} */}
      {/*  tabIndex={0} */}
      {/*  child={(state = { mono_search: '' }) => ( */}
      {/*    <Grid item md={8} xs={12}> */}
      {/*      <Markdown text={state.mono_search} /> */}
      {/*    </Grid> */}
      {/*  )} */}
      {/* /> */}

      {/* <SearchBar */}
      {/*  titles={[ */}
      {/*    { */}
      {/*      name: 'text', */}
      {/*      query_key: 'text', */}
      {/*      label: 'Text', */}
      {/*    }, */}
      {/*    { */}
      {/*      name: 'code', */}
      {/*      query_key: 'code', */}
      {/*      label: 'Code', */}
      {/*      inputProps: { */}
      {/*        style: { */}
      {/*          fontFamily: 'Ubuntu Mono', */}
      {/*        }, */}
      {/*      }, */}
      {/*    }, */}
      {/*    { */}
      {/*      name: 'equations', */}
      {/*      query_key: 'equations', */}
      {/*      label: 'Equations', */}
      {/*    }, */}
      {/*  ]} */}
      {/*  onQueryChange={handleQueryChange} */}
      {/*  onSearch={handleSearch} */}
      {/*  tabValue={tabValue} */}
      {/*  tabIndex={1} */}
      {/*  child={(state = { equations: '' }) => ( */}
      {/*    <Grid item md={8} xs={12}> */}
      {/*      <Grid container alignItems="flex-start" justifyContent="flex-start"> */}
      {/*        <Grid item> */}
      {/*          <Markdown text={textToMarkdown(state.equations)} /> */}
      {/*        </Grid> */}
      {/*      </Grid> */}
      {/*    </Grid> */}
      {/*  )} */}
      {/* /> */}

      {/* <SearchBar */}
      {/*  onQueryChange={handleQueryChange} */}
      {/*  onSearch={handleSearch} */}
      {/*  titles={[{ */}
      {/*    name: 'id', */}
      {/*    query_key: 'id', */}
      {/*    label: 'ID or URL', */}
      {/*  }]} */}
      {/*  validation={idValidation} */}
      {/*  tabValue={tabValue} */}
      {/*  tabIndex={2} */}
      {/* /> */}

      {/* <div hidden={tabValue !== 3}> */}
      {/*  <FileUpload */}
      {/*    setResults={setResults} */}
      {/*    setIsLoading={setIsLoading} */}
      {/*    onError={onError} */}
      {/*  /> */}
      {/* </div> */}

      {/* <Box p={2} /> */}

      <SearchResults
        results={results}
        isLoading={isLoading}
        onRelevanceCheck={handleRelevanceCheck}
      />
    </>
  );
}

export default Search;
