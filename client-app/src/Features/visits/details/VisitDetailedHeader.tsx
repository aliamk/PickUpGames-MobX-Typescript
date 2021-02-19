
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { IVisit } from '../../../App/models/visit_interface';
import { RootStoreContext } from '../../../App/stores/rootStore';


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

    const host = visit.attendees.filter(x => x.isHost)[0];      // is the user the host?
    const rootStore = useContext(RootStoreContext);
    const {attendVisit, cancelAttendance, loading} = rootStore.visitStore

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/locationImages/${visit.venue}.jpg`} fluid style={visitImageStyle}/> 
                <Segment style={visitImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={visit.title} style={{ color: 'white' }} />
                                <p>{format(visit.date, 'eeee do MMMM')}</p>  {/*  long form */}
                                <p>
                                    Hosted by{' '}
                                    <Link to={`/profile/${host?.username}`}>
                                        <strong>{host?.displayName}</strong>
                                    </Link>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment clearing attached='bottom'>
                {visit.isHost ? (
                    <Button as={Link} to={`/manage/${visit.id}`} color='orange' floated='right'>Manage Game</Button>
                ) : visit.isGoing ? (
                    <Button loading={loading} onClick={cancelAttendance}>Cancel Attendance</Button> 
                ) : (
                    <Button loading={loading} onClick={attendVisit} color='teal'>Join Game</Button>
                )}             
            </Segment>

        </Segment.Group>
    )
}

export default observer(VisitDetailedHeader)
