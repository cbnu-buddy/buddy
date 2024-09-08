import axiosInstance from '@/utils/axiosInstance';

export class UploadService {
  async upload(file) {
    const formData = new FormData();
    formData.append('upload', file);

    const response = (await axiosInstance.post)('/private/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
}
