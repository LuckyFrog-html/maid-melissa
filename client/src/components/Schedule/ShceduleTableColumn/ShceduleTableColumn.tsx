import { FC, useContext } from "react";
import styles from "./ShceduleTableColumn.module.scss";
import classNames from "classnames";
import { getMinutesFromTime } from "../../../utils/time";
import { Hour } from "@/types/models";
import { useFilterStore } from "@/store/filterStore";
import { useUserStore } from "@/store/userStore";
import { AlertContext } from "@/context/AlertContext";
import { useTranslation } from "next-i18next";

type ShceduleTableColumnProps = {
    dateStr?: string;
    data?: Hour[];
    hours?: boolean;
    last?: boolean;
};

// column height in "minutes" for calculation height of free time blocks, 15 - count of hours
const COLUMN_HEIGHT = 15 * 60;

const ShceduleTableColumn: FC<ShceduleTableColumnProps> = ({
    data,
    hours,
    dateStr = "",
    last = false,
}) => {
    const { address, allergy, cleaning, frequency } = useFilterStore();
    const { userOrders, updateOrders } = useUserStore();

    const { t } = useTranslation("common");

    const { showAlert } = useContext(AlertContext);

    if (hours) {
        return (
            <div
                className={classNames(
                    styles.container,
                    styles.hours,
                    styles.first,
                )}
            >
                {[...Array(15).keys()].map((ind) => {
                    const hour = ind + 8;
                    return (
                        <div className={styles.cell} key={ind}>
                            <p className="text big uppercase wide">{`${
                                hour > 9 ? hour : "0" + hour
                            }:00`}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    const getBlockHeight = (startTime: string, endTime: string) => {
        const startMinutes = getMinutesFromTime(startTime),
            endMinutes = getMinutesFromTime(endTime);

        return (endMinutes - startMinutes) / COLUMN_HEIGHT;
    };

    return (
        <div className={classNames(styles.container, { [styles.last]: last })}>
            {data?.map((item, ind) => {
                return (
                    <div
                        onClick={() => {
                            if (item.ordered) {
                                showAlert!(t("already_ordered"), "success");
                                return;
                            }
                            updateOrders(
                                {
                                    address,
                                    allergy: allergy.join(","),
                                    cleaning: cleaning.join(","),
                                    dateStr,
                                    frequency,
                                    hourId: item.id,
                                },
                                frequency === "twice" ? 2 : 1,
                            );
                        }}
                        key={ind}
                        className={classNames(styles.timeBlock, {
                            [styles.selected]: userOrders.filter(
                                (i) => i.hourId === item.id,
                            ).length,
                            [styles.ordered]: item.ordered,
                        })}
                        style={{
                            top: `${
                                (getMinutesFromTime(item.start_time) /
                                    COLUMN_HEIGHT) *
                                100
                            }%`,
                            height: `${
                                getBlockHeight(item.start_time, item.end_time) *
                                100
                            }%`,
                        }}
                    />
                );
            })}
            {[...Array(15).keys()].map((ind) => {
                return <div className={styles.cell} key={ind}></div>;
            })}
        </div>
    );
};

export default ShceduleTableColumn;
