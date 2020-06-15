import React, {Component} from 'react';

import { Button } from "@material-ui/core";
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
      open: false
    });
  }

  handleSave(files) {
    this.setState({
      open: false
    });

    const formData = new FormData();
    formData.append('file', files[0]);

    this.props.setIsLoading(true);
    this.props.setResults([]);

    fetch('/api/v1/file', {method: 'POST', body: formData})
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
        this.props.setIsLoading(false);
        this.props.setResults(json.results);
      })
      .catch((e) => {
        this.props.setIsLoading(false);
        this.props.setResults([]);
        console.log(e);
        this.props.onError(e.message !== 'Bad status code!' ? e.message : null);
      });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <>
        <Button
          variant="contained"
          onClick={this.handleOpen}
        >
          Upload File
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave}
          acceptedFiles={['.pdf']}
          showPreviews={true}
          onClose={this.handleClose}
        />
      </>
    )
  }
}