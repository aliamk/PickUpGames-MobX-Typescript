import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'

import VisitStore from '../../../App/stores/visitStore'
import ActivityListItem from './ActivityListItem'


const VisitList: React.FC = () => {
    
    const visitStore = useContext(VisitStore)
    const {visitsByDate} = visitStore

    return (
        <Segment clearing>
            <Item.Group divided>
                {visitsByDate.map(visit => (
                   <ActivityListItem key={visit.id} visit={visit} />
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(VisitList)
