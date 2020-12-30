import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router-dom'

import VisitStore from '../../../App/stores/visitStore'
import LoadingComponent from '../../../App/layout/LoadingComponent'
import VisitDetailedHeader from './VisitDetailedHeader'
import VisitDetailedInfo from './VisitDetailedInfo'
import VisitDetailedChat from './VisitDetailedChat'
import VisitDetailedSidebar from './VisitDetailedSidebar'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
  id: string
}

const VisitDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {

  const visitStore = useContext(VisitStore)
  const { visit, loadVisit, loadingInitial } = visitStore

  useEffect(() => {
    loadVisit(match.params.id)
  }, [loadVisit, match.params.id])

  if (loadingInitial || !visit) return <LoadingComponent content='Loading activity...' />

  return (
        <Grid>
          <Grid.Column width={10}>
            <VisitDetailedHeader visit={visit} />
            <VisitDetailedInfo visit={visit} />
            <VisitDetailedChat visit={visit} />
          </Grid.Column>
          <Grid.Column width={6}>
            <VisitDetailedSidebar />
          </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDetails)
