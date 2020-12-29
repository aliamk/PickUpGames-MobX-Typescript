import React, { useState, useEffect, Fragment } from 'react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { IVisit } from '../models/visit_interface'
import NavBar from '../../Features/nav/NavBar'
import VisitDashboard from '../../Features/visits/dashboard/VisitDashboard'


const App = () => {
  const [ visits, setVisits ] = useState<IVisit[]>([])
  const [ selectedVisit, setSelectedVisit ] = useState<IVisit | null>(null)
  const [ editMode, setEditMode ] = useState(false)

  const handleSelectVisit = (id: string) => {
    setSelectedVisit(visits.filter(v => v.id === id)[0])
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedVisit(null)
    setEditMode(true)
  }

  const handleCreateVisit = (visit: IVisit) => {
    setVisits([ ...visits, visit])
    setSelectedVisit(visit)
    setEditMode(false)
  }

  const handleEditVisit = (visit: IVisit) => {
    setVisits([ ...visits.filter(v => v.id !== visit.id), visit])
    setSelectedVisit(visit)
    setEditMode(false)
  }
  
  useEffect(() => {
    axios.get<IVisit[]>('http://localhost:5000/api/visits')
    .then((response) => {
      // console.log(response)
      let visits: IVisit[] = []
      response.data.forEach(visit => {
        visit.date = visit.date.split('.')[0]
        visits.push(visit)
      })
      setVisits(visits)
    })
  }, [])
  
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <VisitDashboard 
          visits={ visits } 
          selectVisit={handleSelectVisit} 
          selectedVisit={selectedVisit}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedVisit={setSelectedVisit}
          createVisit={handleCreateVisit}
          editVisit={handleEditVisit}
          />
      </Container>
    </Fragment>
  )
}

export default App 


/*        <Header as='h2'>
        <Image src='../../../public/heart_logo.png' as='a' size='mini' href='http://localhost:3000' />
        <Header.Content>Pinga</Header.Content>
      </Header> */