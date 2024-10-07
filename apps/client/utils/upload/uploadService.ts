import axiosInstance from '../axiosInstance';

export class UploadService {
  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<string>(
      '/private/community/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }
}
