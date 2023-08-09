import { FC } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";
import Image from "next/image";
import { useTranslation } from "next-i18next";

type InputProps = {
    type?: string;
    value: string;
    setValue: (val: string) => void;
    placeholder?: string;
    icon?: string;
    borderBottom?: boolean;
    readonly?: boolean;
    wrong?: boolean;
};

const Input: FC<InputProps> = ({
    setValue,
    value,
    icon,
    type = "text",
    placeholder = "",
    borderBottom = false,
    readonly = false,
    wrong = false,
}) => {
    const { t } = useTranslation("auth");

    return (
        <div
            className={classNames(styles.container, {
                [styles.borderBottom]: borderBottom,
            })}
        >
            {wrong && <div className={styles.wrong}>{t("wrong_format")}</div>}
            {icon && (
                <Image
                    width={25}
                    height={25}
                    className={styles.icon}
                    src={icon}
                    alt="icon"
                />
            )}
            <input
                readOnly={readonly}
                type={type}
                value={value}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                }
                placeholder={placeholder}
                className={classNames(styles.input, {
                    [styles.withIcon]: icon,
                    [styles.wrongInput]: wrong,
                })}
            />
        </div>
    );
};

export default Input;
