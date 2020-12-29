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

    // ========  API CALLS (see useEffect in App.tsx) ======== //
    @action loadVisits = async () => {
        this.loadingInitial = true      // mutating state with MobX
        try {
            const visits = await agent.Visits.list()    
            visits.forEach(visit => {
                visit.date = visit.date.split('.')[0]
                this.visits.push(visit)
            })
            this.loadingInitial = false
        } catch (error) {
            console.log(error)
            this.loadingInitial = false
        }
    }

    // ========  Replaced Handler methods in App.tsx ======== //

    @action createVisit = async (visit: IVisit) => {
        this.submitting = true
        try {
            await agent.Visits.create(visit)       
            this.visits.push(visit)
            this.editMode = false
            this.submitting = false
        } catch (error) {
            console.log(error)
            this.submitting = false
        }
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedVisit = undefined
    }
    
    @action selectVisit = (id: string) => {
        this.selectedVisit = this.visits.find(v => v.id === id)
        this.editMode = false
    }
}

export default createContext(new VisitStore())