// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */
/* eslint-disable react/no-array-index-key,jsx-a11y/tabindex-no-positive */

import React, { Component } from 'react';
import {
  Box, Grid, Tab, Tabs,
} from '@material-ui/core';
import SearchBar from './Bar';
import SearchResults from './Results';
import Markdown from '../Markdown';
import FileUpload from '../FileUpload';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      query: {
        text: [], code: [], equations: [], id: '', exchange: [],
      },
      results: [],
      resultResponses: [],
      statusCode: null,
      tabValue: 0,
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRelevanceCheck = this.handleRelevanceCheck.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setResults = this.setResults.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
  }

  handleQueryChange(query, title) {
    this.setState((state) => {
      const stateQuery = { ...state.query };
      stateQuery[title] = query;
      return { query: stateQuery };
    });
  }

  handleSearch() {
    const { tabValue, query, statusCode } = this.state;
    const { model, modelLanguage, onError } = this.props;
    this.setState({
      isLoading: true,
      results: [],
    });

    let params;
    if ([0, 1].includes(tabValue)) {
      params = `text=${encodeURIComponent(query.text)}&`
               + `code=${encodeURIComponent(query.code)}&`
               + `equations=${encodeURIComponent(query.equations)}&`
               + `model=${encodeURIComponent(model)}&`
               + `model-language=${encodeURIComponent(modelLanguage)}`;
    } else {
      params = `id=${encodeURIComponent(query.id)}&`
               + `exchange=${encodeURIComponent(query.exchange)}&`
               + `model=${encodeURIComponent(model)}&`
               + `model-language=${encodeURIComponent(modelLanguage)}`;
    }

    fetch(`/api/v1/search?${params}`)
      .then((response) => {
        if (![200, 404].includes(response.status)) {
          throw Error('Bad status code!');
        }

        this.setState({
          statusCode: response.status,
        });

        return response.json();
      })
      .then((json) => {
        if (statusCode === 404) {
          throw Error(json.error);
        }

        this.setState({
          isLoading: false,
          results: json.results,
        });
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          results: [],
        });
        // eslint-disable-next-line
        console.error(e);
        onError(e.message !== 'Bad status code!' ? e.message : null);
      });
  }

  handleRelevanceCheck(resultId, value) {
    const { query } = this.state;
    const { onError } = this.props;
    this.setState((state) => ({
      resultResponses: [...state.resultResponses, resultId],
    }));
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
        // eslint-disable-next-line
        console.log(e);
        onError();
      });
  }

  handleTabChange(event, newValue) {
    this.setState({
      tabValue: newValue,
    });
  }

  setResults(results) {
    this.setState({
      results,
    });
  }

  setIsLoading(isLoading) {
    this.setState({
      isLoading,
    });
  }

  render() {
    const { tabValue, results, isLoading } = this.state;
    const {
      onError, modelLanguage, model, onCreateTemplate,
    } = this.props;

    const idValidation = (value) => {
      let exchange = [];
      const stackexchangeTlds = ['stackexchange', 'stackoverflow', 'serverfault', 'superuser', 'askubuntu'];
      const regex = new RegExp(`:\\/\\/(?:(\\w+)\\.)?(${stackexchangeTlds.join('|')})\\.com/questions/(\\d+)`);
      const matched = value.match(regex);

      let tempValue = value;

      if (matched) {
        exchange = [matched[1], matched[2]];
        // TODO: fix
        // eslint-disable-next-line prefer-destructuring
        tempValue = matched[3];
      }

      this.handleQueryChange(exchange, 'exchange');

      return tempValue;
    };

    const textToMarkdown = (text) => `$${text}$`;

    return (
      <>
        <Tabs
          value={tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Default" />
          <Tab label="Separated" />
          <Tab label="ID" />
          <Tab label="File" />
        </Tabs>
        <Box p={1} />
        <SearchBar
          modelLanguage={modelLanguage}
          model={model}
          titles={[{
            name: 'mono_search',
            query_key: 'text',
            label: 'Text',
            helperText: 'This is a Markdown text field. For code use ``` as delimiter, like ```my code here```. For Equations use $ as delimiter.',
          }]}
          multiline
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          onCreateTemplate={(template) => onCreateTemplate(template)}
          tabValue={tabValue}
          tabIndex={0}
          child={(state = { mono_search: '' }) => (
            <Grid item md={8} xs={12}>
              <Markdown text={state.mono_search} />
            </Grid>
          )}
        />

        <SearchBar
          modelLanguage={modelLanguage}
          model={model}
          titles={[
            {
              name: 'text',
              query_key: 'text',
              label: 'Text',
            },
            {
              name: 'code',
              query_key: 'code',
              label: 'Code',
              inputProps: {
                style: {
                  fontFamily: 'Ubuntu Mono',
                },
              },
            },
            {
              name: 'equations',
              query_key: 'equations',
              label: 'Equations',
            },
          ]}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          onCreateTemplate={(template) => onCreateTemplate(template)}
          tabValue={tabValue}
          tabIndex={1}
          child={(state = { equations: '' }) => (
            <Grid item md={8} xs={12}>
              <Grid container alignItems="flex-start" justifyContent="flex-start">
                <Grid item>
                  <Markdown text={textToMarkdown(state.equations)} />
                </Grid>
              </Grid>
            </Grid>
          )}
        />

        <SearchBar
          modelLanguage={modelLanguage}
          model={model}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          onCreateTemplate={(template) => onCreateTemplate(template)}
          titles={[{
            name: 'id',
            query_key: 'id',
            label: 'ID or URL',
          }]}
          validation={idValidation}
          tabValue={tabValue}
          tabIndex={2}
        />

        <div hidden={tabValue !== 3}>
          <FileUpload
            setResults={this.setResults}
            setIsLoading={this.setIsLoading}
            onError={onError}
            modelLanguage={modelLanguage}
          />
        </div>

        <Box p={2} />

        <SearchResults
          results={results}
          isLoading={isLoading}
          onRelevanceCheck={this.handleRelevanceCheck}
        />
      </>
    );
  }
}
