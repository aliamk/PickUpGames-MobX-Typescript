import { observable, action } from 'mobx'
import { createContext } from 'react'
import agent from '../api/agent'
import { IVisit } from '../models/visit_interface'


class VisitStore {
    @observable visits:IVisit[] = []
    @observable selectedVisit: IVisit | undefined
    @observable loadingInitial = false 
    @observable editMode = false
    @observable submitting = false      // the loading icon
    @observable target = ''             // created for the deleteVisit action

    @action loadVisits = () => {
        this.loadingInitial = true      // mutating state with MobX
        agent.Visits.list()    
        .then(visits => {
            // console.log(response)
            visits.forEach(visit => {
                visit.date = visit.date.split('.')[0]
                this.visits.push(visit)
            })
        }).finally(() => this.loadingInitial = false)
    }
    @action selectVisit = (id: string) => {
        this.selectedVisit = this.visits.find(v => v.id === id)
        this.editMode = false
    }
}

export default createContext(new VisitStore())