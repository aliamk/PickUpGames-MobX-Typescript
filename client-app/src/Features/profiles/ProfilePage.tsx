import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'

const ProfilePage = () => {
    return (
        <div>
            <Grid.Column widht={16}>
                <ProfileHeader />
            </Grid.Column>
        </div>
    )
}

export default ProfilePage
