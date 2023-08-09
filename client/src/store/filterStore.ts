import { create } from "zustand";

export type AllergyType = [] | "none"[] | ("cats" | "dogs")[];
export type FrequencyType = "" | "onetime" | "twice" | "weekly";
export type CleaningType =
    | []
    | ["regular"]
    | ("regular" | "window" | "relocation" | "repairing")[];

type FilterStore = {
    address: string;
    allergy: AllergyType;
    frequency: FrequencyType;
    cleaning: CleaningType;
    setAddress: (val: string) => void;
    setAllergy: (val: AllergyType) => void;
    setFrequency: (val: FrequencyType) => void;
    setCleaning: (val: CleaningType) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
    address: "",
    allergy: [],
    frequency: "",
    cleaning: [],
    setAddress: (val) => {
        set({ address: val });
    },
    setAllergy: (val) => {
        set({ allergy: val });
    },
    setFrequency: (val) => {
        set({ frequency: val });
    },
    setCleaning: (val) => {
        set({ cleaning: val });
    },
}));
