import { observable } from 'mobx'
import { createContext } from 'react'


class VisitStore {
    @observable title = 'Helloooooo'
}

export default createContext(new VisitStore())