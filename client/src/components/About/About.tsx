import styles from "./About.module.scss";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

const About = () => {
    const { t } = useTranslation(["common", "seo"]);

    return (
        <div id="about" className={styles.container}>
            <p className={classNames("header", styles.header)}>{t("about")}</p>
            <p className={classNames("text huge", styles.text)}>
                {t("about_text", { ns: "seo" })}
            </p>
        </div>
    );
};

export default About;
