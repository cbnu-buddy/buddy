import { PartySelectedPlanInfo } from '@/types/partySelectedPlan';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PartySelectedPlanInfoStoreState {
  partySelectedPlanInfo: PartySelectedPlanInfoStoreState;
}

const initialState = {
  iconImg: null,
  iconImgAlt: '',
  name: '',
  category: '',
  originPrice: 0,
  discountedPrice: 0,
  tagName: '',
  planDetailInfos: [],
  selectedPlanName: '',
  selectedPlanId: 0,
};

export const PartySelectedPlanInfoStore = create(
  devtools((set) => ({
    partySelectedPlanInfo: initialState,

    updateSelectedPlanInfo: (newPartySelectedPlanInfo: PartySelectedPlanInfo) =>
      set((state: PartySelectedPlanInfoStoreState) => ({
        partySelectedPlanInfo: {
          ...state.partySelectedPlanInfo,
          ...newPartySelectedPlanInfo,
        },
      })),

    updateSelectedPlanName: (newSelectedPlanName: string) =>
      set((state: PartySelectedPlanInfoStoreState) => ({
        partySelectedPlanInfo: {
          ...state.partySelectedPlanInfo,
          selectedPlanName: newSelectedPlanName,
        },
      })),

    updateSelectedPlanId: (newSelectedPlanId: string) =>
      set((state: PartySelectedPlanInfoStoreState) => ({
        partySelectedPlanInfo: {
          ...state.partySelectedPlanInfo,
          selectedPlanId: newSelectedPlanId,
        },
      })),

    removeSelectedPlanInfo: () =>
      set(() => ({
        partySelectedPlanInfo: initialState,
      })),
  }))
);
