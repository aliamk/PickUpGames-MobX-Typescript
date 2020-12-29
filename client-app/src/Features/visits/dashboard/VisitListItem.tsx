import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, Button, Segment, Icon } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'


const VisitListItem: React.FC<{ visit: IVisit }> = ({ visit }) => {

    return (
        <Segment.Group>
            
            <Segment>
                <Item>
                    <Item.Image size='tiny' circular src='assets/user.png' />        
                <Item.Content>
                    <Item.Header as='a'>{visit.title}</Item.Header>
                    <Item.Description>Hosted by Bob</Item.Description>
                </Item.Content>
                </Item>
            </Segment>

            <Segment>
                <Icon name='clock' />{visit.date}
                <Icon name='marker' />{visit.location}
            </Segment>

            <Segment secondary>
                Attendees will go here
            </Segment>

            <Segment clearing>
                <span>{visit.description}</span>
                <Button 
                    as={Link} to={`/visits/${visit.id}`}
                    floated='right' 
                    content='View' 
                    color='blue' 
                />   
            </Segment>
        </Segment.Group>
    )
}

export default VisitListItem
