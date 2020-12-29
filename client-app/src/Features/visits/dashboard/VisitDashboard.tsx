import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import VisitDetails from '../details/VisitDetails'
import VisitForm from '../form/VisitForm'
import VisitList from './VisitList'
import VisitStore from '../../../App/stores/visitStore'

interface IProps {
    visits: IVisit[];
    selectVisit: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    setSelectedVisit: (visit: IVisit | null) => void;
    createVisit: (visit: IVisit) => void;
    editVisit: (visit: IVisit) => void;
    deleteVisit: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const VisitDashboard: React.FC<IProps> = ({ 
    setEditMode, 
    setSelectedVisit, 
    createVisit, 
    editVisit, 
    deleteVisit, 
    submitting,
    target 
}) => {
    const visitStore = useContext(VisitStore)
    const {editMode, selectedVisit} = visitStore
    return (
        <Grid>
            <Grid.Column width={10}>
                <VisitList 
                    deleteVisit={deleteVisit} 
                    submitting={submitting} 
                    target={target}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedVisit && !editMode && (
                    <VisitDetails 
                    setEditMode={setEditMode} 
                    setSelectedVisit={setSelectedVisit} 
                    />
                )}

                {editMode && ( 
                    <VisitForm 
                    key={selectedVisit && (selectedVisit.id || 0)} 
                    setEditMode={setEditMode} 
                    visit={selectedVisit!} 
                    createVisit={createVisit} 
                    editVisit={editVisit}  
                    submitting={submitting}
                    />
                )}            
                
                {/* <h2>Activity Filters</h2> */}
            </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDashboard)
