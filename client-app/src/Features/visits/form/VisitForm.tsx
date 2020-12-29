import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

const VisitForm = () => {
    return (
        <Segment>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea rows={2} placeholder='Description' />
                <Form.Input type='date' placeholder='Date' />
                <Form.Input placeholder='Location' />
            </Form>            
        </Segment>
    )
}

export default VisitForm
