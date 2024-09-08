import { CommentInfo } from './comment';
import { TagInfo } from './tag';

export interface PostInfo {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string | null;
  postImagePathUrls: string[];
  author: Author;
  tags: TagInfo[];
  views: number;
  services: {
    serviceId: number;
    planIds: number[];
    name: string;
    url: string;
  }[];
  comments: CommentInfo[];
  likeCount: number;
}

export interface Author {
  memberId: number;
  username: string;
  profileImagePathUrl: string;
}
