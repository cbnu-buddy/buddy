import { CommentInfo } from '@/types/comment';

export const commentInfos: CommentInfo[] = [
  {
    commentId: 2,
    commentContent: '좋은 정보 감사합니다 :p',
    likeCount: 1,
    replies: [
      {
        replyId: 3,
        replyContent: '넵 좋은 하루 되세요~~',
        likeCount: 0,
        createdAt: '2024-08-19T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        replyId: 3,
        replyContent: '이건 테스트 답글입니다.',
        likeCount: 0,
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    createdAt: '2024-08-19T01:00:00',
    writer: {
      memberId: 25,
      username: '선인장',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/84178274?s=100&v=4',
    },
  },
  {
    commentId: 2,
    commentContent: '잘 봤어요 😎',
    likeCount: 1,
    replies: [
      {
        replyId: 3,
        replyContent: '넵 좋은 하루 되세요~~',
        likeCount: 0,
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '미스터츄',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/93920435?s=100&v=4',
        },
      },
    ],
    createdAt: '2024-07-02T01:00:00',
    writer: {
      memberId: 25,
      username: '허리케인',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/39115651?s=100&v=4',
    },
  },
  {
    commentId: 2,
    commentContent: '굿굿 :)',
    likeCount: 1,
    replies: [],
    createdAt: '2024-07-02T01:00:00',
    writer: {
      memberId: 25,
      username: '버니버니',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/118978246?s=100&v=4',
    },
  },
  {
    commentId: 2,
    commentContent: '굿굿2 :)',
    likeCount: 1,
    replies: [],
    createdAt: '2024-07-02T01:00:00',
    writer: {
      memberId: 25,
      username: '버니버니',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/118978246?s=100&v=4',
    },
  },
];

export const commentInfo: CommentInfo = {
  commentId: 2,
  commentContent: '좋은 정보 감사합니다 :p',
  likeCount: 1,
  replies: [
    {
      replyId: 3,
      replyContent: '넵 좋은 하루 되세요~~',
      likeCount: 0,
      createdAt: '2024-08-19T01:00:00',
      writer: {
        memberId: 2,
        username: '홍길동',
        profileImagePathUrl:
          'https://avatars.githubusercontent.com/u/119295431?v=4',
      },
    },
    {
      replyId: 3,
      replyContent: '이건 테스트 답글입니다.',
      likeCount: 0,
      createdAt: '2024-07-02T01:00:00',
      writer: {
        memberId: 2,
        username: '홍길동',
        profileImagePathUrl:
          'https://avatars.githubusercontent.com/u/119295431?v=4',
      },
    },
  ],
  createdAt: '2024-08-19T01:00:00',
  writer: {
    memberId: 25,
    username: '선인장',
    profileImagePathUrl:
      'https://avatars.githubusercontent.com/u/84178274?s=100&v=4',
  },
};
