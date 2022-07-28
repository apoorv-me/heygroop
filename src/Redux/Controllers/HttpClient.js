import axios from 'axios';

const client = axios.create({
  baseURL: "http://52.203.217.227:3000/api/",
  headers: {
    'Content-Type': 'application/json'
  },
});
client.interceptors.response.use(
  (response) => response.data,
  (error) => {

    if (error.response) {
      return Promise.reject(error.response.data);
    } 
    // else if (error.request) {
    //   return Promise.reject(new Error("erroorrrrrr................."));
    // } else {
    //   return Promise.reject(error);
    // }
  }
);

const setAuthorization = (token) => {
  client.defaults.headers.common.Authorization = `${token}`;

};

const clearAuthorization = () => {
  delete client.defaults.headers.common.Authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };