import { useTranslation } from "next-i18next";
import styles from "./Contacts.module.scss";
import classNames from "classnames";

const Contacts = () => {
    const { t } = useTranslation(["common", "seo"]);

    return (
        <div id="contacts" className={styles.container}>
            <p className="header">{t("contacts")}</p>
            <p className={classNames("text big", styles.subheader)}>
                {t("contacts_subheader", { ns: "seo" })}
            </p>
            <div className={styles.smList}>
                <p className="text wide link">{t("telegram")}</p>
                <p className="text wide link">{t("viber")}</p>
                <p className="text wide link">{t("whatsapp")}</p>
            </div>
        </div>
    );
};

export default Contacts;
