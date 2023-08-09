import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from "@/utils/localStorage";
import axios from "axios";

const $host = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
    headers: {
        "Content-Type": "application/json",
    },
});

const $authHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_PATH,
    headers: {
        "Content-Type": "application/json",
    },
});

$authHost.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let times: number = 0;

$authHost.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "auth/signin" && err.response) {
            if (err.response.status === 401) {
                try {
                    times++;
                    if (!getLocalAccessToken() || times >= 3) {
                        return;
                    }
                    const rs = await $host.get("/auth/refresh", {
                        headers: {
                            Authorization: "Bearer " + getLocalRefreshToken(),
                        },
                    });

                    const { accessToken } = rs.data;
                    updateLocalAccessToken(accessToken);

                    return $authHost(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export { $host, $authHost };
