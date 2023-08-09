import axios, { AxiosError } from "axios";
import { $authHost, $host } from "..";
import { User } from "@/types/models";

export const signUp = async (data: {
    email: string;
    firstname: string;
    lastname: string;
    date_of_birth: Date;
    phone: string;
}): Promise<{ status: "error" | "success" | "already" }> => {
    try {
        const res = await $host.post("/auth/signup", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                return { status: "error" };
            }
        }
        return { status: "already" };
    }
};

export const verifyCode = async (data: {
    email: string;
    code: string;
}): Promise<{ status: "error" | "success" | "not found" | "incorrect" }> => {
    try {
        const res = await $host.post("/auth/verify", data);
        return { status: "success" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                return { status: "error" };
            } else if (error.response?.status === 404) {
                return { status: "not found" };
            }
        }
        return { status: "incorrect" };
    }
};

export const updatePass = async (data: {
    email: string;
    password: string;
}): Promise<{ status: "error" | "success" }> => {
    try {
        const res = await $host.post("/auth/update_pass", data);
        return { status: "success" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                return { status: "error" };
            }
        }
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
    status: "success" | "error" | "not exist";
}> => {
    try {
        const res = await $host.post("/auth/signin", data);
        return { ...res.data, status: "success" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === "ERR_NETWORK") {
                return { status: "error" };
            }
        }
        return { status: "not exist" };
    }
};

export const auth = async (): Promise<{ user: User; status: string }> => {
    try {
        const { data } = await $authHost.get("/auth");
        return { user: data, status: "success" };
    } catch (e) {
        return { user: {} as User, status: "error" };
    }
};

export const logout = async () => {
    try {
        const { data } = await $authHost.get("/auth/logout");
        return { status: "success" };
    } catch (e) {
        return { status: "error" };
    }
};
