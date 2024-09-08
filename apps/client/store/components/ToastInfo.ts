import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ToastInfoStoreState {
  isOpenToast: boolean;
  toastMessage: string;
}

const initialState: ToastInfoStoreState = {
  isOpenToast: false,
  toastMessage: '',
};

export const ToastInfoStore = create(
  devtools((set) => ({
    ...initialState,

    updateToastMessage: (toastMessage: string) =>
      set(() => ({
        toastMessage,
      })),

    updateOpenToastStatus: (isOpenToast: boolean) =>
      set(() => ({
        isOpenToast,
      })),
  }))
);
