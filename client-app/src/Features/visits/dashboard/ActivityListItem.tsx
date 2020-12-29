import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, Button } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'


const ActivityListItem: React.FC<{ visit: IVisit }> = ({ visit }) => {

    return (
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
                    as={Link} to={`/visits/${visit.id}`}
                    floated='right' 
                    content='View' 
                    color='blue' 
                />
                {/*<Button 
                    name={visit.id}
                    loading={target === visit.id && submitting} 
                    onClick={(e) => deleteVisit(e, visit.id)} 
                    floated='right' 
                    content='Delete' 
                    color='red' 
                />*/}
                <Label basic content='category' />
            </Item.Extra>
        </Item.Content>
    </Item>
    )
}

export default ActivityListItem
