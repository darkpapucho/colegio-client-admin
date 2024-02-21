// import axios from 'axios';
// import { API_BASE_URL } from '../../var/globals';
// import { store } from '../redux/store';
// import { apiUri } from '../../utils/var';

// axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.timeout = 5000;

// function createNewSignal(time?: number) {
//   const controller = new AbortController();
//   setTimeout(() => controller.abort(), time || 5000);
//   return controller.signal;
// }

// export const fetcher = (url: string, signal: AbortSignal, method?: 'GET' | 'POST') => {
//   const instance = axios.create({
//     method: method ?? 'GET',
//     signal,
//     url,
//   });
//   return instance;
// };
