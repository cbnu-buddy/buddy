import { StaticImageData } from 'next/image';

export interface PartySelectedPlanInfo {
  iconImg: StaticImageData;
  iconImgAlt: string;
  name: string;
  category: string;
  tagName: string;
  homePageUrl: string;
  planDetailInfos: {
    id: number;
    name: string;
    price: number;
    maxPartyMemberNum: number;
    description: (string | undefined)[];
  }[];
  selectedPlanName: string;
  selectedPlanId: number;
  partyLeaderGuides: {
    subtitle: string;
    description: string;
  }[];
}
