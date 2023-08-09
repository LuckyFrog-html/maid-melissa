import styles from "./Services.module.scss";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import Button from "../ui/Button/Button";
import smoothScroll from "@/utils/smoothScroll";
import Image from "next/image";

const Services = () => {
    const { t } = useTranslation(["seo", "common"]);

    return (
        <div id="services" className={styles.container}>
            <p className="header">{t("services", { ns: "common" })}</p>
            <div className={styles.services}>
                {[...Array(4).keys()].map((ind) => {
                    return (
                        <div key={ind} className={styles.service}>
                            <Image width={280} height={256} src={`/services/${ind + 1}.png`} alt="" />
                            <p
                                className={classNames(
                                    "subheader uppercase",
                                    styles.title,
                                )}
                            >
                                {t(`service_title_${ind + 1}`)}
                            </p>
                            <p
                                className={classNames(
                                    "text small",
                                    styles.text,
                                )}
                            >
                                {t(`service_body_${ind + 1}`)}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className={styles.button}>
                <Button onClick={() => smoothScroll("#filter")}>
                    {t("go_to_filter_btn", { ns: "common" })}
                </Button>
            </div>
        </div>
    );
};

export default Services;
