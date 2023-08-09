import { Hour } from "@/types/models";
import { $authHost, $host } from "..";

export const getFreeHours = async (): Promise<Hour[] | undefined> => {
    try {
        const { data } = await $host.get<Hour[]>("/hours/free");

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getUserOrders = async (): Promise<Hour[] | undefined> => {
    try {
        const { data } = await $authHost.get<{hours: Hour[]}>("/orders/user");

        console.log("data is", data);

        return data.hours;
    } catch (error) {
        console.log(error);
    }
};

export const orderHour = async (data: {
    userId: string;
    hourId: string;
    address: string;
    allergy: string;
    frequency: string;
    cleaning: string;
    dateStr: string;
}) => {
    try {
        const res = await $authHost.post("/orders", data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
