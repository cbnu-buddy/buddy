interface UploadService {
  upload(file: File): Promise<{ response: string }>;
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
      .then((response: { response: string }) => {
        return { default: response.response };
      })
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}
