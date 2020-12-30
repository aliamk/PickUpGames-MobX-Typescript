import { createContext, SyntheticEvent } from 'react'
import { observable, action, computed, configure, runInAction } from 'mobx'

import agent from '../api/agent'
import { IVisit } from '../models/visit_interface'


// Enables strict mode - state mutations must be confined to within @actions
configure({ enforceActions: 'always' })

class VisitStore {

    @observable visitRegistry = new Map()
    @observable visit: IVisit | null = null;
    @observable loadingInitial = false  // the loading icon for the whole app
    @observable submitting = false      // the loading icon within buttons
    @observable target = ''             // created for the deleteVisit action

    // ========  Sorting Visit posts by date order ======== //
    @computed get visitsByDate() {
        return this.groupVisitsByDate(Array.from(this.visitRegistry.values()))
    }

    groupVisitsByDate(visits: IVisit[]) {
        // Sort all visits in date order
        const sortedVisits = visits.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        )
        // Take the DATE property of the sortedVisits array, and go through each item...
        return Object.entries(sortedVisits.reduce((visits, visit) => {
            const date = visit.date.split('T')[0]
            // If items have matching dates, add the visit to the visits array; if they don't match, just return the visit in its own array
            visits[date] = visits[date] ? [ ...visits[date], visit] : [visit]
            return visits
        }, {} as {[key: string]: IVisit[]}))
    }

    // ========  API CALLS (see useEffect in App.tsx) ======== //
    // Method for loading all visit posts
    @action loadVisits = async () => {
        this.loadingInitial = true      // mutating state with MobX
        try {
            const visits = await agent.Visits.list()    
            runInAction('loading visits', () => {
                visits.forEach((visit) => {
                    visit.date = visit.date.split('.')[0]
                    this.visitRegistry.set(visit.id, visit);
                })
                this.loadingInitial = false
            }) 
            } catch (error) {
                runInAction('loading visits error', () => {
                    this.loadingInitial = false;                
                })
            console.log(error)
        }
    }

    // Method for loading a single visit post
    @action loadVisit = async (id: string) => {        
       let visit = this.getVisit(id)                // Call the helper method GETVISIT and pass in the ID from the View button
       if (visit) {                                 // If getVisit finds a visit with that ID in the visitRegistry, return the visit
           this.visit = visit
       } else {           
           this.loadingInitial = true               // Else, show the loading spinner            
           try {                                    // Whilst the try/catch block fetches the visit from the API (Visits.details - see SRC > APP > API > AGENT.TS)
               visit = await agent.Visits.details(id)
               runInAction('getting visit', () => {
                   this.visit = visit
                   this.loadingInitial = false
               })
           } catch (error) {
               runInAction('getting visit error', () => {
                   this.loadingInitial = false
               })
               throw error
           }
       }
   }

    // Clearing/Unmounting an activity from the edit form with useEffect in ActivityForm
    @action clearVisit = () => {
        this.visit = null
    }

    // Helper method for the 'loadVisit' action above (not mutating state so NO need for @action)
    // The loadVisit action calls getVisit and searches the visitRegistry using the ID from the clicked View button
    getVisit = (id: string) => {
        return this.visitRegistry.get(id)
    }

    // ========  Replaced Handler methods in App.tsx ======== //
    // Method for creating Visit posts
    @action createVisit = async (visit: IVisit) => {
        this.submitting = true
        try {
            await agent.Visits.create(visit)       
            runInAction('creating visit', () => {
                this.visitRegistry.set(visit.id, visit);
                this.submitting = false
            })
        } catch (error) {
            runInAction('creating visit error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    // Method for editing Visit posts
    @action editVisit = async (visit: IVisit) => {
        this.submitting = true
        try {
            await agent.Visits.update(visit)             
            runInAction('editing visit', () => {
                this.visitRegistry.set(visit.id, visit);
                this.visit = visit
                this.submitting = false
            })          
        } catch (error) {                   
            runInAction('editing visit error', () => {
                this.submitting = false
            })
            console.log(error)
        }
    }

    // Method for deleting Visit posts
    @action deleteVisit = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Visits.delete(id)                
            runInAction('deleting visit', () => {
                this.visitRegistry.delete(id)
                this.submitting = false
                this.target = ''
            })               
        } catch (error) {               
            runInAction('deleting visits error', () => {
                this.submitting = false
                this.target = ''
            })               
            console.log(error)
        }
    }
}

export default createContext(new VisitStore())