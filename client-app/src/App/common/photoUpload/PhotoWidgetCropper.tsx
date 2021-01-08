import React, { useRef } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
    setImage: (file: Blob) => void;
    imagePreview: string;
  }  

const PhotoWidgetCropper: React.FC<IProps> = ({ setImage, imagePreview }) => {

    // Get reference to the cropper element from the DOM
    const cropper = useRef(null);

    const cropImage = () => {
        if (
            // Does the cropper ref exist? If yes, just return
          cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined') {
          return;
        }
        // Else, get the cropper object and convert it to a blob
        cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob: any) => {
            // set image state to blob with type of image or jpg
            setImage(blob); 
          }, 
          'image/jpeg');
      };

    return (
        <Cropper
            ref={cropper}
            src={imagePreview}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            aspectRatio={1 / 1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={cropImage}
        />
    )
}

export default PhotoWidgetCropper