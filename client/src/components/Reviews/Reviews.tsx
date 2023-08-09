import { useTranslation } from "next-i18next";
import styles from "./Reviews.module.scss";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

import { FreeMode } from "swiper/modules";
import ReviewItem from "./ReviewItem/ReviewItem";
import { useContentStore } from "@/store/contentStore";

const Reviews = () => {
    const { t } = useTranslation(["seo", "common"]);

    const { isMobile } = useContentStore();

    return (
        <div className={styles.container}>
            <p className={classNames("header", styles.header)}>{t("reviews", { ns: "common" })}</p>
            <p className={classNames("text big", styles.subheader)}>
                {t("reviews_subheader")}
            </p>
            <div className={styles.content}>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={isMobile ? 10 : 30}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="swiper-review"
                >
                    {[...Array(2).keys()].map((ind) => {
                        return (
                            <SwiperSlide key={ind}>
                                <ReviewItem
                                    img={`/reviews/${ind + 1}.png`}
                                    name={t(`review_author_${ind + 1}`)}
                                    body={t(`review_body_${ind + 1}`)}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;
