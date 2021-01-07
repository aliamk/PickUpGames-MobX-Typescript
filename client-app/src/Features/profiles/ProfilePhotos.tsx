import React, { useContext, useState } from 'react'
import {Tab, Grid, Header, Button, Card, Image} from 'semantic-ui-react'
import { RootStoreContext } from '../../App/stores/rootStore';

const ProfilePhotos = () => {
    // Access the profile by bringing in the RootStoreContext and destructuring
    // the profileStore from it
    const rootStore = useContext(RootStoreContext);
    const { profile, isCurrentUser } = rootStore.profileStore
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    return (
        <Tab.Pane>
        <Grid>
            <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                <Header floated='left' icon='image' content='Photos' />
                    {/* If isCurrentUser is true, show this button */}
                    {isCurrentUser && (
                        <Button
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        />
                    )}
            </Grid.Column>
            <Grid.Column width={16}>
                <Card.Group itemsPerRow={5}>
                    {/* If profile is not null, show the photos */}
                    {profile &&
                        profile.photos.map(photo => (
                            <Card key={photo.id}>
                            <Image src={photo.url} />                    
                            </Card>
                        ))}
                </Card.Group>   
            </Grid.Column>  
        </Grid>
      </Tab.Pane>
    )
}

export default ProfilePhotos

            {/* {isCurrentUser && (
              <Button
                onClick={() => setAddPhotoMode(!addPhotoMode)}
                floated='right'
                basic
                content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              />
            )} */}