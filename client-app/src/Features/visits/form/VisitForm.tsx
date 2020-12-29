import React, { FormEvent, useContext, useState } from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import {v4 as uuid} from 'uuid'

import VisitStore from '../../../App/stores/visitStore'

interface IProps {
    visit: IVisit;
}

const VisitForm:React.FC<IProps> = ({ visit: initialFormState }) => {

    const visitStore = useContext(VisitStore)
    const {createVisit, editVisit, submitting, cancelFormOpen} = visitStore

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
        if (visit.id.length === 0) {
            let newVisit = {
                ...visit,
                id: uuid()
            }
            createVisit(newVisit)
        } else {
            editVisit(visit)
        }
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
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date'  value={visit.date}/>
                <Form.Input onChange={handleInputChange} name='location' placeholder='Location' value={visit.location} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
            </Form>            
        </Segment>
    )
}

export default VisitForm
