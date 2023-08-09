import { Hour } from "@/types/models";
import { $authHost, $host } from "..";

export const getFreeHours = async (): Promise<{
    hours: Hour[];
    status: "error" | "success";
}> => {
    try {
        const { data } = await $host.get<Hour[]>("/hours/free");

        return { status: "success", hours: data };
    } catch (error) {
        return { status: "error", hours: [] };
    }
};

export const getUserOrders = async (): Promise<{
    hours: Hour[];
    status: "error" | "success";
}> => {
    try {
        const { data } = await $authHost.get<{ hours: Hour[] }>("/orders/user");

        return { status: "success", hours: data.hours };
    } catch (error) {
        return { status: "error", hours: [] };
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
        return { data: res.data, status: "success" };
    } catch (error) {
        return { status: "error" };
    }
};
