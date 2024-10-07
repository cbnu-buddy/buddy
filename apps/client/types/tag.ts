export interface TagInfo {
  tagId: number;
  tagName: string;
}

export interface MySubscribedTagInfo extends TagInfo {
  isReceiveNotification: boolean;
  isSubscribed: boolean;
}
