import React from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './ProfileHeader'
import ProfileContent from './ProfileContent'

const ProfilePage = () => {
    return (
        <div>
            <Grid.Column width={16}>
                <ProfileHeader />
                <ProfileContent />
            </Grid.Column>
        </div>
    )
}

export default ProfilePage
