import React, { Fragment, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Label } from 'semantic-ui-react'
import {format} from 'date-fns';

import { RootStoreContext } from '../../../App/stores/rootStore'
import VisitListItem from './VisitListItem'
// import { IVisit } from '../../../App/models/visit_interface';


const VisitList: React.FC = () => {
    
    const rootStore = useContext(RootStoreContext)
    const {visitsByDate} = rootStore.visitStore

    return (
        <Fragment>
            {visitsByDate.map(([group, visits]) => (
                <Fragment key={group} >
                    <Label size='large' color='blue' >
                        {format(group, 'eeee do MMMM')}
                    </Label>        
   
                    <Item.Group divided>
                        {visits.map(visit => (
                            <VisitListItem key={visit.id} visit={visit} />
                        ))}
                    </Item.Group>

                </Fragment>
            ))}
        </Fragment>
    )
}

export default observer(VisitList)
