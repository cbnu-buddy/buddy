import { Author } from './post';

export interface ReplyInfo {
  replyId: number;
  replyContent: string;
  likeCount: number;
  createdAt: string; // ISO 날짜 형식
  writer: Author;
}
