import VisitStore from './visitStore';
import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
// import CommonStore from './commonStore';
// import ModalStore from './modalStore';
// import ProfileStore from './profileStore';

// Pass the RootStore as a parameter to a constructor
// Initialise the stores accessible via RootStore
// 'this' represents the rootstore

// Enables strict mode - state mutations must be confined to within @actions
configure({ enforceActions: 'always' })

export class RootStore {
    visitStore: VisitStore;
    userStore: UserStore;
    // commonStore: CommonStore;
    // modalStore: ModalStore;
    // profileStore: ProfileStore;

    constructor() {
        this.visitStore = new VisitStore(this);
        this.userStore = new UserStore(this);
        // this.commonStore = new CommonStore(this);
        // this.modalStore = new ModalStore(this);
        // this.profileStore = new ProfileStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());