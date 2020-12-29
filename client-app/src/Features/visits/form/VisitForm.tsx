import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'

interface IProps {
    setEditMode: (editMode: boolean) => void;
}

const VisitForm:React.FC<IProps> = ({ setEditMode }) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea rows={2} placeholder='Description' />
                <Form.Input type='date' placeholder='Date' />
                <Form.Input placeholder='Location' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>            
        </Segment>
    )
}

export default VisitForm
