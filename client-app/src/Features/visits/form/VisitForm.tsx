import React, { FormEvent, useState } from 'react'
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

    const handleSubmit = () => {
        console.log(visit)
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setVisit({ ...visit, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={visit.title} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description'  value={visit.description} />
                <Form.Input onChange={handleInputChange} name='date' type='date' placeholder='Date'  value={visit.date}/>
                <Form.Input onChange={handleInputChange} name='location' placeholder='Location' value={visit.location} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>            
        </Segment>
    )
}

export default VisitForm
