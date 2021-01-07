import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import {format} from 'date-fns'
import VisitListItemAttendees from './VisitListItemAttendees'


const VisitListItem: React.FC<{ visit: IVisit }> = ({ visit }) => {
    const host = visit.attendees.filter(x => x.isHost)[0];      // is the user the host?
    return (
        <Segment.Group>

            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={host.image || 'assets/user.png'} style={{ marginBottom: 3 }} />        
                    <Item.Content>
                        <Item.Header as={Link} to={`/visits/${visit.id}`}> {visit.title}</Item.Header>
                        <Item.Description>Hosted by <Link to={`/profile/${host.username}`}>{host.displayName}</Link></Item.Description>
                        
                        {visit.isHost && 
                            <Item.Description>
                            <Label
                                basic
                                color='orange'
                                content='You created this visit'
                            />
                            </Item.Description>
                        }
                        {visit.isGoing && !visit.isHost &&
                            <Item.Description>
                            <Label
                                basic
                                color='green'
                                content='You are going!'
                            />
                            </Item.Description>
                        }
                    </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment>
                <Icon name='clock' />{format(visit.date, 'h:mm a')}
                <Icon name='marker' />{visit.venue}, {visit.city}
            </Segment>

            <Segment secondary><VisitListItemAttendees attendees={visit.attendees}/></Segment>

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
