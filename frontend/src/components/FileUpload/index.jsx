// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */

import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      statusCode: null,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    const {
      setIsLoading, setResults, modelLanguage, onError,
    } = this.props;
    const { statusCode } = this.state;
    this.setState({
      open: false,
    });

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('model-language', modelLanguage);

    setIsLoading(true);
    setResults([]);

    fetch('/api/v1/file', { method: 'POST', body: formData })
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
        setIsLoading(false);
        setResults(json.results);
      })
      .catch((e) => {
        setIsLoading(false);
        setResults([]);
        // eslint-disable-next-line
        console.error(e);
        onError(e.message !== 'Bad status code!' ? e.message : null);
      });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    const { open } = this.state;

    return (
      <>
        <Button
          variant="contained"
          onClick={this.handleOpen}
        >
          Upload File
        </Button>
        <DropzoneDialog
          open={open}
          onSave={this.handleSave}
          acceptedFiles={['.pdf', '.tex', '.md']}
          showPreviews
          onClose={this.handleClose}
        />
      </>
    );
  }
}
