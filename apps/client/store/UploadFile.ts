import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UploadFileStoreState {
  filePathUrlList: string[];
  updateFilePathUrlList: (newFilePath: string) => void; // 상태 업데이트 함수 정의
  removeFilePathUrlList: () => void; // 상태 초기화 함수 정의
}

const initialState = {
  filePathUrlList: [],
};

export const UploadFileStore = create<UploadFileStoreState>()(
  devtools((set) => ({
    ...initialState,

    // 기존 파일 경로 리스트에 새 파일 경로를 추가하는 함수
    updateFilePathUrlList: (newFilePath: string) =>
      set((state) => ({
        filePathUrlList: [...state.filePathUrlList, newFilePath],
      })),

    // 파일 경로 리스트를 초기화하는 함수
    removeFilePathUrlList: () =>
      set(() => ({
        filePathUrlList: [],
      })),
  }))
);
