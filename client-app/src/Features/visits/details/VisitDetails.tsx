import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

// interface IProps {
//     visits: IVisit[]
// }

const VisitDetails = () => {
    return (
        <Card fluid>
        <Image src='/assets/HospStThomas.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Title</Card.Header>
          <Card.Meta>
            <span>Date</span>
          </Card.Meta>
          <Card.Description>
              Description
          </Card.Description>
        </Card.Content>
        <Card.Content extra>    
            <Button.Group widths={2}>
                <Button basic color='blue' content='Edit' />    
                <Button basic color='grey' content='Cancel' />
            </Button.Group>     
        </Card.Content>
      </Card>
    )
}

export default VisitDetails
