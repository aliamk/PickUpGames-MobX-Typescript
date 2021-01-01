
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { IVisit } from '../../../App/models/visit_interface';


const visitImageStyle = {
    filter: 'brightness(30%)'
  };
  
  const visitImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

const VisitDetailedHeader: React.FC<{ visit: IVisit }> = ({ visit }) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/locationImages/${visit.category}.jpg`} fluid style={visitImageStyle}/> 
                <Segment style={visitImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={visit.title} style={{ color: 'white' }} />
                                <p>{format(visit.date!, 'eeee do MMMM')}</p>  {/*  long form */}
                                <p>Hosted by{' '}<strong>Bob</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Visit</Button>
                <Button>Cancel attendance</Button>                
                <Button as={Link} to={`/manage/${visit.id}`} color='orange' floated='right'>Manage Visit</Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(VisitDetailedHeader)
