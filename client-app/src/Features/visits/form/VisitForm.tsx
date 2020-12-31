import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Segment, Button, Grid } from 'semantic-ui-react'
import { IVisitFormValues } from '../../../App/models/visit_interface'
// import {v4 as uuid} from 'uuid'
import { RouteComponentProps } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../App/common/form/TextInput'
import TextAreaInput from '../../../App/common/form/TextAreaInput'
import SelectInput from '../../../App/common/form/SelectInput' 
import { category } from '../../../App/common/options/categoryOptions';

import VisitStore from '../../../App/stores/visitStore'
import DateInput from '../../../App/common/form/DateInput'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
    id: string
  }

const VisitForm:React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const visitStore = useContext(VisitStore)
    const {/*createVisit, editVisit,*/ submitting, visit: initialFormState, loadVisit, clearVisit} = visitStore
    const [ visit, setVisit ] = useState<IVisitFormValues>({
        id: undefined,
        title: '',
        description: '',
        category: '',
        date: undefined,
        time: undefined,
        venue: '',
        city: '',
    })

    useEffect(() => {
        if (match.params.id && visit.id) {
            loadVisit(match.params.id).then(() => initialFormState && setVisit(initialFormState))
        }
        return () => {
            clearVisit()
        }
    }, [loadVisit, clearVisit, match.params.id, initialFormState, visit.id])

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

     return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name='title' placeholder='Title' value={visit.title} component={TextInput} />
                                <Field name='description' rows={3} placeholder='Description' value={visit.description} component={TextAreaInput} />
                                <Field name='category' placeholder='category' value={visit.category} component={SelectInput} options={category} />
                                <Form.Group>
                                <Field name='date' date={true} placeholder='Date' value={visit.date} component={DateInput}/>
                                <Field name='time' time={true} placeholder='Time' value={visit.date} component={DateInput}/>
                                </Form.Group>
                                <Field name='venue' placeholder='venue' value={visit.venue} component={TextInput} />
                                <Field name='city' placeholder='city' value={visit.city} component={TextInput} />
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
