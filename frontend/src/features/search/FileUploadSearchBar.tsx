import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dropzone from 'react-dropzone';

export default function FileUploadSearchBar() {
  const [files, setFiles] = React.useState<File[]>([]);
  const handleAcceptedFiles = (droppedFiles: File[]) => {
    setFiles(droppedFiles);
  };

  const truncate = (input: string, max: number) => {
    if (input.length > max) {
      return `${input.substring(0, max)}...`;
    }
    return input;
  };

  const handleDeleteFile = (deletedFile: File) => {
    const filesCopy = [...files];
    files.forEach((f, index) => {
      if (f.name === deletedFile.name) {
        filesCopy.splice(index, 1);
      }
    });
    setFiles(filesCopy);
  };

  const handleSearch = () => {
    throw Error('TODO');
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <Box id="lol">
          <Stack spacing={4}>
            <Box
              {...getRootProps()}
              sx={{
                justifyContent: 'center',
                minWidth: '70vh',
                minHeight: '10vh',
                bgcolor: (theme) => theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
                border: '2px dashed #909090',
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1" component="p" color="textPrimary">
                Drag n drop some files here, or click to select files
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                onClick={handleSearch}
                variant="contained"
                sx={{ mx: 'auto', px: (theme) => theme.spacing(4) }}
              >
                Search
              </Button>
            </Box>
          </Stack>

          <Stack direction="row" sx={{ minHeight: '32px' }} spacing={2}>
            <Typography variant="button" component="p" color="textPrimary">
              Files:
            </Typography>
            {
              files.length > 0
              && files.map((f) => (
                // eslint-disable-next-line max-len
                <Chip key={f.name} label={truncate(f.name, 10)} onDelete={() => handleDeleteFile(f)} />
              ))
            }
          </Stack>

        </Box>
      )}
    </Dropzone>
  );
}
