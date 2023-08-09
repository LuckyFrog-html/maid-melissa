import { Hour } from "@/types/models";
import { create } from "zustand";

type HoursStore = {
    hours: Hour[];
    setHours: (val: Hour[]) => void;
    addHour: (val: Hour) => void;
};

export const useHoursStore = create<HoursStore>()((set) => ({
    hours: [],
    setHours: (val) => {
        set({ hours: val });
    },
    addHour: (val) => {
        set((state) => ({ hours: [...state.hours, val] }));
    },
}));
