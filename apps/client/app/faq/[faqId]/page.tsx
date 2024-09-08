'use client';

import Link from 'next/link';

interface DefaultProps {
  params: {
    faqId: string;
  };
}

export default function FaqDetail(props: DefaultProps) {
  const faqId = props.params.faqId;

  const dataSet = [
    {
      title: '파티장의 파티 요금은 어떻게 산정되나요?',
      tags: ['파티장', '파티 요금'],
      content: `<p>파티장의 파티 요금은 <strong>모집한 파티원 수에 비례하여 매달 버디 정산일에 버디 머니를 통해 적립</strong>돼요.</p><p>파티원 1인 모집시 적립 금액은 파티 분담금(1인당 서비스 이용료)에서 버디 수수료를 차감한 금액이에요.</p><p><br></p><p>각 서비스 별 파티장의 파티 요금 관련 자세한 내용은 아래 표를 통해 확인해 주세요.</p><blockquote><strong>파티장의 파티 요금 = (A. 파티 분담금 - B. 버디 수수료) × C. 파티원 수</strong></blockquote><ul><li>A. 파티 분담금 : 파티원 1인당 서비스 이용 금액, 1/N 금액</li><li>B. 버디 수수료 : 파티원 1명 모집에 따른 버디 이용료</li><li>C. 파티원 수 : 서비스 별 모집 가능 파티 인원 상이</li></ul><p><img src="https://storage.googleapis.com/linkidimage/Live/admin/파티장 파티 요금 정산 상세-1700719783052.png"></p>`,
    },
    {
      title: '디즈니 플러스 | 성인 인증 방법',
      tags: ['디즈니 플러스', '성인 인증', '파티장', '파티원'],
      content: `<p>디즈니 플러스의 경우 <strong>각 파티원이 직접 성인 인증을 진행</strong>합니다.</p><p>디즈니 플러스 성인 인증은 1년에 1회 진행이 필요해요.</p><p><br></p><blockquote><strong>디즈니 플러스 성인 인증 방법</strong></blockquote><ol><li>디즈니 플러스 성인 인증 페이지 <a rel="noopener noreferrer" href="https://www.disneyplus.com/ko-kr/verifyage">https://www.disneyplus.com/ko-kr/verifyage</a> 열기</li><li>각 파티원이 본인의 정보로 성인 인증 진행하기</li></ol>`,
    },
    {
      title: '파티를 해산하고 싶어요.',
      tags: ['파티장', '파티 해산'],
      content: `<p>‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우상단 파티 메뉴(⋮) → 파티 해산’을 통해 진행할 수 있어요.</p><p><br></p><ul><li>단, 파티장이&nbsp;무단으로 약속한 파티 기간을 채우지 못하고 파티를 해산할 경우</li><li class="ql-indent-1">파티 생성 시 약정한 위약금이 발생해요.</li><li class="ql-indent-1">파티에 적립된 파티 종료 리워드, 파티 탈퇴 보상금을 받을 수 없어요.</li><li>파티 시작일 전이나, 파티에 가입한 파티원이 한 명도 없는 경우에는 위약금 없이 파티 해산이 가능합니다.</li></ul><p><br></p><p><br></p>`,
    },
    {
      title: '애플 | 파티원으로 애플 가족 공유 이용하기',
      tags: ['애플', '파티원'],
      content: `<p>애플 서비스의 경우 <strong>파티장이 파티원의 계정을 가족 구성원으로 직접 등록</strong>해야 이용할 수 있어요.</p><p>파티 가입/시작 시점으로부터 24시간 내 파티장이 파티원을 초대할 거예요.</p><p><br></p><p><br></p><blockquote><strong>애플 파티원 이용 가이드</strong></blockquote><ol><li>파티장이 애플 가족 공유 초대 메일을 보내면 버디가 앱푸시/카카오 알림톡을 통해 안내해 드려요.</li><li>애플 파티를 가입할 때 입력한 이메일(애플 ID)을 확인해 주세요.</li><li>‘가족 공유 참여 초대를 받았습니다.’ 메일을 열어주세요.</li><li>메일 내 ‘초대 열기’ 하단 링크를 열어주세요.</li><li>초대 내용을 확인하고, 본인의 애플 ID로 로그인해 주세요.</li><li>구입 항목 공유 여부는 ‘나중에(아니오)’를 선택하고, ‘계속’ 버튼을 눌러주세요.</li><li>애플 뮤직, 애플 TV+, 애플 One 등 내가 공유 받을 애플의 서비스가 맞는지 꼭 확인하고, ‘계속’을 눌러주세요.</li><li>‘가입 완료’ 화면이 나오면 애플 가족에 정상적으로 초대된 상태랍니다.</li><li>이제 애플 파티원으로 서비스를 이용할 수 있어요.</li></ol>`,
    },
    {
      title: '버디 쿠폰은 어떻게 등록하나요?',
      tags: ['버디 쿠폰', '쿠폰', '쿠폰 코드'],
      content: `<blockquote>버디 쿠폰코드를 알고 있다면, 아래 순서대로 등록해 보세요!</blockquote><p><br></p><ul><li>버디 → 마이페이지 → 쿠폰/포인트 → <strong>쿠폰/포인트 코드 입력</strong> → 등록 버튼 누르기</li></ul><p><br></p><p><br></p><blockquote>버디 쿠폰 사용 방법이 궁금하다면?</blockquote><p><br></p><ul><li><a rel="noopener noreferrer" href="http://localhost:3000/faq/42">버디 쿠폰 사용방법 알아보기 →</a></li></ul><p><br></p><p><br></p><p><br></p><p><br></p>`,
    },
    {
      title: '결제 수단을 변경하고 싶어요.',
      tags: ['결제 수단 변경'],
      content: `<ul><li>새로운 신용카드로 결제 수단을 변경하거나, 등록한 결제 수단을 삭제하고 싶다면 '결제 수단 관리'를 이용해 보세요.</li><li>'결제 수단 관리'는 버디 앱 접속 후 '마이페이지 → 결제/정산관리'에서 찾을 수 있습니다.</li><li>단, 가입하거나 운영 중인 파티가 있는 경우는 파티 종료까지 등록한 결제 수단을 삭제할 수 없어요.</li></ul><p><br></p>`,
    },
    {
      title: '파티 요금은 언제 적립받나요?',
      tags: ['파티장', '파티 요금'],
      content: `<p>파티장의 파티 요금은 매월 자신이 지정한 '버디 정산일'에 적립받아요.</p><p>이때&nbsp;적립받는 금액은 직전 버디 정산일 이후부터 이번 달 버디 정산일 사이에 파티원들이 지불한 '파티 요금'으로 산정됩니다.</p><p><br></p><p><br></p>`,
    },
    {
      title: '파티 매칭하기는 어떤 기능인가요?',
      tags: ['파티 매칭하기', '파티원'],
      content: `<p>파티 찾기에서 이용하고자 하는 파티가 없다면, 파티 찾기 탭의 '파티 매칭하기'를 통해 파티 매칭 대기를 걸어놓을 수 있어요.</p><p>파티 매칭하기를 통해 파티 시작일, 파티 기간, 매칭 대기 기한까지 내게 딱 맞는 조건을 설정할 수 있어요.</p><p><br></p><ul><li>파티 매칭 조건에 맞는 파티가 생성되면 자동으로 해당 파티에 가입되고,</li><li>해당 파티의 파티 시작일에 파티 요금과 파티 기간에 해당하는 보증금이 결제될 거예요.</li></ul><p><br></p><p>파티 매칭을 취소하고 싶다면, ‘나의 파티 → 매칭중인 파티 페이지 → 매칭 취소하기’를 눌러 주세요.</p>`,
    },
    {
      title: '파티장/파티원과 대화하고 싶어요.',
      tags: ['파티 채팅'],
      content: `<p>버디의 파티 채팅 기능을 이용해 보세요!</p><p>버디는 서비스 이용중 발생한 불편사항 및 문제 해결을 위한 파티 채팅 기능을 지원하고 있어요.</p><p><br></p><ul><li>나의 파티 → 해당 파티 페이지 → 우하단 파티 채팅(💬)을 통해 파티 구성원끼리 직접 대화를 나눌 수 있어요.</li></ul><p><br></p>`,
    },
    {
      title: '파티를 연장할 수 있나요?',
      tags: ['파티 연장'],
      content: `<p>네, 파티를 연장할 수 있어요.</p><p><br></p><ul><li>파티 종료 30일 전에 파티장에게 파티를 연장할 수 있는 링크를 전달해 드려요.</li><li>파티원은 파티장이 파티를 연장해야만 파티 연장 이용이 가능해요.</li></ul><p><br></p>`,
    },
    {
      title: '파티 기간을 변경할 수 있나요?',
      tags: ['파티 기간'],
      content: `<p>파티&nbsp;기간은 파티장-파티원간의 약속이므로 한번 파티가 생성되면 바꿀 수 없어요.</p><p>하지만 파티 시작일 전이라면 파티 해산/탈퇴 후 다시 파티를 생성/가입하면 된답니다.</p><p><br></p><p>파티 기간은 단순히 약속을 넘어, 파티 기간을 기준으로 보증금/위약금이 산정되기 때문에 변경할 수 없음을 이해해 주세요!</p><p><br></p>`,
    },
    {
      title: '이용중인 파티는 어떻게 확인할 수 있나요?',
      tags: ['나의 파티'],
      content: `<ul><li>앱 : 버디 홈 → 나의 파티 섹션 → 이용 중인 서비스의 파티 슬롯을 선택하면 파티의 상세 정보를 확인할 수 있어요.</li><li>웹 : 버디 → 나의 파티 탭 → 이용중인 서비스의 파티 슬롯을 선택하면 파티의 상세 정보를 확인할 수 있어요.</li></ul><p><br></p>`,
    },
    {
      title: '파티가 무엇인가요?',
      tags: ['파티', '파티장', '파티원'],
      content: `<p>버디의 ‘파티’는 ‘공동 구독의 단위’로 파티장과 파티원으로 구성되어 있어요.</p><p><br></p><ul><li>파티장은 본인이 구독중인 서비스를 파티원과 함께 공유하는 주체이며,</li><li>파티원은 파티장이 공유한 구독 서비스를 함께 이용하는 파티 구성원 입니다.</li></ul><p><br></p>`,
    },
    {
      title: '파티를 해산하고 싶어요.',
      tags: ['파티장', '파티 해산'],
      content: `<p>버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우상단 파티 메뉴(⋮) → 파티 해산’을 통해 진행할 수 있어요.</p><p><br></p><ul><li>단, 파티장이&nbsp;무단으로 약속한 파티 기간을 채우지 못하고 파티를 해산할 경우</li><li class="ql-indent-1">파티 생성 시 약정한 위약금이 발생해요.</li><li class="ql-indent-1">파티에 적립된 파티 종료 리워드, 파티 탈퇴 보상금을 받을 수 없어요.</li><li>파티 시작일 전이나, 파티에 가입한 파티원이 한 명도 없는 경우에는 위약금 없이 파티 해산이 가능합니다.</li></ul><p><br></p><p><br></p>`,
    },
    {
      title: '파티 시크릿 모드가 무엇인가요?',
      tags: ['파티장', '시크릿 모드'],
      content: `<p>시크릿모드를&nbsp;활성화하면 해당 파티는 '파티 찾기'에서 24시간 동안 검색되지 않아요.</p><p>그&nbsp;사이에 파티장은 파티 초대 링크를 복사하여 자신이 원하는 사람들로 파티를 채울 수 있습니다.</p><p><br></p><ul><li>시크릿모드는 ‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우상단 파티 메뉴(⋮) → 시크릿모드’를 통해 설정/해제할 수 있습니다.</li><li>시크릿모드는 해당 설정을 해제하거나, 24시간이 지나면 해제되어 다시 파티 모집이 실행됩니다.</li></ul><p><br></p><p><br></p><p><strong>연관 질문</strong></p><p><a style="color: inherit;" rel="noopener noreferrer" href="http://localhost:3000/faq/19">파티원을 초대하고 싶어요 →</a></p>`,
    },
    {
      title: '파티원이 중간에 탈퇴하면 어떻게 해야 하나요?',
      tags: ['파티장', '파티원 탈퇴'],
      content: `<p>파티원이 중간에 탈퇴하면, 아래와 같이 진행해 주세요.</p><p><br></p><blockquote><strong>파티장의 아이디, 비밀번호를 공유하는 파티*인 경우</strong></blockquote><ol><li>탈퇴한 파티원의 서비스 프로필을 삭제하기 (프로필이 없는 경우 생략)</li><li>서비스의 비밀번호 변경하기</li><li>버디에 변경한 비밀번호를 업데이트 하기</li></ol><p class="ql-indent-1">*넷플릭스, 디즈니 플러스, 티빙, 웨이브, 왓챠, 라프텔, 프라임 비디오, 해피독 TV, 테니스 TV, NBA 리그패스</p><p><br></p><blockquote><strong>파티장이 파티원을 초대/등록하는 파티**인 경우</strong></blockquote><ol><li>탈퇴한 파티원의 계정을 서비스에서 삭제하기</li></ol><p class="ql-indent-1">**애플, 닌텐도, 케이크, 윌라, 듀오링고, 오피스 365, 네이버 플러스</p>`,
    },
    {
      title: '공유 로그인 정보(아이디, 비밀번호)는 어떻게 변경하나요?',
      tags: ['파티장', '비밀번호 변경'],
      content: `<p>비밀번호 등 공유 로그인 정보를 변경해야 할 경우에는 <strong>꼭 해당 서비스에서 먼저 변경한 뒤 버디에 업데이트</strong>해 주세요.</p><p><br></p><ul><li>공유 로그인 정보는 ‘버디 → 나의 파티 → 공유 로그인 정보 → 우측 변경하기’를 통해 변경할 수 있어요.</li></ul>`,
    },
    {
      title:
        '파티원의 계정 정보가 틀려서 파티원을 초대/등록할 수 없는 경우엔 어떻게 하나요?',
      tags: ['파티장', '초대 오류'],
      content: `<p>파티 채팅을 통해 파티원에게 메시지를 보내 제대로 된 계정 정보를 다시 입력해 달라고 안내해 주세요.</p><p><br></p><p><br></p><p><strong>연관 질문</strong></p><p>파티장, 파티원과 대화하고 싶어요 →</p><p><br></p>`,
    },
    {
      title: '파티원을 초대하고 싶어요.',
      tags: ['파티장', '파티 초대'],
      content: `<p>‘버디 → 나의 파티 → 우상단 초대(공유) 아이콘’을 통해 해당 파티의 초대 링크를 복사한 뒤, 초대할 사람에게 전달해 주세요.</p>`,
    },
    {
      title: '파티 인원을 변경하고 싶어요.',
      tags: ['파티장', '모집 인원'],
      content: `<p>파티 인원은 '버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 파티 구성원 우측 변경하기'를 통해 변경할 수 있어요.</p><p><br></p><ul><li>단, 파티장을 제외하고 최소 1명의 파티원은 꼭 모집해야 해요.</li><li>이미 파티중인 파티원을 강제 탈퇴시킬수는 없어요.</li></ul>`,
    },
    {
      title: '파티를 탈퇴하고 싶어요.',
      tags: ['파티원', '파티 탈퇴'],
      content: `<p><strong>파티원이&nbsp;파티가 종료되기 전에 약속한 파티 기간을 채우지 못하고 파티에서 탈퇴하면,</strong></p><p>파티 가입 시 거치한 보증금을 돌려 받을 수 없어요.</p><p><br></p><p><strong>그래도 파티에서 탈퇴해야 한다면,</strong></p><p>‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우상단 파티 메뉴(⋮) → 파티 탈퇴’를 통해 진행할 수 있어요.</p><p><br></p><p><strong>만약 파티장의 잘못된 운영에 의해 탈퇴하고 싶은 것이라면,</strong></p><p>버디 고객센터를 통해 직접 문의하거나, 해당 파티 페이지 우하단 파티 채팅 아이콘(💬)을 통해 파티장과 직접 문제를 해결할 수도 있어요.</p><p><br></p><p><br></p>`,
    },
    {
      title: '가입한 파티의 파티원 리스트에 파티장과 저만 보여요.',
      tags: ['파티원', '나의 파티'],
      content: `<p>파티장이 직접 파티원을 초대하는 방식으로 운영되는 파티의 경우, 파티원 화면에서는 파티장과 파티원 둘만 보일거예요.</p><p>서비스를 이용하기 위해 다른 파티원의 개인 정보(이메일 등)를 열람할 필요가 없으니까요.</p><p>그리고, 파티원이 둘이든 셋이든 파티원은 1명에 해당하는 파티 요금만 지불하므로 걱정 마세요.</p>`,
    },
    {
      title: '파티장이 서비스 이용권을 결제하지 않았어요.',
      tags: ['파티원', '파티장', '이용권 미결제'],
      content: `<p>파티장이 서비스 이용권을 결제하지 않을 경우, 파티 채팅을 통해 파티장에게 빠른 문제 해결을 요청해 주세요!</p><p><br></p><ul><li>‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우하단 파티 채팅 아이콘(💬)’을 통해 파티장과 채팅할 수 있어요.</li><li>만약, 파티장이 응답하지 않을 경우, 버디 고객센터로 연락해 주세요.</li></ul>`,
    },
    {
      title: '파티장의 계정에 성인 인증이 안되어 있어요.',
      tags: ['파티원', '파티장', '성인 인증'],
      content: `<p>성인 인증 방법은 서비스에 따라 달라요. 파티원이 직접 성인 인증을 할 수도 있고, 파티장에게 성인 인증을 요청할수도 있어요.</p><p><br></p><blockquote>넷플릭스, 티빙, 애플, 디즈니 플러스를 이용하는 파티원은 <strong>직접 성인 인증을 진행</strong>해 주세요.</blockquote><p class="ql-indent-1"><a rel="noopener noreferrer" href="https://www.netflix.com/verifyage">넷플릭스 성인 인증 하기 →</a></p><p class="ql-indent-1"><a rel="noopener noreferrer" href="https://linkid.pw/faq/62">티빙 성인 인증 하기 →</a></p><p class="ql-indent-1"><a rel="noopener noreferrer" href="https://linkid.pw/faq/104">애플 성인 인증 하기 →</a></p><p class="ql-indent-1"><a rel="noopener noreferrer" href="https://linkid.pw/faq/59">디즈니 플러스 성인 인증 하기 →</a></p><p class="ql-indent-1"><br></p><p>‼️ <span style="color: rgb(244, 45, 22);">넷플릭스</span>의 경우, 본인 명의의 계정이 있으면 성인인증에 실패할 수 있어요.</p><p>👉 이 때, 이전에 사용하던 본인 계정의 전화번호를 삭제 또는 변경해 주세요.</p><p><br></p><p><br></p><blockquote>왓챠, 웨이브, 프라임 비디오를 이용하는 파티원은 <strong>파티장에게 성인 인증을 요청</strong>해 주세요.</blockquote><p class="ql-indent-1">‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우하단 파티 채팅 아이콘(💬)’을 통해 파티장과 채팅할 수 있어요.</p>`,
    },
    {
      title: '파티장이 초대를 진행하지 않아요.',
      tags: ['파티원', '파티 초대'],
      content: `<p>파티장이 파티원을 직접 초대/등록하는 파티의 경우 파티장에게도 초대할 시간이 필요해요.</p><p>그래서 파티 시작 시점으로부터 하루(24시간)까지는 대기해 주세요.</p><p><br></p><p>24시간이 경과한 후에도 파티장이 초대를 진행하지 않을 경우,</p><p>파티 채팅을 통해 파티장에게 빠른 문제 해결을 요청해 주세요!</p><ul><li>‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우하단 파티 채팅 아이콘(💬)’을 통해 파티장과 채팅할 수 있어요.</li></ul><p><br></p><p>파티장이 초대/등록을 완료하면, 버디가 앱푸시/카카오 알림톡을 통해 알려드려요.</p><p>만약, 파티장이 응답하지 않거나 초대 과정에 문제가 있을 경우 버디 고객센터로 연락해주세요.</p><p><br></p>`,
    },
    {
      title: '파티장의 공유 로그인 정보에 문제가 있어요.',
      tags: ['파티원', '비밀번호 오류'],
      content: `<p>파티 채팅을 통해 파티장에게 빠른 문제 해결을 요청해 주세요!</p><ul><li>‘버디 → 나의 파티 → 해당 서비스의 파티 페이지 → 우하단 파티 채팅 아이콘(💬)’을 통해 파티장과 채팅할 수 있어요.</li></ul><p><br></p><p>파티장이 새 로그인 정보를 버디에 업데이트하면, 버디가 앱푸시/카카오 알림톡을 통해 알려드려요.</p><p>만약, 파티장이 응답하지 않을 경우, 버디 고객센터로 연락해 주세요.</p>`,
    },
    {
      title: '파티원이 무엇인가요?',
      tags: ['파티원'],
      content: `<p>버디 파티원은 파티장이 공유한 구독 서비스를 함께 이용하는 파티 구성원이에요.</p><p>파티원은 파티 찾기를 통해 간편하게 파티를 검색하고, 원하는 파티에 가입할 수 있어요.</p><p>파티 가입 후 파티 시작일이 되면 해당 파티의 파티 요금과 파티 보증금이 등록한 결제 수단을 통해 자동으로 결제됩니다.</p><p><br></p><p><strong>파티장의 계정을 직접 이용하는 형태라면,</strong></p><p>파티 시작일 이후부터 ‘버디 → 나의 파티’에서 해당 서비스의 공유 로그인 정보를 조회하여 이용할 수 있어요.</p><p><br></p><p><strong>파티장이 파티원을 초대/등록하여 서비스를 이용하는 형태라면,</strong></p><p>파티 시작일 이후에 파티장이 직접 초대를 진행할 거예요.</p><p>이 때, 파티장이 직접 초대를 진행하는 과정에서 최대 하루(24시간)의 시간이 소요될 수 있는 점 양해해 주세요.</p><p><br></p><p><br></p><p><strong>연관 질문</strong></p><p><span style="color: inherit;">첫 달 파티 요금은 어떻게 산정되나요? →</span></p>`,
    },
    {
      title: '파티 기간 중 등록한 카드에 문제가 생기면 어떻게 되나요?',
      tags: ['결제 수단 오류'],
      content: `<ul><li>회원님이 등록한 신용카드에 문제(만료/정지/잔액부족/재발급 등)가 발생하여 결제되지 않는 경우, 귀책 사유로 판정되어 파티 강제 해산 및 탈퇴 등의 불이익을 받으실 수 있어요.</li><li>하지만 너무 걱정하지 마세요. 모종의 이유로 결제가 되지 않는 경우 버디가 카카오 알림톡을 통해 먼저 알려드리고, 버디가 안내드린 기한 내에만 문제가 해결되면 문제 없이 이용하실 수 있답니다.</li></ul><p><br></p>`,
    },
    {
      title: '100원 결제는 왜 필요한가요?',
      tags: [],
      content: `<ul><li>등록한 결제 수단이 유효한지 파악하기 위해 100원 결제는 꼭 필요한 절차예요.</li><li>결제 즉시 취소처리 되기 때문에 걱정 마세요.</li></ul>`,
    },
    {
      title: '결제 수단을 변경하고 싶어요.',
      tags: ['결제 수단 변경'],
      content: `<ul><li>새로운 신용카드로 결제 수단을 변경하거나, 등록한 결제 수단을 삭제하고 싶다면 '결제 수단 관리'를 이용해 보세요.</li><li>'결제 수단 관리'는 버디 앱 접속 후 '마이페이지 → 결제/정산관리'에서 찾을 수 있습니다.</li><li>단, 가입하거나 운영 중인 파티가 있는 경우는 파티 종료까지 등록한 결제 수단을 삭제할 수 없어요.</li></ul>`,
    },
    {
      title: '버디 머니를 충전할 수 있나요?',
      tags: ['버디 머니', '충전'],
      content: `<ul><li>버디 머니는 충전할 수 없어요.</li><li>버디 머니는 파티 이용을 통해서만 적립이 가능해요.</li></ul>`,
    },
    {
      title: '버디 머니를 어떻게 인출하나요?',
      tags: ['버디 머니'],
      content: `<ul><li>버디 머니는 ‘버디 웹/앱 → 마이페이지 → 나의 버디 머니 → 인출하기’를 통해 현금처럼 인출할 수 있어요.</li><li>단, 본인 명의의 계좌로만 인출이 가능하답니다.</li><li>5,000원 미만 금액은 전액 인출만 가능하며, 5,000원 이상 금액은 원하는 액수만큼 인출할 수 있어요.</li></ul>`,
    },
    {
      title: '버디를 탈퇴하면 버디 머니는 어떻게 되나요?',
      tags: ['버디 머니', '회원 탈퇴'],
      content: `<ul><li>적립된 버디 머니가 있는 경우, 버디 회원 탈퇴가 불가능 합니다.</li><li>따라서 버디 회원 탈퇴를 원하신다면, 버디 머니를 전액 인출한 뒤에 회원 탈퇴를 시도해 주세요.</li></ul>`,
    },
    {
      title: '버디 머니 인출이 안돼요.',
      tags: ['버디 머니', '인출 오류'],
      content: `<p>버디 머니를 인출하려고 했는데, 안될 때 있으셨죠?</p><p>은행망 점검 시간에는 인출이 어려울 수 있답니다.</p><p><br></p><p>각 은행 별 점검 시간 관련 자세한 내용은 아래 표를 통해 확인해 주세요.</p><p><span style="color: rgb(139, 139, 139);">은행에 따라 2~3분 정도 시간차가 생길 수 있습니다.</span></p><p><img src="https://storage.googleapis.com/linkidimage/Live/admin/1670922463220_은행별점검시간.png"></p>`,
    },
    {
      title: '버디 머니 인출 계좌를 변경하고 싶어요.',
      tags: ['버디 머니', '인출 계좌 변경'],
      content: `<ul><li>버디 머니 인출 계좌는 ‘버디 → 마이페이지 → 나의 버디 머니 → 인출 하기 → 인출 계좌 변경하기’를 통해 변경할 수 있어요.</li></ul>`,
    },
    {
      title: '버디 머니로 파티 요금을 결제하고 싶어요.',
      tags: ['버디 머니 우선 사용'],
      content: `<ul><li>적립된&nbsp;버디 머니를 파티 요금을 결제할 때 사용하고 싶다면 '버디 머니 우선 결제'를 활성화하면 돼요.</li><li>버디 머니 우선 결제는 ‘버디 → 마이페이지 → 결제/정산관리'에서 찾을 수 있습니다.</li></ul>`,
    },
    {
      title: '버디 머니는 무엇인가요?',
      tags: ['버디 머니'],
      content: `<p>'버디 머니'는 버디 앱 내에서 현금처럼 사용 가능하고, 등록한 계좌로 인출할 수 있는 재화입니다.</p><p>'파티 요금', '파티 해산 보상금', '파티 탈퇴 보상금' 등 적립되는 모든 금액은 '버디 머니'로 지급됩니다.</p><p><br></p><p><br></p><p><strong>연관 링크</strong></p><p><a rel="noopener noreferrer" href="https://linkid.pw/faq/17">버디 머니로 파티 요금 결제하기 →</a></p><p><a rel="noopener noreferrer" href="https://linkid.pw/faq/18">버디 머니 인출 계좌 변경하기 →</a></p>`,
    },
    {
      title: '버디 쿠폰은 어떻게 등록하나요?',
      tags: ['버디 쿠폰', '쿠폰', '쿠폰 코드'],
      content: `<blockquote>버디 쿠폰코드를 알고 있다면, 아래 순서대로 등록해 보세요!</blockquote><p><br></p><ul><li>버디 → 마이페이지 → 쿠폰/포인트 → <strong>쿠폰/포인트 코드 입력</strong> → 등록 버튼 누르기</li></ul><p><br></p><p><br></p><blockquote>버디 쿠폰 사용 방법이 궁금하다면?</blockquote><p><br></p><ul><li><a rel="noopener noreferrer" href="http://localhost:3000/faq/42">버디 쿠폰 사용방법 알아보기 →</a></li></ul><p><br></p><p><br></p><p><br></p><p><br></p>`,
    },
    {
      title: '버디 포인트를 충전할 수 있나요?',
      tags: ['버디 포인트'],
      content: `<p>버디 포인트는 충전할 수 없어요.</p><p>버디 포인트는 이벤트/프로모션을 통해서만 적립받을 수 있어요.</p><p><br></p>`,
    },
    {
      title: '버디 포인트는 어떻게 사용하나요?',
      tags: ['버디 포인트'],
      content: `<p>버디 포인트는 보유하고 있을 경우 자동으로 혜택이 적용됩니다.</p><p><br></p><p><br></p><p><strong>파티장이라면,</strong></p><p>보유중인 버디 포인트 한도내에서 적립 예정 파티 요금만큼 버디 머니가 추가로 적립돼요.</p><ul><li>예. 버디 포인트 1,000P 보유중, 파티 요금 8,000원 적립 예정 → 버디 머니 총 9,000원 적립</li></ul><p><br></p><p><strong>파티원이라면,</strong></p><p>보유중인 버디 포인트 한도 내에서 파티 요금 결제시 버디 포인트를 최우선으로 사용합니다.</p><ul><li>예. 버디 포인트 1,000P 보유중, 파티 요금 5,000원 결제 예정 → 총 4,000원 결제</li></ul><p><br></p>`,
    },
    {
      title: '버디 쿠폰을 구매할 수 있나요?',
      tags: ['버디 쿠폰'],
      content: `<p>버디 쿠폰은 구매할 수 없어요.</p><p>버디 쿠폰은 이벤트/프로모션을 통해서만 획득 가능해요.</p>`,
    },
    {
      title: '버디 쿠폰은 어떻게 사용하나요?',
      tags: ['버디 쿠폰'],
      content: `<p>버디 쿠폰은 쿠폰 금액 한도 내, 매달 일정 비율로 할인/추가 적립 혜택이 적용되는 구조입니다.</p><p>파티장 전용 쿠폰인지, 파티원 전용 쿠폰인지, 특정 서비스에 적용되는 쿠폰인지 꼭 확인해 주세요.</p><p><br></p><p><br></p><p><strong>파티장 사용법</strong></p><ul><li>파티 만들기 → 쿠폰 사용하기 → 파티 만들기 완료시 쿠폰 자동 적용</li></ul><p><br></p><p><strong>파티원 사용법</strong></p><ul><li>파티 찾기 → 파티 선택 및 가입하기 → 쿠폰 사용하기 → 파티 가입 완료시 쿠폰 자동 적용</li></ul><p><br></p><p><strong>진행중인 파티에 쿠폰 적용하는 방법</strong></p><ul><li>마이페이지 → 쿠폰함 → 쿠폰 사용하기 → 사용할 파티 고르기 → 쿠폰 적용 완료</li></ul>`,
    },
    {
      title: 'PIN 번호를 잊어버렸어요. 재설정 하고 싶어요.',
      tags: ['PIN', '핀번호'],
      content: `<p>고객님의 핀번호는 버디 → 마이페이지 → 버디 관리 → PIN 재설정을 통해 변경할 수 있어요.</p>`,
    },
    {
      title: '버디를 탈퇴하고 싶어요.',
      tags: ['버디 탈퇴'],
      content: `<ul><li>버디 탈퇴는 버디 웹에서만 가능합니다. 👉 <a rel="noopener noreferrer" href="http://localhost:3000"><strong>BUDDY</strong></a> 바로가기</li><li>'버디 웹 → 마이페이지 → 회원 정보 수정→ 연결된 소셜 로그인 계정 → 변경하기 → 버디 탈퇴'를 통해 진행해 주세요.</li><li>단, 버디 탈퇴는 진행/예정/매칭 요청중인 파티가 없어야 하고, 버디 머니 잔액이 0원이어야만 가능합니다.</li></ul>`,
    },
    {
      title: '버디를 탈퇴하고 싶어요.',
      tags: ['이용 가능 연령'],
      content: `<ul><li>네, 만 16세 이상 누구나 버디를 이용할 수 있어요.</li><li>단, 성인 콘텐츠에 접근할 수 있는 서비스는 만 19세 이상만 이용할 수 있어요.</li><li class="ql-indent-1">넷플릭스, 디즈니플러스, 티빙, 웨이브, 왓챠, 애플, 프라임비디오</li></ul>`,
    },
    {
      title: '개명 후 이름을 변경하고 싶어요.',
      tags: ['개명'],
      content: `<ul><li>'버디 웹/앱 → 마이페이지 → PIN 재설정'을 통해 이름을 변경할 수 있어요.</li><li>단, PIN 재설정에 필요한 본인 인증 수단(휴대폰) 명의가 개명한 이름이어야 해요.</li></ul>`,
    },
    {
      title: '보조 연락처를 등록하고 싶어요.',
      tags: ['보조 연락처'],
      content: `<ul><li>'버디 웹/앱 → 마이페이지 → 회원 정보 수정 → 보조 연락처 → 등록하기'를 통해 진행할 수 있어요.</li><li>본인 명의의 연락처가 아니어도 등록할 수 있어요.</li></ul>`,
    },
    {
      title: '등록된 휴대폰 번호를 변경하고 싶어요.',
      tags: ['휴대폰 번호', '변경하기'],
      content: `<p>'버디 웹/앱 → 마이페이지 → 회원 정보 수정 → 휴대폰 번호 변경하기'를 통해 진행할 수 있어요.</p><p>버디에서 휴대폰 번호를 변경하려면, 본인 명의의 새 휴대폰 번호로 본인 인증을 진행해 주셔야 합니다.</p>`,
    },
    {
      title: '버디 닉네임을 바꿀 수 있나요?',
      tags: ['버디 닉네임', '변경하기'],
      content: `<p>'버디 웹/앱 → 마이 페이지 → 본인의 버디 닉네임'을 선택하여 변경할 수 있어요.</p><p>버디 닉네임을 바꾸면, 가입한 파티의 구독 서비스 프로필도 꼭 함께 바꿔주셔야 해요.</p>`,
    },
    {
      title: '버디 닉네임이 무엇인가요?',
      tags: ['버디 닉네임'],
      content: `<ul><li>버디 닉네임은 회원님의 사생활 침해 및 불쾌한 상황을 막기 위해 버디가 만든 규칙이에요.</li><li>모든 파티 구성원은 자신의 서비스 프로필을 버디 닉네임으로 변경하여 이용해야 해요.</li></ul>`,
    },
  ];

  return (
    <div className='my-[5rem] w-[42.5rem] grid grid-cols-1 gap-y-3 mx-auto'>
      <Link href='/faq' className='flex items-center gap-x-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='18'
          viewBox='0 -960 960 960'
          width='18'
          fill='#656565'
        >
          <path d='M233-440h607q17 0 28.5-11.5T880-480q0-17-11.5-28.5T840-520H233l155-156q11-11 11.5-27.5T388-732q-11-11-28-11t-28 11L108-508q-6 6-8.5 13T97-480q0 8 2.5 15t8.5 13l224 224q11 11 27.5 11t28.5-11q12-12 12-28.5T388-285L233-440Z' />
        </svg>
        <span className='text-[#656565] text-xs font-light hover:text-black'>
          목록으로 돌아가기
        </span>
      </Link>

      <h1 className='mt-2 text-[1.375rem] leading-[2] font-semibold'>
        {dataSet[parseInt(faqId) - 1].title}
      </h1>

      <div className='flex gap-x-[0.375rem]'>
        {dataSet[parseInt(faqId) - 1].tags.map((tag: string) => (
          <span
            key={faqId}
            className='px-2 py-1 text-[#656565] bg-[#efefef] text-xs font-semibold rounded-[0.3rem]'
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className='mt-7 post'
        dangerouslySetInnerHTML={{
          __html: dataSet[parseInt(faqId) - 1].content,
        }}
      />
    </div>
  );
}
