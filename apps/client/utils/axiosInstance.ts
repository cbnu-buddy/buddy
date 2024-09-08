import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리
    return response;
  },
  (error) => {
    // 응답 에러 처리
    if (error.response) {
      switch (error.response?.status) {
        case 401:
          localStorage.removeItem('activeAuthorization');
          if (typeof window !== 'undefined') window.location.href = '/login';
          break;
        default:
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
