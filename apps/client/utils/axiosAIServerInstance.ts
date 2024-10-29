import axios from 'axios';

const axiosAiServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL,
});

axiosAiServerInstance.interceptors.request.use();

axiosAiServerInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response); // Log full error
    return Promise.reject(error);
  }
);

export default axiosAiServerInstance;
