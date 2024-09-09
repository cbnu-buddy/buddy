import { CommentInfo } from "./comment";
import { TagInfo } from "./tag";

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

// 커뮤니티 게시글 등록/수정 API 호출을 위한 인터페이스 정의
export interface CreatePostParams {
  title: string;
  content: string;
  tags: string[];
  serviceIds: number[];
}
