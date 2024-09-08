export interface TagInfo {
  tagId: number;
  tag: string;
}

export interface MySubscribedTagInfo extends TagInfo {
  isReceiveNotification: boolean;
  isSubscribed: boolean;
}
