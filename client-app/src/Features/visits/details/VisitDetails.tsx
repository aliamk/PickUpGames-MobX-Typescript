import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import VisitStore from '../../../App/stores/visitStore'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    setSelectedVisit: (visit: IVisit | null) => void;
}

const VisitDetails: React.FC<IProps> = ({ 
  setEditMode, 
  setSelectedVisit 
}) => {
  const visitStore = useContext(VisitStore)
  const { selectedVisit: visit } = visitStore
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
                <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />    
                <Button onClick={() => setSelectedVisit(null)} basic color='grey' content='Cancel' />
            </Button.Group>     
        </Card.Content>
      </Card>
    )
}

export default observer(VisitDetails)
