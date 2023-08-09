import { FC, ReactElement, useState, useEffect } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";

type ButtonProps = {
    children: ReactElement | string;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    dark?: boolean;
    noShadow?: boolean;
};

const Button: FC<ButtonProps> = ({
    children,
    onClick,
    className,
    selected = false,
    disabled = false,
    dark = false,
    noShadow = false,
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
                [styles.disabled]: disabled,
                [styles.dark]: dark,
                [styles.noShadow]: noShadow,
            })}
        >
            {children}
        </button>
    );
};

export default Button;
