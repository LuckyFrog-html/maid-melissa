import { useContext, useEffect } from "react";
import styles from "./ShceduleTable.module.scss";
import { getWeekDates, getWeekDays } from "@/utils/dates";
import { useTranslation } from "next-i18next";
import ShceduleTableColumn from "../ShceduleTableColumn/ShceduleTableColumn";
import { useFilterStore } from "@/store/filterStore";
import { useHoursStore } from "@/store/hoursStore";

const ShceduleTable = () => {
    const { i18n } = useTranslation();

    const { address, cleaning } = useFilterStore();
    const { hours } = useHoursStore();

    const days = getWeekDays(i18n.language);
    const dates = getWeekDates(i18n.language);

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <div></div>
                {dates.map((item, ind) => {
                    return (
                        <div key={ind}>
                            <p className="text big uppercase wide">{item}</p>
                            <p className="text big uppercase wide">
                                {days[ind]}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className={styles.columns}>
                <ShceduleTableColumn hours />
                {[...Array(7).keys()].map((ind) => {
                    return (
                        <ShceduleTableColumn
                            key={ind}
                            last={ind === 8}
                            dateStr={`${dates[ind]} ${days[ind]}`}
                            data={
                                address === "test" && cleaning.length !== 0
                                    ? hours?.filter((it) => it.day === ind + 1)
                                    : []
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ShceduleTable;
