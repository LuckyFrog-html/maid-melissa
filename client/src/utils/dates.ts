export const getWeekDays = (locale: string): string[] => {
    const baseDate = new Date(Date.now()),
        weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(
            baseDate.toLocaleDateString(locale, { weekday: "short" }),
        );
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

export const getWeekDates = (locale: string): string[] => {
    const baseDate = new Date(Date.now()),
        weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, { day: "numeric" }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

export const getYears = (from: number): string[] => {
    return [...Array(2023 - from).keys()].map((i) => String((i += from)));
};

export const getMonthList = (locale: string): string[] => {
    const baseDate = new Date("01/01/2000"),
        month = [];
    for (let i = 0; i < 12; i++) {
        month.push(baseDate.toLocaleDateString(locale, { month: "long" }));
        baseDate.setMonth(baseDate.getMonth() + 1);
    }
    return month;
};

export const getDays = (daysInMonth: number) => {
    return [...Array(daysInMonth).keys()].map((i) => (i += 1));
};
