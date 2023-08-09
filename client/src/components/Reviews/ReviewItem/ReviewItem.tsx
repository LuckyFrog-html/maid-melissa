import { FC } from "react";
import styles from "./ReviewItem.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { useContentStore } from "@/store/contentStore";

type ReviewItemProps = {
    img: string;
    name: string;
    body: string;
};

const ReviewItem: FC<ReviewItemProps> = ({ body, img, name }) => {
    const { isMobile } = useContentStore();

    return (
        <div className={styles.container}>
            <Image width={100} height={100} src={img} alt="review" />
            <div className={styles.content}>
                <p
                    className={classNames(
                        `text ${isMobile ? "small" : "medium"} wide`,
                        styles.name,
                    )}
                >
                    {name}
                </p>
                <p
                    className={classNames(
                        `text ${isMobile ? "small" : "medium"}`,
                        styles.body,
                    )}
                >
                    {body}
                </p>
            </div>
        </div>
    );
};

export default ReviewItem;
