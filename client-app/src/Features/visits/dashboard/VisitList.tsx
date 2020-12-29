import React from 'react'
import { Item, Segment, Label, Button } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'

interface IProps {
    visits: IVisit[]
}

const VisitList: React.FC<IProps> = ({ visits }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {visits.map(visit => (
                    <Item key={visit.id}>        
                        <Item.Content>
                            <Item.Header as='a'>{visit.title}</Item.Header>
                            <Item.Meta>{visit.date}</Item.Meta>
                            <Item.Description>
                                <div>{visit.description}</div>
                                <div>{visit.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' />
                                <Label basic content='category' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
      



export default VisitList
