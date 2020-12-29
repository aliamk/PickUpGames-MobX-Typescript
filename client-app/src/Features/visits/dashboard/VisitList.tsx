import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useContext } from 'react'
import { Item, Segment, Label, Button } from 'semantic-ui-react'
import VisitStore from '../../../App/stores/visitStore'

interface IProps {
    deleteVisit: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const VisitList: React.FC<IProps> = ({ 
    deleteVisit, 
    submitting, 
    target 
}) => {
    const visitStore = useContext(VisitStore)
    const {visitsByDate, selectVisit} = visitStore

    return (
        <Segment clearing>
            <Item.Group divided>
                {visitsByDate.map(visit => (
                    <Item key={visit.id}>        
                        <Item.Content>
                            <Item.Header as='a'>{visit.title}</Item.Header>
                            <Item.Meta>{visit.date}</Item.Meta>
                            <Item.Description>
                                <div>{visit.description}</div>
                                <div>{visit.location}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button 
                                    onClick={() => selectVisit(visit.id)} 
                                    floated='right' 
                                    content='View' 
                                    color='blue' 
                                />
                                <Button 
                                    name={visit.id}
                                    loading={target === visit.id && submitting} 
                                    onClick={(e) => deleteVisit(e, visit.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content='category' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(VisitList)
