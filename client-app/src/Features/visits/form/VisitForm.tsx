import React, { useState } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'

interface IProps {
    setEditMode: (editMode: boolean) => void;
    visit: IVisit;
}

const VisitForm:React.FC<IProps> = ({ setEditMode, visit: initialFormState }) => {
    const initialiseForm = () => {
        if (initialFormState) {
            return initialFormState
        } else {
            return {
                id: '',
                title: '',
                description: '',
                date: '',
                location: ''
            }
        }
    }

    const [ visit, setVisit ] = useState<IVisit>(initialiseForm)

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' value={visit.title} />
                <Form.TextArea rows={2} placeholder='Description'  value={visit.description} />
                <Form.Input type='date' placeholder='Date'  value={visit.date}/>
                <Form.Input placeholder='Location' value={visit.location} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>            
        </Segment>
    )
}

export default VisitForm
