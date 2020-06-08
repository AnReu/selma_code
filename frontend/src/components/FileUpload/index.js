import React, {Component} from 'react';

import { Button } from "@material-ui/core";
import { DropzoneDialog } from 'material-ui-dropzone';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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

    fetch('/api/v1/file', {method: 'POST', body: formData})
      .then(response => console.log(response.data))
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