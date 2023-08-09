export const getMinutesFromTime = (time: string, timeStep: number = 8) => {
    const hours = Number(time.split(":")[0]),
        minutes = Number(time.split(":")[1]);
    return (hours - timeStep) * 60 + minutes;
};
