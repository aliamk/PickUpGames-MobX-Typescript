import React, { useContext, useState } from 'react'
import {Tab, Grid, Header, Button, Card, Image} from 'semantic-ui-react'
import { RootStoreContext } from '../../App/stores/rootStore';
import PhotoUploadWidget from '../../App/common/photoUpload/PhotoUploadWidget';

const ProfilePhotos = () => {
    // Access the profile by bringing in the RootStoreContext and destructuring
    // the profileStore from it
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser, uploadPhoto, uploadingPhoto  } = rootStore.profileStore
    const [addPhotoMode, setAddPhotoMode] = useState(true);

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
                    <PhotoUploadWidget uploadPhoto={uploadPhoto} uploadingPhoto={uploadingPhoto} />
                ) : (
                <Card.Group itemsPerRow={5}>
                    {/* If profile is not null, show the photos */}
                    {profile &&
                        profile.photos.map(photo => (
                            <Card key={photo.id}>
                            <Image src={photo.url} />  
                            {isCurrentUser && (
                                <Button.Group fluid widths={2}>
                                    <Button
                                        onClick={() => setAddPhotoMode(!addPhotoMode)} 
                                        name={photo.id}
                                        disabled={photo.isMain}
                                        basic
                                        positive
                                        content='Main'
                                    />
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

export default ProfilePhotos