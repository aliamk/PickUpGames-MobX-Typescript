import React, { useContext } from 'react'
import {Tab, Grid, Header, Button, Card, Image} from 'semantic-ui-react'
import { RootStoreContext } from '../../App/stores/rootStore';


const ProfilePhotos = () => {
    // Access the profile by bringing in the RootStoreContext and destructuring
    // the profileStore from it
    const rootStore = useContext(RootStoreContext);
    const { profile } = rootStore.profileStore
    return (
        <Tab.Pane>
        <Grid>
            <Header floated='left' icon='image' content='Photos' />
            <Card.Group itemsPerRow={5}>
            {/* If profile is not null... */}
                {profile &&
                  profile.photos.map(photo => (
                    <Card key={photo.id}>
                      <Image src={photo.url} />                    
                    </Card>
                 ))}
              </Card.Group>     
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