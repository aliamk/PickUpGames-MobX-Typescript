import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IVisit } from '../../../App/models/visit_interface';
import {format} from 'date-fns';

const VisitDetailedInfo: React.FC<{visit: IVisit}> = ({ visit }) => {

    return (
        <Segment.Group>

        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='teal' name='info' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{visit.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(visit.date!, 'eeee do MMMM')} at {format(visit.date!, 'h:mm a')}</span>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>
                {visit.venue}, {visit.city}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        
      </Segment.Group>
    )
}

export default VisitDetailedInfo