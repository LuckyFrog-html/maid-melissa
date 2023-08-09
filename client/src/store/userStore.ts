import { Order, User } from "@/types/models";
import { create } from "zustand";

type UserStore = {
    user: User | null;
    isAuth: boolean;
    userOrders: Order[];
    setUser: (val: User) => void;
    updateOrders: (val: Order, ordersCount: number) => void;
    clearUser: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    isAuth: false,
    userOrders: [],
    userAcceptedOrders: [],
    setUser: (val) => {
        set({ user: val, isAuth: true });
    },
    // update orders, in userOrders remains only `orderCount` last items, ex:
    // >>> userOrders = [1, 2, 3]
    // >>> updateOrders(4, 3)
    // >>> userOrders -> [2, 3, 4]
    updateOrders: (val, orderCount) => {
        set((state) => ({
            userOrders: [...state.userOrders, val].filter((_, ind) => {
                return ind >= state.userOrders.length - orderCount + 1;
            }),
        }));
    },
    clearUser: () => {
        set({ user: null, isAuth: false, userOrders: [] });
    },
}));
