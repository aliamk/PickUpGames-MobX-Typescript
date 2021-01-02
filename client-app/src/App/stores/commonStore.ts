import {RootStore} from './rootStore';
import { observable, action, reaction } from 'mobx';

export default class CommonStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        // reaction is triggered by setToken action; if token exists, set it to localStorage; else, remove it from lStorage
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    // Method to set the token - triggers reaction
    @action setToken = (token: string | null) => {
        this.token = token;
    }

    // Method to check whether the app is loaded
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}