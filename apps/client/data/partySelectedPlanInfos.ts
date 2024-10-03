import netflixImg from '@/public/images/netflix.png';
import waveImg from '@/public/images/wave.png';
import watchaImg from '@/public/images/watcha.png';
import laftelImg from '@/public/images/laftel.png';
import tvingImg from '@/public/images/tving.png';
import disneyPlusImg from '@/public/images/disney_plus.png';
import youtubePremiumImg from '@/public/images/youtube_premium.png';
import coupangPlayImg from '@/public/images/coupang_play.png';
import ridiBooksImg from '@/public/images/ridi_books.png';
import miliImg from '@/public/images/mili.png';
import yes24Img from '@/public/images/yes24.png';
import spotifyImg from '@/public/images/spotify.png';
import appleMusicImg from '@/public/images/apple_music.png';
import { PartySelectedPlanInfo } from '@/types/partySelectedPlan';

export const partySelectedPlanInfos: PartySelectedPlanInfo[] = [
  {
    iconImg: netflixImg,
    iconImgAlt: 'netflix image',
    name: '넷플릭스',
    category: 'media',
    tagName: 'hot',
    homePageUrl: 'https://www.netflix.com/',
    planDetailInfos: [
      {
        id: 1,
        name: '넷플릭스 스탠다드',
        price: 13500,
        maxPartyMemberNum: 2,
        description: [
          `파티원 1명 모집 가능`,
          `파티원 1명당 매달 6,750원 적립! <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
      {
        id: 2,
        name: '넷플릭스 프리미엄',
        price: 17000,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          `파티원 1명당 매달 4,250원 적립!`,
          ,
          `최대 인원(3명) 모집하면, 매달 최대 12,750원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: "'한국' 넷플릭스 계정만 공유할 수 있어요.",
        description:
          '🇰🇷 넷플릭스 정책에 따라 파티장과 파티원의 국가가 같아야만 공유를 할 수 있어요.',
      },
      {
        subtitle:
          '통신사 제휴 요금을 이용중이라면 넷플릭스 추가공유 파티를 만들 수 없어요.',
        description:
          '⛔️ 통신사 제휴 요금 등 넷플릭스 파트너사를 통해 결제/이용중인 경우 추가 회원 자리를 구매할 수 없어요.',
      },
      {
        subtitle:
          '파티 시작일에 넷플릭스 프리미엄 이용권과 추가 회원 자리를 구매해 주세요.',
        description:
          '💰 넷플릭스 정책에 따라, 가구 외 구성원과 함께 이용하려면 추가 회원 자리를 구매해야 해요.',
      },
      {
        subtitle: '24시간 이내 파티원을 추가 회원으로 초대해 주세요.',
        description:
          '💁 파티원이 들어오면 푸시/알림톡/문자를 통해 알려드려요. 24시간 내 파티원의 버디 아이디 메일(@buddy.net)로 초대를 진행하지 않으면 파티원이 넷플릭스를 이용할 수 없어요.',
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: waveImg,
    iconImgAlt: 'wave image',
    name: '웨이브',
    category: 'media',
    tagName: 'hot',
    homePageUrl: 'https://www.wavve.com',
    planDetailInfos: [
      {
        id: 3,
        name: '웨이브 스탠다드',
        price: 10900,
        maxPartyMemberNum: 2,
        description: [
          `파티원 1명 모집 가능`,
          ,
          `파티원 1명당 매달 5,450원 적립! <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
      {
        id: 4,
        name: '웨이브 프리미엄',
        price: 13900,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          ,
          `파티원 1명당 매달 3,475원 적립!`,
          `최대 인원(3명) 모집하면, 매달 최대 10,425원 적립 <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },
      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 '웨이브 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 '웨이브 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: watchaImg,
    iconImgAlt: 'watcha image',
    name: '왓챠',
    category: 'media',
    tagName: 'hot',
    homePageUrl: 'https://watcha.com',
    planDetailInfos: [
      {
        id: 5,
        name: '왓챠 프리미엄',
        price: 12900,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          `파티원 1명당 매달 3,225원 적립!`,
          ,
          `최대 인원(3명) 모집하면, 매달 최대 9,675원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 '왓챠 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 '왓챠 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: laftelImg,
    iconImgAlt: 'laftel image',
    name: '라프텔',
    category: 'media',
    tagName: '',
    homePageUrl: 'https://laftel.net/',
    planDetailInfos: [
      {
        id: 6,
        name: '라프텔 프리미엄',
        price: 14900,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          `파티원 1명당 매달 3,725원 적립!`,
          ,
          `최대 인원(3명) 모집하면, 매달 최대 11,175원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },
      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 '라프텔 프리미엄' 요금제를 결제해 주세요.",
        description:
          " 파티장이 '라프텔 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: tvingImg,
    iconImgAlt: 'tving image',
    name: '티빙',
    category: 'media',
    tagName: 'hot',
    homePageUrl: 'https://www.tving.com/',
    planDetailInfos: [
      {
        id: 7,
        name: '티빙 스탠다드',
        price: 13500,
        maxPartyMemberNum: 2,
        description: [
          `파티원 1명 모집 가능`,
          `파티원 1명당 매달 6,750원 적립! <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
      {
        id: 8,
        name: '티빙 프리미엄',
        price: 17000,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          `파티원 1명당 매달 4,250원 적립!`,
          ,
          `최대 인원(3명) 모집하면, 매달 최대 12,750원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 '티빙 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 '티빙 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: disneyPlusImg,
    iconImgAlt: 'disney plus image',
    name: '디즈니+',
    category: 'media',
    tagName: '',
    homePageUrl: 'https://www.disneyplus.com',
    planDetailInfos: [
      {
        id: 9,
        name: '디즈니플러스 스탠다드',
        price: 9900,
        maxPartyMemberNum: 2,
        description: [
          `파티원 1명 모집 가능`,
          `파티원 1명당 매달 4,950원 적립! <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
      {
        id: 10,
        name: '디즈니플러스 프리미엄',
        price: 17000,
        maxPartyMemberNum: 4,
        description: [
          `파티원 1~3명 모집 가능`,
          `파티원 1명당 매달 3,475원 적립!`,
          ,
          `최대 인원(3명) 모집하면, 매달 최대 10,425원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: "'디즈니플러스의 ID를 버디 메일로 변경해 주세요.",
        description:
          '💌 왜 버디 메일을 사용하나요? 디즈니플러스 로그인 보안 관련 파티장의 번거로움(2차 인증번호 확인 등)을 버디 메일을 통해 해결하기 위한 정책이에요.',
      },
      {
        subtitle: "'한국' 디즈니플러스 계정만 공유할 수 있어요.",
        description:
          '🇰🇷 디즈니플러스 정책상 나라별로 지원하는 콘텐츠가 다르기 때문에 꼭 한국 디즈니플러스 계정을 공유해 주셔야 해요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 '디즈니플러스' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 '디즈니플러스' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: youtubePremiumImg,
    iconImgAlt: 'youtube premium image',
    name: '유튜브 프리미엄',
    category: 'media',
    tagName: 'hot',
    homePageUrl: 'https://www.youtube.com',
    planDetailInfos: [
      {
        id: 11,
        name: '유튜브 프리미엄',
        price: 14900,
        maxPartyMemberNum: 10,
        description: [
          `파티원 1~9명 모집 가능`,
          `파티원 1명당 매달 1,490원 적립!`,
          ,
          `최대 인원(9명) 모집하면, 매달 최대 13,410원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘유튜브 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘유튜브 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: coupangPlayImg,
    iconImgAlt: 'coupang play image',
    name: '쿠팡플레이',
    category: 'media',
    tagName: 'new',
    homePageUrl: 'https://www.coupangplay.com',
    planDetailInfos: [
      {
        id: 12,
        name: '쿠팡플레이',
        price: 4900,
        maxPartyMemberNum: 5,
        description: [
          `파티원 1~4명 모집 가능`,
          `파티원 1명당 매달 998원 적립!`,
          ,
          `최대 인원(4명) 모집하면, 매달 최대 3,992원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },
      {
        subtitle: '주소 정보가 공개됨에 유의해 주세요.',
        description:
          '📦 계정에 등록된 파티장의 주소 정보를 파티원이 확인할 수 있어요. 정보 노출을 방지하려면 실제 주소지와 다른 장소로 설정해 주세요.',
      },
      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘쿠팡플레이 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘쿠팡플레이 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: ridiBooksImg,
    iconImgAlt: 'ridi books image',
    name: '리디북스',
    category: 'book',
    tagName: 'hot',
    homePageUrl: 'https://ridibooks.com',
    planDetailInfos: [
      {
        id: 13,
        name: '리디셀렉트',
        price: 4990,
        maxPartyMemberNum: 5,
        description: [
          `파티원 1~4명 모집 가능`,
          `파티원 1명당 매달 998원 적립!`,
          ,
          `최대 인원(4명) 모집하면, 매달 최대 3,992원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘리디북스 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘리디북스 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: miliImg,
    iconImgAlt: 'mili image',
    name: '밀리의 서재',
    category: 'book',
    tagName: 'event',
    homePageUrl: 'https://www.millie.co.kr',
    planDetailInfos: [
      {
        id: 14,
        name: '밀리의 서재',
        price: 9900,
        maxPartyMemberNum: 3,
        description: [
          `파티원 1~2명 모집 가능`,
          `파티원 1명당 매달 3,300원 적립!`,
          ,
          `최대 인원(2명) 모집하면, 매달 최대 6,600원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘밀리 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘밀리 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: yes24Img,
    iconImgAlt: 'yes24 image',
    name: '예스24 크레마클럽',
    category: 'book',
    tagName: '',
    homePageUrl: 'http://www.yes24.com',
    planDetailInfos: [
      {
        id: 15,
        name: '예스24 스탠다드',
        price: 5500,
        maxPartyMemberNum: 5,
        description: [
          `파티원 1~4명 모집 가능`,
          `파티원 1명당 매달 1,100원 적립!`,
          ,
          `최대 인원(4명) 모집하면, 매달 최대 4,400원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
      {
        id: 16,
        name: '예스24 프리미엄',
        price: 7700,
        maxPartyMemberNum: 5,
        description: [
          `파티원 1~4명 모집 가능`,
          `파티원 1명당 매달 1,540원 적립!`,
          ,
          `최대 인원(4명) 모집하면, 매달 최대 6,160원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘예스24 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘예스24 프리미엄' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: spotifyImg,
    iconImgAlt: 'spotify image',
    name: '스포티파이',
    category: 'music',
    tagName: 'hot',
    homePageUrl: 'https://www.spotify.com',
    planDetailInfos: [
      {
        id: 17,
        name: '스포티파이 프리미엄',
        price: 16350,
        maxPartyMemberNum: 2,
        description: [
          `파티원 1명 모집 가능`,
          `파티원 1명당 매달 8,175원 적립! <br /> <img
            src='/images/warning_icon.png'
            alt='warning icon image'
            width='20px'
            style="position: relative; display: inline; bottom: 2px"
          /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
          ,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘스포티파이 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘스포티파이' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
  {
    iconImg: appleMusicImg,
    iconImgAlt: 'apple music image',
    name: '애플 뮤직',
    category: 'music',
    tagName: '',
    homePageUrl: 'https://music.apple.com',
    planDetailInfos: [
      {
        id: 18,
        name: '애플 뮤직',
        price: 13500,
        maxPartyMemberNum: 6,
        description: [
          `파티원 1~5명 모집 가능`,
          `파티원 1명당 매달 2,250원 적립!`,
          ,
          `최대 인원(2명) 모집하면, 매달 최대 11,250원 적립 <br /> <img
        src='/images/warning_icon.png'
        alt='warning icon image'
        width='20px'
        style="position: relative; display: inline; bottom: 2px"
      /> 금액은 서비스 정책에 따라 변경될 수 있어요.`,
        ],
      },
    ],
    selectedPlanName: '',
    selectedPlanId: 0,
    partyLeaderGuides: [
      {
        subtitle: '공유해도 안전한 비밀번호를 사용해 주세요.',
        description:
          '🔐 파티장의 계정을 파티원과 함께 사용하게 될거예요. 평소에 자주 쓰는 비밀번호를 공유하면 안돼요.',
      },

      {
        subtitle: '소셜 로그인 계정은 공유할 수 없어요.',
        description:
          '🙅‍♂️ 개인정보 보호를 위해 소셜 로그인 계정 공유를 금지하고 있어요.',
      },
      {
        subtitle: '성인 인증을 완료해 주세요.',
        description:
          '🔞 파티장이 성인 인증을 하지 않으면, 파티원이 성인 콘텐츠 시청을 할 수 없어요.',
      },
      {
        subtitle:
          "파티장은 파티 시작일에 맞춰 ‘애플뮤직 프리미엄' 요금제를 결제해 주세요.",
        description:
          "🎫 파티장이 ‘애플뮤직' 요금제를 먼저 결제하여 파티원과 공유하면, 버디가 매달 파티 요금을 적립해 드려요.",
      },
      {
        subtitle: '결제 카드 등록이 필요해요. 카드를 준비해 주세요.',
        description:
          '🪙 파티장 귀책사유 발생시 위약금을 부과하기 위해 결제 카드 등록이 필요해요. 등록 과정에서 100원이 결제된 후 바로 취소될 거예요.',
      },
    ],
  },
];
