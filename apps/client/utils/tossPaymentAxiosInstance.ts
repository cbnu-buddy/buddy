import axios from 'axios';

const tossPaymentAxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_TOSS_PAYMENT_API_URL,
});

tossPaymentAxiosInstance.interceptors.request.use(
  (config) => {
    const authorization =
      process.env.NEXT_PUBLIC_TOSS_PAYMENT_API_AUTHORIZATION;
    if (authorization)
      config.headers['Authorization'] = 'Basic ' + authorization + '==';
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

tossPaymentAxiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 처리
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default tossPaymentAxiosInstance;
