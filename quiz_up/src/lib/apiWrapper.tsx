import axios from 'axios';
import { QuestionType, UserType, UserFormDataType } from '../types';

const baseURL:string  = 'https://cae-bookstore.herokuapp.com';

const userEndpoint = '/user'
const questionEndpoint = '/question'
const loginEndpoint = '/login'


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
}); 


const apiClientBasicAuth = (email:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(email + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = { 
    data?: T,
    error?: string
} 


async function register(newUserData:UserFormDataType):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData); 
        data = response.data; 
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data; 
        } else {
            error = 'Something went wrong'; 
        }
    }
    return { data, error }; 
}

async function login(email:string, password:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint)
        data = response.data
        console.log(data, 'data from login')
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data
        } else {
            console.log(err, 'error from login')
            error = 'Something went wrong'
        }
    }
    return { data, error }
}


async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data; 
    let error; 
    try {
        const response = await apiClientTokenAuth(token).get(loginEndpoint); 
        data = response.data; 
    } catch(err) {
        if (axios.isAxiosError(err)){
             error = err.response?.data; 
        } else {
            error = 'Something went wrong'; 
        }
    }
    return { data, error }; 
}


async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try { 
        const response = await apiClientNoAuth().get(questionEndpoint + '/all'); 
        data = response.data['questions']; 
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data;
        } else {
            error = 'Something went wrong'; 
        }
    }
    return { data, error }; 
}



export { 
    getAllQuestions,
    register,
    login,
    getMe
}