import React, { Component } from 'react';

import { Box, Grid, Tab, Tabs } from "@material-ui/core";
import MathJax from 'react-mathjax3';

import SearchBar from "./Bar";
import SearchResults from "./Results";
import Markdown from "../Markdown";
import FileUpload from "../FileUpload";

export default class Search extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      query: {text: [], code: [], equations: [], id: '', exchange: []},
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
    this.setState(state => {
      let stateQuery = Object.assign({}, state.query);
      stateQuery[title] = query;
      return { query: stateQuery };
    });
  }

  handleSearch() {
    this.setState({
      isLoading: true,
      results: [],
    });

    let params;
    if ([0, 1].includes(this.state.tabValue)) {
      params = 'text=' + encodeURIComponent(this.state.query.text) + '&' +
               'code=' + encodeURIComponent(this.state.query.code) + '&' +
               'equations=' + encodeURIComponent(this.state.query.equations) + '&' +
               'model=' + encodeURIComponent(this.props.model) + '&' +
               'model-language=' + encodeURIComponent(this.props.modelLanguage)
    } else {
      params = 'id=' + encodeURIComponent(this.state.query.id) + '&' +
               'exchange=' + encodeURIComponent(this.state.query.exchange) + '&' +
               'model=' + encodeURIComponent(this.props.model) + '&' +
               'model-language=' + encodeURIComponent(this.props.modelLanguage)
    }

    fetch('/api/v1/search?' + params)
      .then(response => {
        if (![200, 404].includes(response.status)) {
          throw Error('Bad status code!');
        }

        this.setState({
          statusCode: response.status,
        });

        return response.json();
      })
      .then(json => {
        if (this.state.statusCode === 404) {
          throw Error(json.error);
        }

        this.setState({
          isLoading: false,
          results: json.results
        });
      })
      .catch((e) => {
        this.setState({
          isLoading: false,
          results: [],
        });
        console.log(e);
        this.props.onError(e.message !== 'Bad status code!' ? e.message : null);
      });
  }

  handleRelevanceCheck(resultId, value) {
    this.setState(state => {
      return {
        resultResponses: [...state.resultResponses, resultId]
      }
    });
    fetch('/api/v1/relevance', {
      method: 'post',
      body: JSON.stringify({
        result_id: resultId,
        value: value,
        query: this.state.query,
      })})
      .then(response => {
        if (response.status !== 204) {
          throw Error('Bad status code!');
        }
      })
      .catch((e) => {
        console.log(e);
        this.props.onError();
      });
  }

  handleTabChange(event, newValue) {
    this.setState({
      tabValue: newValue,
    });
  }

  setResults(results) {
    this.setState({
      results: results,
    });
  }

  setIsLoading(isLoading) {
    this.setState({
      isLoading: isLoading,
    });
  }

  render() {
    const id_validation = (value) => {
      let exchange = [];
      const stackexchange_tlds = ['stackexchange', 'stackoverflow', 'serverfault', 'superuser', 'askubuntu'];
      const regex = new RegExp(`:\\/\\/(?:(\\w+)\\.)?(${stackexchange_tlds.join('|')})\\.com/questions/(\\d+)`);
      let matched = value.match(regex);

      if (matched) {
        exchange = [matched[1], matched[2]];
        value = matched[3];
      }

      this.handleQueryChange(exchange, 'exchange');

      return value;
    };

    return (
      <React.Fragment>
        <Tabs
          value={this.state.tabValue}
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
          titles={[{
            name: 'mono_search',
            query_key: 'text',
            label: 'Text',
            helperText: 'This is a Markdown text field. For code use ``` as delimiter,<br/> like ```my code here```. For Equations use $ as delimiter.',
          }]}
          multiline={true}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          tabValue={this.state.tabValue}
          tabIndex={0}
          child={(state={mono_search: ''}) => {
            return (
              <Grid item md={8} xs={12}>
                <Markdown source={state.mono_search} />
              </Grid>
            )
          }}
        />

        <SearchBar
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
                  fontFamily: 'Ubuntu Mono'
                }
              },
            },
            {
              name: 'equations',
              query_key: 'equations',
              label: 'Equations',
            }
          ]}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          tabValue={this.state.tabValue}
          tabIndex={1}
          child={(state={equations: ''}) => {
            return (
              <Grid item md={8} xs={12}>
                <Grid container alignItems="flex-start" justify="flex-start">
                  <Grid item>
                    <MathJax.Context
                      input='tex'
                      options={{
                        asciimath2jax: {
                          delimiters: []
                        },
                      }}
                    >
                      <div>
                        <MathJax.Node>{state.equations}</MathJax.Node>
                      </div>
                    </MathJax.Context>
                  </Grid>
                </Grid>
              </Grid>
            )
          }}
        />

        <SearchBar
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          titles={[{
            name: 'id',
            query_key: 'id',
            label: 'ID or URL',
          }]}
          validation={id_validation}
          tabValue={this.state.tabValue}
          tabIndex={2}
        />

        <div hidden={this.state.tabValue !== 3}>
          <FileUpload
            setResults={this.setResults}
            setIsLoading={this.setIsLoading}
            onError={this.props.onError}
            modelLanguage={this.props.modelLanguage}
          />
        </div>

        <Box p={2} />

        <SearchResults
          results={this.state.results}
          isLoading={this.state.isLoading}
          onRelevanceCheck={this.handleRelevanceCheck}
        />
      </React.Fragment>
    );
  }
}