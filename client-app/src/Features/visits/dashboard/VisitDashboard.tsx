import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'

interface IProps {
    visits: IVisit[]
}

const VisitDashboard: React.FC<IProps> = ({ visits }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                {visits.map(visit => (
                <List.Item key={ visit.id }>{ visit.title }</List.Item>
                ))}
            </Grid.Column>
            <Grid.Column width={6}>
                {/* <h2>Activity Filters</h2> */}
            </Grid.Column>
        </Grid>
    )
}

export default VisitDashboard
