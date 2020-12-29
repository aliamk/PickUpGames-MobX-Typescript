import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'

import VisitDetails from '../details/VisitDetails'
import VisitForm from '../form/VisitForm'
import VisitList from './VisitList'
import VisitStore from '../../../App/stores/visitStore'


const VisitDashboard: React.FC = () => {

    const visitStore = useContext(VisitStore)
    const {editMode, visit} = visitStore
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <VisitList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDashboard)
