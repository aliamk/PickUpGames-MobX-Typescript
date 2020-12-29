import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'

import VisitList from './VisitList'
import VisitStore from '../../../App/stores/visitStore'
import LoadingComponent from '../../../App/layout/LoadingComponent'


const VisitDashboard: React.FC = () => {

    // ======== MobX's VisitStore for state management ======== //
    const visitStore = useContext(VisitStore)

    // ========  API Calls (see @action loadVisits in visitStore.ts) ======== //
    useEffect(() => {
        visitStore.loadVisits()
    }, [visitStore])

    // ========  LOADING SPINNER ======== //
    if (visitStore.loadingInitial) return <LoadingComponent content='Loading Visits...' />
    
    // ======== DOM Display ======== //
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
