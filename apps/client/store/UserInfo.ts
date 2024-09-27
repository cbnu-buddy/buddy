import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserInfo } from '@/types/user';

interface UserInfoStoreState {
  userInfo: UserInfo;
}

const initialState = {
  memberId: 0,
  email: '',
  username: '',
  point: 0,
  isAuth: false,
};

export const UserInfoStore = create(
  devtools((set) => ({
    userInfo: initialState,
    updateUserInfo: (newUserInfo: UserInfo) =>
      set((state: UserInfoStoreState) => ({
        userInfo: { ...state.userInfo, ...newUserInfo },
      })),
    removeUserInfo: () =>
      set(() => ({
        userInfo: initialState,
      })),
  }))
);
