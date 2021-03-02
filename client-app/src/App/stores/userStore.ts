import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';

export default class UserStore {
  refreshTokenTimeout: any;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // Create an observable for state changes
  @observable user: IUser | null = null;
  @observable loading = false;

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
      this.startRefreshTokenTimer(user);
      this.rootStore.modalStore.closeModal();
      history.push('/visits')
    } catch (error) {
        throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      await agent?.User?.register(values);   
      this.rootStore.modalStore.closeModal();
      history.push(`/user/registerSuccess?email=${values.email}`)
      console.log('register history values: ', values)
    } catch (error) {
      throw error;
    }
  }

  @action refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.User.refreshToken();
      runInAction(() => {
        this.user = user;
      })
      this.rootStore.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  }

  // Method for getting the current user associated with a particular token (send to App.tsx's getUser())
  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.stopRefreshTokenTimer(); // to stop refreshing on logout
    this.user = null; 
    history.push('/')   
  };

  @action fbLogin = async (response: any) => {   
    console.log('fbLogin userStore: ', response)   
    this.loading = true;
    try {
      const user = await agent.User.fbLogin(response.accessToken);  
      console.log('fbLogin try: ', user)
      runInAction(() => {
        this.user = user;   
        this.rootStore.commonStore.setToken(user.token);
        this.startRefreshTokenTimer(user);
        this.rootStore.modalStore.closeModal();
        this.loading = false;     
      })       
      history.push('/visits');
      } catch (error) {    
        runInAction(() => { 
          this.loading = false; 
          throw error;
        })
    }
  }

  // Create private method to use in above methods
  private startRefreshTokenTimer(user: IUser) {
    const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}