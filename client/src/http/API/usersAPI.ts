import axios, { AxiosError } from "axios";
import { $authHost, $host } from "..";
import { User } from "@/types/models";

export const signUp = async (data: {
    email: string;
    firstname: string;
    lastname: string;
    date_of_birth: Date;
    phone: string;
}) => {
    try {
        const res = await $host.post("/auth/signup", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        return { status: "already" };
    }
};

export const verifyCode = async (data: { email: string; code: string }) => {
    try {
        const res = await $host.post("/auth/verify", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return { status: "not found" };
            } else if (error.response?.status === 400) {
                return { status: "code is incorrect" };
            }
        }
    }
};

export const updatePass = async (data: { email: string; password: string }) => {
    try {
        const res = await $host.post("/auth/update_pass", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        return { status: "error" };
    }
};

export const signIn = async (data: {
    login: string;
    password: string;
}): Promise<{
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    resUser?: {
        id: string;
        isVerified: boolean;
        email: string;
        phone: string;
        date_of_birth: Date;
        firstname: string;
        lastname: string;
    };
    status: string;
}> => {
    try {
        const res = await $host.post("/auth/signin", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        return { status: "user does not exist" };
    }
};

export const auth = async (): Promise<User> => {
    try {
        const { data } = await $authHost.get("/auth");
        return data;
    } catch (e) {
        console.log(e);
        return {} as User;
    }
};

export const logout = async () => {
    try {
        const { data } = await $authHost.get("/auth/logout");
        return data;
    } catch (e) {
        console.log(e);
        return {} as User;
    }
}