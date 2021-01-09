  
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IUser, IUserFormValues } from '../models/user';
import { IVisit, IVisitsEnvelope } from '../models/visit_interface';
import { IProfile, IPhoto } from '../models/profile';

axios.defaults.baseURL = 'http://localhost:5000/api';

// Check if there's a token; if yes, attach to the authorization header; if no, return error 
axios.interceptors.request.use(config => {
      const token = window.localStorage.getItem('jwt');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const {status, data, config} = error.response
    if (status === 404) {
        history.push('/notfound')
    }
    console.log(error.response)
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound')
    }
    if (status === 500) {
        toast.error('Server error - check the terminal fo more info!')
    }
    throw error.response;
})

// Store the response.data
const responseBody = (response: AxiosResponse) => response.data;

// Want to slow down speed of CRUD operations to test app's behaviour on slow networks
const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
    postForm: (url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post(url, formData, {
            headers: { 'Content-type': 'multipart/form-data' }
          }).then(responseBody);
      }
};

const Visits = {
    list: (params: URLSearchParams): Promise<IVisitsEnvelope> => 
        axios.get('/visits', {params: params}).then(sleep(1000)).then(responseBody),
    details: (id: string) => requests.get(`/visits/${id}`),
    create: (visit: IVisit) => requests.post('/visits', visit),
    update: (visit: IVisit) => requests.put(`/visits/${visit.id}`, visit),
    delete: (id: string) => requests.del(`/visits/${id}`),
    attend: (id: string) => requests.post(`/visits/${id}/attend`, {}),
    unattend: (id: string) => requests.del(`/visits/${id}/attend`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
};

  const Profiles = {
    get: (username: string): Promise<IProfile> => requests.get(`/profiles/${username}`),
    uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
    listVisits: (username: string, predicate: string) => 
        requests.get(`/profiles/${username}/visits?predicate=${predicate}`)
};


export default {
    Visits,
    User,
    Profiles
}




//     uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos`, photo),
//     follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
//     unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
//     listFollowings: (username: string, predicate: string) => requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
//     listVisits: (username: string, predicate: string) => requests.get(`/profiles/${username}/visits?predicate=${predicate}`)