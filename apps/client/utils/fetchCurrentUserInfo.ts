import axiosInstance from './axiosInstance';

// (로그인 한) 사용자 정보 조회
export const fetchCurrentUserInfo = async (updateUserInfo: any) => {
  return axiosInstance.get('/private/member/member-info').then((response) => {
    const resData = response.data.response;
    const { memberId, username, email, point } = resData;
    updateUserInfo({
      memberId,
      username,
      email,
      point,
      isAuth: true,
    });
    return { ...resData, isAuth: true };
  });
};
