import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Segment, Button, Grid } from 'semantic-ui-react'
import { VisitFormValues } from '../../../App/models/visit_interface'
import {v4 as uuid} from 'uuid'
import { RouteComponentProps } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../App/common/form/TextInput'
import TextAreaInput from '../../../App/common/form/TextAreaInput'
import SelectInput from '../../../App/common/form/SelectInput' 
import { category } from '../../../App/common/options/categoryOptions';
import { venue } from '../../../App/common/options/venueOptions';
import { combineDateAndTime } from '../../../App/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate'

import VisitStore from '../../../App/stores/visitStore'
import DateInput from '../../../App/common/form/DateInput'

const validate = combineValidators({
 title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});

// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
    id: string
  }

const VisitForm:React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const visitStore = useContext(VisitStore)
    const {createVisit, editVisit, submitting, loadVisit} = visitStore
    
    const [ visit, setVisit ] = useState(new VisitFormValues())
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadVisit(match.params.id)
                .then((visit) => setVisit(new VisitFormValues(visit))
            ).finally(() => setLoading(false))
        }
    }, [loadVisit, match.params.id])


    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time)
        const {date, time, ...visit} = values
        visit.date = dateAndTime
        console.log(visit)
            if (!visit.id) {
        let newVisit = {
            ...visit,
            id: uuid()
        }
        createVisit(newVisit);
        } else {
            editVisit(visit)
        }
      };

     return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm 
                        validate={validate}
                        initialValues={visit}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field name='title' placeholder='Title' value={visit.title} component={TextInput} />
                                <Field name='description' rows={3} placeholder='Description' value={visit.description} component={TextAreaInput} />
                                <Field name='category' placeholder='category' value={visit.category} component={SelectInput} options={category} />
                                <Form.Group>
                                <Field name='date' date={true} placeholder='Date' value={visit.date!} component={DateInput}/>
                                <Field name='time' time={true} placeholder='Time' value={visit.date!} component={DateInput}/>
                                </Form.Group>
                                <Field name='venue' placeholder='venue' value={visit.venue} component={SelectInput} options={venue} />
                                <Field name='city' placeholder='city' value={visit.city} component={TextInput} />
                                <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' positive type='submit' content='Submit' />
                                <Button onClick={visit.id ? () => history.push(`/visits/${visit.id}`) : () => history.push('/visits')} disabled={loading}  floated='right' type='button' content='Cancel' />
                            </Form>  
                        )}
                    />          
                </Segment>
            </Grid.Column>
        </Grid>       
    )
}

export default observer(VisitForm)
