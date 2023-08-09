import { FC, useState } from "react";
import { useTimer } from "react-timer-hook";
import { correctTime } from "../../../utils/correctTime";
import styles from "./Timer.module.scss";
import classNames from "classnames";

// time is seconds to expire
type TimerProps = {
    time: number;
    onTimeUp: () => void
};

const Timer: FC<TimerProps> = ({ time, onTimeUp }) => {
    const [timeIsUp, setTimeIsUp] = useState<boolean>(false);

    const { seconds, minutes, isRunning, start, pause, restart } = useTimer({
        expiryTimestamp: new Date(Date.now() + 1000 * time),
        autoStart: true,
        onExpire: onTimeUp
    });

    return (
        <div className={styles.container}>
            <p
                className={classNames("text big", styles.time, {
                    [styles.red]: timeIsUp,
                })}
            >
                {correctTime(minutes)}:{correctTime(seconds)}
            </p>
        </div>
    );
};

export default Timer;
