import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';

export default class UserStore {

  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // Create an observable for state changes
  @observable user: IUser | null = null;

  // See whether a user is logged-in
  @computed get isLoggedIn() { 
      return !!this.user;
  }

  // Method for users to log-in with
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;        
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/visits')
    } catch (error) {
        throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      await agent.User.register(values);      
      this.rootStore.modalStore.closeModal();
      history.push(`/user/registerSuccess?email=${values.email}`)
    } catch (error) {
      throw error;
    }
  }

  // Method for getting the current user associated with a particular token (send to App.tsx's getUser())
  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null; 
    history.push('/')   
  };
}