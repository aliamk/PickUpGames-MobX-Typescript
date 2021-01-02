  
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IUser, IUserFormValues } from '../models/user';
import { IVisit } from '../models/visit_interface';

axios.defaults.baseURL = 'http://localhost:5000/api';

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
    throw error;
})

// Store the response.data
const responseBody = (response: AxiosResponse) => response.data;

// Want to slow down speed of CRUD operations to test app's behaviour on slow networks
// Currying a function: a process where a function with multiple arguments is transformed into a sequence of nesting functions (the response)
const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody) 
};

const Visits = {
    list: (): Promise<IVisit[]> => requests.get('/visits'),
    details: (id: string) => requests.get(`/visits/${id}`),
    create: (visit: IVisit) => requests.post('/visits', visit),
    update: (visit: IVisit) => requests.put(`/visits/${visit.id}`, visit),
    delete: (id: string) => requests.del(`/visits/${id}`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user)
  };



export default {
    Visits,
    User
}