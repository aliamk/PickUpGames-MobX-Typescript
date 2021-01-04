import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'

import VisitList from './VisitList'
import LoadingComponent from '../../../App/layout/LoadingComponent'
import { RootStoreContext } from '../../../App/stores/rootStore'

const VisitDashboard: React.FC = () => {

    // ======== MobX's VisitStore for state management - now RootStore ======== //
    const rootStore = useContext(RootStoreContext)
    const {loadVisits, loadingInitial} = rootStore.visitStore;

    // ========  API Calls (see @action loadVisits in visitStore.ts) ======== //
    useEffect(() => {
        loadVisits()
    }, [loadVisits])

    // ========  LOADING SPINNER ======== //
    if (loadingInitial) return <LoadingComponent content='Loading Visits...' />
    
    // ======== DOM Display ======== //
    return (
        <Grid>
            <Grid.Column width={10}>
                <VisitList />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Visit Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDashboard)
