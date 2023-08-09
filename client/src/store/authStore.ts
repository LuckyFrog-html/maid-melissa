import { create } from "zustand";

type AuthStore = {
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    verification: string;
    pass: string;
    newPass: string;
    login: string;
    setFirstname: (val: string) => void;
    setLastname: (val: string) => void;
    setDateOfBirth: (val: string) => void;
    setEmail: (val: string) => void;
    setPhone: (val: string) => void;
    setVerification: (val: string) => void;
    setPass: (val: string) => void;
    setNewPass: (val: string) => void;
    setLogin: (val: string) => void;
    clearStore: () => void;
};

const initState = {
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    verification: "",
    pass: "",
    newPass: "",
    login: "",
};

export const useAuthStore = create<AuthStore>()((set) => ({
    ...initState,
    setFirstname: (val) => {
        set({ firstname: val });
    },
    setLastname: (val) => {
        set({ lastname: val });
    },
    setDateOfBirth: (val) => {
        set({ dateOfBirth: val });
    },
    setEmail: (val) => {
        set({ email: val });
    },
    setPhone: (val) => {
        set({ phone: val });
    },
    setVerification: (val) => {
        set({ verification: val });
    },
    setPass: (val) => {
        set({ pass: val });
    },
    setNewPass: (val) => {
        set({ newPass: val });
    },
    setLogin: (val) => {
        set({login: val})
    },
    clearStore: () => {
        set({ ...initState });
    },
}));
