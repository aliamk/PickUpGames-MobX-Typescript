import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import { IProfile } from '../models/profile';
import agent from '../api/agent';
import { toast } from 'react-toastify';


export default class ProfileStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;


  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      // if these two values match, return true
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  }

  // Method for uploading an image
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {                                         // if profile exists push it to photos
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {      // if photo isMain and user exists in the userStore
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

} // End ProfileStore

