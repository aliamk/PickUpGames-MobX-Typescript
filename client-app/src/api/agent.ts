  
import axios, { AxiosResponse } from 'axios';
import { IVisit } from '../App/models/visit_interface';

axios.defaults.baseURL = 'http://localhost:5000/api';

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

export default Visits