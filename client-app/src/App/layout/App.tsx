import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { IVisit } from '../models/visit_interface'
import NavBar from '../../Features/nav/NavBar'
import VisitDashboard from '../../Features/visits/dashboard/VisitDashboard'
import agent from '../api/agent'
import LoadingComponent from '../layout/LoadingComponent'
import VisitStore from '../stores/visitStore'
import { observer } from 'mobx-react-lite'


const App = () => {

  const visitStore = useContext(VisitStore)

  const [ visits, setVisits ] = useState<IVisit[]>([])
  const [ selectedVisit, setSelectedVisit ] = useState<IVisit | null>(null)
  const [ editMode, setEditMode ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ submitting, setSubmitting ] = useState(false)
  const [ target, setTarget ] = useState('')


  // ======== HANDLERS ======== //
  const handleEditVisit = (visit: IVisit) => {
    setSubmitting(true)
    agent.Visits.update(visit).then(() => {
      setVisits([ ...visits.filter(v => v.id !== visit.id), visit])
      setSelectedVisit(visit)
      setEditMode(false)
    }).then(() => setSubmitting(false))
  }

  const handleDeleteVisit = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    agent.Visits.delete(id).then(() => {
      setVisits([ ...visits.filter(v => v.id !== id)])
    }).then(() => setSubmitting(false))
  }
  
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
        <VisitDashboard 
          setEditMode={setEditMode}
          setSelectedVisit={setSelectedVisit}
          editVisit={handleEditVisit}
          deleteVisit={handleDeleteVisit}
          submitting={submitting}
          target={target}
          />
      </Container>
    </Fragment>
  )
}

export default observer(App) 
