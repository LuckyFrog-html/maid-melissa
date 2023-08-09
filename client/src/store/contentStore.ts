import { create } from "zustand";

type ContentStore = {
    isMobile: boolean;
    setIsMobile: (val: boolean) => void;
};

export const useContentStore = create<ContentStore>()((set) => ({
    isMobile: false,
    setIsMobile: (val) => {
        set({ isMobile: val });
    },
}));
