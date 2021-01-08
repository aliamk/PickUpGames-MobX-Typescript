import React from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const PhotoWidgetCropper = () => {
    return (
        <Cropper
            src="http://fengyuanchen.github.io/cropper/images/picture.jpg"
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            aspectRatio={16 / 9}
            guides={false}
            crop={this._crop.bind(this)}
            onInitialized={this.onCropperInit.bind(this)}
        />
    )
}

export default PhotoWidgetCropper