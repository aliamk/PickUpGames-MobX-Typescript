import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, Image } from 'semantic-ui-react'

import VisitStore from '../../../App/stores/visitStore'


const VisitDetails: React.FC = () => {

  const visitStore = useContext(VisitStore)
  const { selectedVisit: visit, openEditForm, canceSelectedVisit } = visitStore
  
    return (
        <Card fluid>
        <Image src={`/assets/locationImages/${visit!.location}.png`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{visit!.title}</Card.Header>
          <Card.Meta>
            <span>{visit!.date}</span>
          </Card.Meta>
          <Card.Description>
            {visit!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>    
            <Button.Group widths={2}>
                <Button onClick={() => openEditForm(visit!.id)} basic color='blue' content='Edit' />    
                <Button onClick={canceSelectedVisit} basic color='grey' content='Cancel' />
            </Button.Group>     
        </Card.Content>
      </Card>
    )
}

export default observer(VisitDetails)
