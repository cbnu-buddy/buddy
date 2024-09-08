'use client';

import TopQuestionList from './components/topQuestion/TopQuestionList';
import PartyList from './components/party/PartyList';
import PartyLeaderList from './components/partyLeader/PartyLeaderList';
import PartyMemberList from './components/partyMember/PartyMemberList';
import PaymentAndAccumulationList from './components/paymentAndAccumulation/PaymentAndAccumulationList';
import CouponAndPointList from './components/couponAndPoint/CouponAndPointList';
import UseBuddyList from './components/useBuddy/UseBuddyList';
import { FaqTabNameStore } from '@/store/faq/FaqTabName';

export default function Faq() {
  const faqTabName = FaqTabNameStore((state: any) => state.tabName);

  return (
    <div>
      {faqTabName === 'topQuestion' ? (
        <TopQuestionList />
      ) : faqTabName === 'party' ? (
        <PartyList />
      ) : faqTabName === 'partyLeader' ? (
        <PartyLeaderList />
      ) : faqTabName === 'partyMember' ? (
        <PartyMemberList />
      ) : faqTabName === 'paymentAndAccumulation' ? (
        <PaymentAndAccumulationList />
      ) : faqTabName === 'couponAndPoint' ? (
        <CouponAndPointList />
      ) : faqTabName === 'useBuddy' ? (
        <UseBuddyList />
      ) : null}
    </div>
  );
}
