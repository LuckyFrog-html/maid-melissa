import { useTranslation } from "next-i18next";
import CustomAccordion from "../ui/CustomAccordion/CustomAccordion";
import styles from "./Anwsers.module.scss";
import classNames from "classnames";

const Anwsers = () => {
    const { t } = useTranslation(["seo", "common"]);

    return (
        <div className={styles.container}>
            <p className={classNames("header", styles.header)}>
                {t("anwsers", { ns: "common" })}
            </p>
            <div className={styles.list}>
                {[...Array(6).keys()].map((ind) => {
                    return (
                        <div key={ind} className={styles.item}>
                            <CustomAccordion
                                question={t(`question_name_${ind + 1}`)}
                                anwser={t(`question_anws_${ind + 1}`)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Anwsers;
