import { FC, ReactElement, useState, useEffect } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { Oval } from "react-loader-spinner";

type ButtonProps = {
    children: ReactElement | string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    dark?: boolean;
    noShadow?: boolean;
    loading?: boolean;
};

const Button: FC<ButtonProps> = ({
    children,
    onClick,
    className,
    selected = false,
    disabled = false,
    dark = false,
    noShadow = false,
    loading = false,
}) => {
    const [currFocused, setCurrFocused] = useState<boolean>(false);

    return (
        <button
            onBlur={() => setCurrFocused(false)}
            onFocus={() => setCurrFocused(true)}
            onClick={() => onClick && !disabled && onClick()}
            className={classNames(styles.button, className, {
                [styles.selected]: selected,
                [styles.focus]: currFocused && !selected,
                [styles.disabled]: disabled || loading,
                [styles.dark]: dark,
                [styles.noShadow]: noShadow,
                [styles.loading]: loading,
            })}
        >
            {loading ? (
                <Oval
                    secondaryColor="rgb(124, 137, 173)"
                    color="rgb(62, 79, 125)"
                    strokeWidth={4}
                />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
