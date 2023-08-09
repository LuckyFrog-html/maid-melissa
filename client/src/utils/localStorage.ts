export const getLocalAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const updateLocalAccessToken = (token: string) => {
    localStorage.setItem("accessToken", token);
};

export const getLocalRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const updateLocalRefreshToken = (token: string) => {
    localStorage.setItem("refreshToken", token);
};

export const clearLocalTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};