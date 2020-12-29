import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'

interface IProps {
    visit: IVisit;
    setEditMode: (editMode: boolean) => void;
}

const VisitDetails: React.FC<IProps> = ({ visit, setEditMode }) => {
    return (
        <Card fluid>
        <Image src={`/assets/locationImages/${visit.location}.png`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{visit.title}</Card.Header>
          <Card.Meta>
            <span>{visit.date}</span>
          </Card.Meta>
          <Card.Description>
            {visit.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>    
            <Button.Group widths={2}>
                <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />    
                <Button basic color='grey' content='Cancel' />
            </Button.Group>     
        </Card.Content>
      </Card>
    )
}

export default VisitDetails
