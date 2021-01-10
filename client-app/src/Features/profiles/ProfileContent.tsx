import React from 'react'
import {Tab} from 'semantic-ui-react'
import ProfilePhotos from './ProfilePhotos'
import ProfileDescription from './ProfileDescription'
import ProfileVisits from './ProfileVisits'

const panes = [
    { menuItem: 'About', render: () => <ProfileDescription />},
    { menuItem: 'Photos', render: () => <ProfilePhotos />},
    { menuItem: 'Visits', render: () => <ProfileVisits />},
    { menuItem: 'Attending', render: () => <Tab.Pane>Attending Content</Tab.Pane>},
    { menuItem: 'Attended', render: () => <Tab.Pane>Attended Content</Tab.Pane>}    
]

const ProfileContent = () => {
    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
}

export default ProfileContent