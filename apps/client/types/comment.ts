import { ReplyInfo } from './reply';
import { Author } from './post';

export interface CommentInfo {
  commentId: number;
  commentContent: string;
  likeCount: number;
  replies: ReplyInfo[]; // Reply 배열
  createdAt: string; // ISO 날짜 형식
  writer: Author;
}
