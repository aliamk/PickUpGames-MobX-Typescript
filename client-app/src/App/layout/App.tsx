import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import { Header, Image, List } from 'semantic-ui-react'
import { IVisit } from '../models/visit_interface'


const App = () => {
  const [ visits, setVisits ] = useState<IVisit[]>([])
  
  useEffect(() => {
    axios.get<IVisit[]>('http://localhost:5000/api/visits')
    .then((response) => {
      // console.log(response)
      setVisits(response.data)
    })
  }, [])
  
  return (
    <div>
      <Header as='h2'>
        <Image src='../../../public/heart_logo.png' as='a' size='mini' href='http://localhost:3000' />
        <Header.Content>Pinga</Header.Content>
      </Header>

      <List>
          {visits.map(visit => (
            <List.Item key={ visit.id }>{ visit.title }</List.Item>
          ))}
      </List>
    </div>
  )

}

export default App 