import React, { Component } from 'react';

import { Box, Tab, Tabs } from "@material-ui/core";

import SearchBar from "./Bar";
import SearchResults from "./Results";

export default class Search extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      query: {text: '', code: '', equations: '', id: '', exchange: ''},
      results: [],
      resultResponses: [],
      statusCode: null,
      tabValue: 0,
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRelevanceCheck = this.handleRelevanceCheck.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
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
      isLoading: true
    });

    let params = '';
    if (this.state.tabValue === 0) {
      params = 'text=' + encodeURIComponent(this.state.query.text) + '&' +
               'code=' + encodeURIComponent(this.state.query.code) + '&' +
               'equations=' + encodeURIComponent(this.state.query.equations)
    } else {
      params = 'id=' + encodeURIComponent(this.state.query.id) + '&' +
               'exchange=' + encodeURIComponent(this.state.query.exchange)
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

  render() {
    const id_validation = (value) => {
      let exchange = [];
      const stackexchange_tlds = ['stackexchange', 'stackoverflow', 'serverfault', 'superuser', 'askubuntu'];
      const regex = new RegExp(`:\\/\\/(?:(\\w+)\\.)?(${stackexchange_tlds.join('|')})\\.com\/questions\/(\\d+)`);
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
          <Tab label="ID" />
        </Tabs>
        <Box p={1} />
        <SearchBar
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          tabValue={this.state.tabValue}
          tabIndex={0}
        />

        <SearchBar
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          titles={[{
            label: 'id',
            displayLabel: 'ID or URL',
            inputProps: {},
          },]}
          validations={
            {'id': id_validation}
          }
          tabValue={this.state.tabValue}
          tabIndex={1}
        />

        {this.state.tabValue === 1 &&
          <Box p={2} />
        }

        <SearchResults
          results={this.state.results}
          isLoading={this.state.isLoading}
          onRelevanceCheck={this.handleRelevanceCheck}
        />
      </React.Fragment>
    );
  }
}