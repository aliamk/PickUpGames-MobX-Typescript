import { observable, action } from 'mobx'
import { createContext } from 'react'
import agent from '../api/agent'
import { IVisit } from '../models/visit_interface'


class VisitStore {
    @observable visits:IVisit[] = []
    @observable loadingInitial = false 

    @action loadVisits = () => {
        this.loadingInitial = true                  // mutating state with MobX
        agent.Visits.list()    
        .then(visits => {
            // console.log(response)
            visits.forEach(visit => {
                visit.date = visit.date.split('.')[0]
                this.visits.push(visit)
            })
        }).finally(() => this.loadingInitial = false)
    }
}

export default createContext(new VisitStore())