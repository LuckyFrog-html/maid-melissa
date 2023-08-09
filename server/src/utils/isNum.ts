export const isNum = (str: string): boolean => {
    if (typeof str != "string") return false;
    return !isNaN(+str) && !isNaN(Number(str));
};
