import { useTranslation } from "next-i18next";
import styles from "./Benefits.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { useContentStore } from "@/store/contentStore";

const Benefits = () => {
    const { t } = useTranslation(["seo", "common"]);

    const { isMobile } = useContentStore();

    return (
        <div className={styles.container}>
            {!isMobile && (
                <p className="header">{t("benefits", { ns: "common" })}</p>
            )}
            <div className={styles.content}>
                <div className={styles.imgWrapper}>
                    <div className={styles.img}>
                        <Image
                            width={510}
                            height={600}
                            src="/melissa.png"
                            alt="avatar"
                        />
                    </div>
                    {isMobile && (
                        <p className="header">
                            {t("app_title", { ns: "common" })}
                        </p>
                    )}
                </div>
                {isMobile && (
                    <p className={classNames("header", styles.mobileHeader)}>{t("benefits", { ns: "common" })}</p>
                )}
                <div className={styles.benefits}>
                    {[...Array(4).keys()].map((ind) => {
                        return (
                            <div key={ind} className={styles.benefit}>
                                <p className="subheader big light-red">
                                    {ind + 1}
                                </p>
                                <p
                                    className={classNames(
                                        "subheader uppercase red",
                                        styles.title,
                                    )}
                                >
                                    {t(`benefit_title_${ind + 1}`)}
                                </p>
                                <p className={classNames("text")}>
                                    {t(`benefit_body_${ind + 1}`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Benefits;
