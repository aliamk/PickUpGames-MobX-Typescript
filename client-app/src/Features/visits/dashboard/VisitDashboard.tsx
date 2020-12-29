import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import VisitDetails from '../details/VisitDetails'
import VisitForm from '../form/VisitForm'
import VisitList from './VisitList'

interface IProps {
    visits: IVisit[];
    selectVisit: (id: string) => void;
    selectedVisit: IVisit | null;
}

const VisitDashboard: React.FC<IProps> = ({ visits, selectVisit, selectedVisit }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <VisitList visits={visits} selectVisit={selectVisit} />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedVisit && <VisitDetails visit={selectedVisit}/> }                
                <VisitForm />
                {/* <h2>Activity Filters</h2> */}
            </Grid.Column>
        </Grid>
    )
}

export default VisitDashboard
