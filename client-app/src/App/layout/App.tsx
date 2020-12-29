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
  }

  // const handleOpenCreateForm = (id: string) => {
  //   setSelectedVisit(null)
  //   // setEditMode(true)
  // }
  
  useEffect(() => {
    axios.get<IVisit[]>('http://localhost:5000/api/visits')
    .then((response) => {
      // console.log(response)
      setVisits(response.data)
    })
  }, [])
  
  return (
    <Fragment>
      <NavBar /*openCreateForm={handleOpenCreateForm}*//>
      <Container style={{marginTop: '7em'}}>
        <VisitDashboard 
          visits={ visits } 
          selectVisit={handleSelectVisit} 
          selectedVisit={selectedVisit}
          editMode={editMode}
          setEditMode={setEditMode}
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