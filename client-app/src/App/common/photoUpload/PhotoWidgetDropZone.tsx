import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface IProps {
    setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center', // using 'as' to get around the typescript error
    height: '200px'
};

// When dropzone is active, apply the above style but override the b color with green
const dropzoneActive = {
    borderColor: 'green'
};

const PhotoWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {

  const onDrop = useCallback(acceptedFiles => {

    setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
    }, [setFiles]);
  
// The props in userDropzone get references to the drop area
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
        // Spreading/assigning both style objects so when hovering image over the dropzone
        // want to apply styles but override the b. color with green
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
}

export default PhotoWidgetDropzone;