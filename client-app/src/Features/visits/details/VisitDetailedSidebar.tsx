import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { IAttendee } from '../../../app/models/visit_interface';
import { observer } from 'mobx-react-lite';

// interface IProps {
//   attendees: IAttendee[];
// }

const VisitDetailedSidebar: React.FC = () => {
    return (
        <Fragment>
            <Segment textAlign='center' style={{ border: 'none' }} attached='top' secondary inverted color='teal' >

            </Segment>
            <Segment attached>
                <List relaxed divided>

                    <Item style={{ position: 'relative' }}>
                  
                        <Label
                        style={{ position: 'absolute' }}
                        color='orange'
                        ribbon='right'
                        >
                        Host
                        </Label>
        
                    <Image size='tiny' src='/assets/user.png' />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                       
                        </Item.Header>
                       
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                    </Item.Content>
                    </Item>

                </List>
            </Segment>
        </Fragment>
    )
}

export default  observer(VisitDetailedSidebar);
