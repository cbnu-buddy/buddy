import { UploadFileStore } from '@/store/UploadFile';

interface UploadService {
  upload(file: File): Promise<{ response: string[] }>; // response는 배열로 반환됨
}

interface Loader {
  file: Promise<File>;
}

export class UploadAdapter {
  private loader: Loader;
  private uploadService: UploadService;

  constructor(loader: Loader, uploadService: UploadService) {
    this.loader = loader;
    this.uploadService = uploadService;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file
      .then((file: File) => this.uploadService.upload(file))
      .then((response: { response: string[] }) => {
        // 배열 병합을 위한 상태 업데이트
        UploadFileStore.setState((state) => ({
          filePathUrlList: [...state.filePathUrlList, ...response.response], // 배열 병합
        }));

        return { default: response.response[0] }; // 첫 번째 URL 반환
      })
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}
