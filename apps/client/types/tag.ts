import { CommentInfo } from './comment';
import { PostInfo } from './post';

export interface TagInfo {
  tagId: number;
  tagName: string;
}

export interface MySubscribedTagInfo extends TagInfo {
  isReceiveNotification: boolean;
  isSubscribed: boolean;
}

export interface SearchRelatedIntegrationInfo {
  tagId: number;
  tagName: string;
  postsCount: number;
  relatedTags: {
    tagId: number;
    tagName: string;
    postCount: number;
  }[];
  posts: PostInfo[];
}
