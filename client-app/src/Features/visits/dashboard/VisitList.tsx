import React, { Fragment, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Label, Segment } from 'semantic-ui-react'

import VisitStore from '../../../App/stores/visitStore'
import VisitListItem from './VisitListItem'


const VisitList: React.FC = () => {
    
    const visitStore = useContext(VisitStore)
    const {visitsByDate, deleteVisit, submitting, target} = visitStore

    return (
        <Fragment>
            {visitsByDate.map(([group, visits]) => (
                <Fragment key={group} >
                    <Label size='large' color='blue' >
                        {group}
                    </Label>            
                    <Segment clearing>
                        <Item.Group divided>
                            {visits.map(visit => (
                                <VisitListItem key={visit.id} visit={visit} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </Fragment>
    )
}

export default observer(VisitList)
