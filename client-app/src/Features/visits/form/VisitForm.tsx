import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Segment, Button, Grid } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import {v4 as uuid} from 'uuid'
import { RouteComponentProps } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../App/common/form/TextInput'

import VisitStore from '../../../App/stores/visitStore'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
    id: string
  }

const VisitForm:React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const visitStore = useContext(VisitStore)
    const {createVisit, editVisit, submitting, visit: initialFormState, loadVisit, clearVisit} = visitStore
    const [ visit, setVisit ] = useState<IVisit>({
        id: '',
        title: '',
        description: '',
        date: '',
        location: ''
    })

    useEffect(() => {
        if (match.params.id && visit.id.length === 0) {
            loadVisit(match.params.id).then(() => initialFormState && setVisit(initialFormState))
        }
        return () => {
            clearVisit()
        }
    }, [loadVisit, clearVisit, match.params.id, initialFormState, visit.id.length])


    // const handleSubmit = () => {
    //     if (visit.id.length === 0) {
    //         let newVisit = {
    //             ...visit,
    //             id: uuid()
    //         }
    //         createVisit(newVisit).then(() => history.push(`/visits/${newVisit.id}`) );
    //     } else {
    //         editVisit(visit).then(() => history.push(`/visits/${visit.id}`) )
    //     }
    // }

    const handleFinalFormSubmit = (values: any) => {
        console.log(values)
      };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setVisit({ ...visit, [name]: value})
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name='title' placeholder='Title' value={visit.title} component={TextInput} />
                                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description'  value={visit.description} />
                                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date'  value={visit.date}/>
                                <Form.Input onChange={handleInputChange} name='location' placeholder='Location' value={visit.location} />
                                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                                <Button onClick={() => history.push('/visits')}  floated='right' type='button' content='Cancel' />
                            </Form>  
                        )}
                    />          
                </Segment>
            </Grid.Column>
        </Grid>       
    )
}

export default observer(VisitForm)
