import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid, Loader } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroller'

import VisitList from './VisitList'
import VisitFilters from './VisitFilters'
import VisitListItemPlaceholder from './VisitListItemPlaceholder'
import { RootStoreContext } from '../../../App/stores/rootStore'


const VisitDashboard: React.FC = () => {

    // ======== MobX's VisitStore for state management - now RootStore ======== //
    const rootStore = useContext(RootStoreContext)
    const {loadVisits, loadingInitial, setPage, page, totalPages} = rootStore.visitStore;
    const [loadingNext, setLoadingNext] = useState(false)

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadVisits().then(() => setLoadingNext(false));
    };

    // ========  API Calls (see @action loadVisits in visitStore.ts) ======== //
    useEffect(() => {
        loadVisits()
    }, [loadVisits])
 
    // ======== DOM Display ======== //
    return (
        <Grid>
            <Grid.Column width={10} >
                {loadingInitial && page === 0 ? ( <VisitListItemPlaceholder /> ) : ( 
                <InfiniteScroll 
                    pageStart={0} 
                    loadMore={handleGetNext} 
                    hasMore={!loadingNext && page + 1 < totalPages}
                    initialLoad={false}
                >
                    <VisitList />
                </InfiniteScroll>
                )}
            </Grid.Column>

            <Grid.Column width={6}>
                <VisitFilters />
            </Grid.Column>

            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDashboard)
