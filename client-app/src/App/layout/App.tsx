import React, { useEffect, Fragment, useContext } from 'react'
import { Container } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { Route} from 'react-router-dom'

import HomePage from '../../Features/home/HomePage'
import NavBar from '../../Features/nav/NavBar'
import VisitDashboard from '../../Features/visits/dashboard/VisitDashboard'
import LoadingComponent from '../layout/LoadingComponent'
import VisitStore from '../stores/visitStore'
import VisitForm from '../../Features/visits/form/VisitForm'
import VisitDetails from '../../Features/visits/details/VisitDetails'


const App = () => {

  // ======== MobX's VisitStore for state management ======== //
  const visitStore = useContext(VisitStore)

  // ========  API CALLS (see @action loadVisits in visitStore.ts) ======== //
  useEffect(() => {
    visitStore.loadVisits()
  }, [visitStore])

  // ========  LOADING SPINNER ======== //
  if (visitStore.loadingInitial) return <LoadingComponent content='Loading Visits...' />
  
  // ======== DISPLAY DOM ======== //
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/visits' component={VisitDashboard} />
        <Route exact path='/visits/:id' component={VisitDetails} />
        <Route exact path='/createVisit' component={VisitForm} />
      </Container>
    </Fragment>
  )
}

export default observer(App) 
