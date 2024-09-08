import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const FaqTabNameStore = create(
  devtools((set) => ({
    tabName: 'topQuestion',

    updateTabName: (newTabName: string) =>
      set(() => ({
        tabName: newTabName,
      })),
  }))
);
