import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve,500)); //just to show  I can do it 

axios.defaults.baseURL = 'http://localhost:5027/api/';

const respBody = (resp: AxiosResponse) => resp.data;

axios.interceptors.response.use(async axiosResponse => {
  await sleep();
  return axiosResponse;
}, (error: AxiosError) => {
  const {data, status} = error.response as AxiosResponse;

  switch (status) {
    case 400: 
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for(const key in data.errors) {
          if(data.errors[key]) {
            modelStateErrors.push(data.errors[key])
          }
        }
        throw modelStateErrors.flat(); //make into 1D array
      }

      toast.error(data.title);
      break;
    case 401: 
      toast.error(data.title);
      break;
    case 402: 
      toast.error(data.title);
      break;
    case 404: 
      toast.error(data.title);
      break;
    case 500: 
      router.navigate('/server-error', {state: {error: data}});
      break;
    default: 
      break;
  }
  return Promise.reject(error.response);
})

/* Centralizing requests to make the easily accessible */
const requests = {
  get: (url: string) => axios.get(url).then(respBody),
  post: (url: string, body: object) => axios.post(url, body).then(respBody),
  put: (url: string, body: object) => axios.put(url, body).then(respBody),
  delete: (url: string) => axios.delete(url).then(respBody),
};

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`)
};

const Errors = {
  get400Error: () => requests.get('Error/bad-request'),
  get401Error: () => requests.get('Error/unauthorized'),
  get404Error: () => requests.get('Error/not-found'),
  get500Error: () => requests.get('Error/server-error'),
  getValidationError: () => requests.get('Error/validation-error'),
}

const agent = {
  Catalog,
  Errors
};

export default agent;