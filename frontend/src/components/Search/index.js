import React, { Component } from 'react';

import SearchBar from "./Bar";
import SearchResults from "./Results";

export default class Search extends Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      query: {text: '', code: '', equations: ''},
      results: [],
      resultResponses: [],
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRelevanceCheck = this.handleRelevanceCheck.bind(this);
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
    fetch('http://127.0.0.1:5000/search?' +
      'text=' + encodeURIComponent(this.state.query.text) + '&' +
      'code=' + encodeURIComponent(this.state.query.code) + '&' +
      'equations=' + encodeURIComponent(this.state.query.equations))
      .then(response => {
        if (response.status !== 200) {
          throw Error('Bad status code!');
        }
        return response.json();
      })
      .then(json =>
        this.setState({
          isLoading: false,
          results: json
        }))
      .catch((e) => {
        this.setState({
          isLoading: false,
          results: [],
        });
        console.log(e);
        this.props.onError();
      });
  }

  handleRelevanceCheck(resultId, value) {
    this.setState(state => {
      return {
        resultResponses: [...state.resultResponses, resultId]
      }
    });
    fetch('http://127.0.0.1:5000/relevance', {
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

  render() {
    return (
      <React.Fragment>
        <SearchBar onQueryChange={this.handleQueryChange} onSearch={this.handleSearch} />
        <SearchResults
          results={this.state.results}
          isLoading={this.state.isLoading}
          onRelevanceCheck={this.handleRelevanceCheck}
        />
      </React.Fragment>
    );
  }
}