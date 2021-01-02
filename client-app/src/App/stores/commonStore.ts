import {RootStore} from './rootStore';
import { observable, action } from 'mobx';

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        // reaction(
        //     () => this.token,
        //     token => {
        //         if (token) {
        //             window.localStorage.setItem('jwt', token);
        //         } else {
        //             window.localStorage.removeItem('jwt')
        //         }
        //     }
        // )
    }

    @observable token: string | null = null;
    @observable appLoaded = false;

    // Method to set the token
    @action setToken = (token: string | null) => {
        window.localStorage.getItem('jwt')
        this.token = token;
    }

    // Method to check whether the app is loaded
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}