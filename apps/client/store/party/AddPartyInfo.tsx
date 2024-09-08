import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AddPartyInfoState {
  partyInfo: {
    stepName: string;
    planName: string;
    accountInfo: { id: string; password: string };
    recruitmentNum: number;
    startDate: string;
    durationMonth: number;
    endDate: string;
  };
}

const initialPartyInfoState = {
  stepName: 'inputAccount',
  planName: '',
  accountInfo: { id: '', password: '' },
  recruitmentNum: 0,
  startDate: '',
  durationMonth: 0,
  endDate: '',
};

export const AddPartyInfoStore = create(
  devtools((set) => ({
    partyInfo: initialPartyInfoState,

    updateStepName: (newStepName: string) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          stepName: newStepName,
        },
      })),

    updateAccountInfo: (newAccountInfo: { id: string; password: string }) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          accountInfo: { ...state.partyInfo.accountInfo, ...newAccountInfo },
        },
      })),

    updateRecruitmentNum: (newRecruitmentNum: number) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          recruitmentNum: newRecruitmentNum,
        },
      })),

    updateStartDate: (newStartDate: Date) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          startDate: newStartDate,
        },
      })),

    updateDurationMonth: (newDurationMonth: number) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          durationMonth: newDurationMonth,
        },
      })),

    updateEndDate: (newEndDate: Date) =>
      set((state: AddPartyInfoState) => ({
        partyInfo: {
          ...state.partyInfo,
          endDate: newEndDate,
        },
      })),

    resetPartyInfo: () =>
      set(() => ({
        partyInfo: initialPartyInfoState,
      })),
  }))
);
