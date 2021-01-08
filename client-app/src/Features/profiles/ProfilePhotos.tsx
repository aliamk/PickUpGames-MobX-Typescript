import React, { useContext, useState } from 'react'
import {Tab, Grid, Header, Button, Card, Image} from 'semantic-ui-react'
import { RootStoreContext } from '../../App/stores/rootStore';
import PhotoUploadWidget from '../../App/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    // Access the profile by bringing in the RootStoreContext and destructuring the profileStore from it
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, loading  } = rootStore.profileStore
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);


    // Once photo is uploaded, setState to false so the widget goes away
    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
      };

    return (
        <Tab.Pane>
        <Grid>

            <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                <Header floated='left' icon='image' content='Photos' />
                    {/* If isCurrentUser is true, show this button */}
                    {isCurrentUser && (
                        <Button
                            onClick={() => setAddPhotoMode(!addPhotoMode)} // toggle 'Add' / 'Cancel'
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        />
                    )}
            </Grid.Column>

            <Grid.Column width={16}>
                {/* If addPhotoMode is true, show the paragraph, else show photos */}
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
                ) : (
                <Card.Group itemsPerRow={5}>
                    {/* If profile is not null, show the photos */}
                    {profile &&
                        profile.photos.map(photo => (
                            <Card key={photo.id}>
                            <Image src={photo.url} />  
                            {isCurrentUser && (
                                <Button.Group fluid widths={2}>
                                    {/* ADD MAIN PHOTO */}
                                    <Button
                                        name={photo.id}
                                        onClick={e => {
                                            setMainPhoto(photo);
                                            setTarget(e.currentTarget.name);
                                        }} 
                                        loading={loading && target === photo.id}                                        
                                        disabled={photo.isMain}
                                        basic
                                        positive
                                        content='Main'
                                    />
                                    {/* DELETE PHOTO */}
                                    <Button
                                        name={photo.id}
                                        disabled={photo.isMain}
                                        basic
                                        negative
                                        icon='trash'
                                    />
                                </Button.Group>
                                )}                  
                            </Card>
                        ))}
                </Card.Group> 
                )}  
            </Grid.Column>

        </Grid>
      </Tab.Pane>
    )
}

export default observer(ProfilePhotos);