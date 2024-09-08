import { PostInfo } from '../../types/post';

export const communityPostInfos: PostInfo[] = [
  {
    postId: 1,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'https://file.kinolights.com/m/post_detail/202408/04/af31887f-6d86-47b4-9c93-c2a8c77f9379.webp',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
  {
    postId: 10,
    title: '여행 가기전 보기 좋은 방송 프로그램',
    content: '어쩌구 저쩌구~~~~~~~~~~',
    modifiedAt: '2024-07-02T00:00:00',
    createdAt: '2024-07-02T00:00:00',
    postImagePathUrls: [
      'http://abc.com/upload/1.jpg',
      'http://abc.com/upload/2.jpg',
      'http://abc.com/upload/3.jpg',
    ],
    author: {
      memberId: 2,
      username: '홍길동',
      profileImagePathUrl:
        'https://avatars.githubusercontent.com/u/119295431?v=4',
    },
    tags: [
      {
        tagId: 1,
        tag: '애니메이션',
      },
      {
        tagId: 2,
        tag: '원피스',
      },
      {
        tagId: 1,
        tag: '에그헤드',
      },
    ],
    views: 67,
    services: [
      {
        serviceId: 1,
        planIds: [1, 2],
        name: '넷플릭스',
        url: 'https://www.netflix.com/',
      },
      {
        serviceId: 4,
        planIds: [6],
        name: '라프텔',
        url: 'https://www.laftel.net',
      },
    ],
    comments: [
      {
        commentId: 1,
        commentContent: '오! 정보 감사합니당😎😎',
        likeCount: 1,
        replies: [
          {
            replyId: 1,
            replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 2,
              username: '홍길동',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
          {
            replyId: 2,
            replyContent: 'ㄹㅇ..',
            likeCount: 0,
            createdAt: '2024-07-02T01:00:00',
            writer: {
              memberId: 3,
              username: '아무개',
              profileImagePathUrl:
                'https://avatars.githubusercontent.com/u/119295431?v=4',
            },
          },
        ],
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 2,
          username: '홍길동',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
      {
        commentId: 2,
        commentContent: '좋은 정보 감사합니다 :p',
        likeCount: 1,
        replies: [
          {
            replyId: 3,
            replyContent: '넵 좋은 하루 되세요~~',
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
        createdAt: '2024-07-02T01:00:00',
        writer: {
          memberId: 25,
          username: '아인슈타인',
          profileImagePathUrl:
            'https://avatars.githubusercontent.com/u/119295431?v=4',
        },
      },
    ],
    likeCount: 2,
  },
];

export const communityPostInfo: PostInfo = {
  postId: 1,
  title: '여행 가기전 보기 좋은 방송 프로그램',
  content: '어쩌구 저쩌구~~~~~~~~~~',
  modifiedAt: '2024-08-19T00:00:00',
  createdAt: '2024-08-19T00:00:00',
  postImagePathUrls: [],
  author: {
    memberId: 2,
    username: '홍길동',
    profileImagePathUrl:
      'https://avatars.githubusercontent.com/u/119295431?v=4',
  },
  tags: [
    {
      tagId: 1,
      tag: '애니메이션',
    },
    {
      tagId: 2,
      tag: '원피스',
    },
    {
      tagId: 1,
      tag: '에그헤드',
    },
  ],
  views: 67,
  services: [
    {
      serviceId: 1,
      planIds: [1, 2],
      name: '넷플릭스',
      url: 'https://www.netflix.com/',
    },
    {
      serviceId: 4,
      planIds: [6],
      name: '라프텔',
      url: 'https://www.laftel.net',
    },
  ],
  comments: [
    {
      commentId: 1,
      commentContent: '오! 정보 감사합니당😎😎',
      likeCount: 1,
      replies: [
        {
          replyId: 1,
          replyContent: '도움이 되셨다니 기쁘네요ㅎㅎ',
          likeCount: 0,
          createdAt: '2024-07-02T01:00:00',
          writer: {
            memberId: 2,
            username: '홍길동',
            profileImagePathUrl:
              'https://avatars.githubusercontent.com/u/119295431?v=4',
          },
        },
        {
          replyId: 2,
          replyContent: 'ㄹㅇ..',
          likeCount: 0,
          createdAt: '2024-07-02T01:00:00',
          writer: {
            memberId: 3,
            username: '아무개',
            profileImagePathUrl:
              'https://avatars.githubusercontent.com/u/119295431?v=4',
          },
        },
      ],
      createdAt: '2024-07-02T01:00:00',
      writer: {
        memberId: 2,
        username: '홍길동',
        profileImagePathUrl:
          'https://avatars.githubusercontent.com/u/119295431?v=4',
      },
    },
    {
      commentId: 2,
      commentContent: '좋은 정보 감사합니다 :p',
      likeCount: 1,
      replies: [
        {
          replyId: 3,
          replyContent: '넵 좋은 하루 되세요~~',
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
      createdAt: '2024-07-02T01:00:00',
      writer: {
        memberId: 25,
        username: '아인슈타인',
        profileImagePathUrl:
          'https://avatars.githubusercontent.com/u/119295431?v=4',
      },
    },
  ],
  likeCount: 2,
};
