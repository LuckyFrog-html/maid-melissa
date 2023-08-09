"use client";

import { useState, FC, useEffect } from "react";
import styles from "./CustomSelect.module.scss";
import classNames from "classnames";
import Button from "../Button/Button";

type CustomSelectProps = {
    options: { name: string; value: string }[];
    onSelect: ([]: any[]) => void;
    value?: any;
    multiple?: boolean;
    singleValue?: string;
    disabled?: boolean;
    grid?: boolean;
};

const CustomSelect: FC<CustomSelectProps> = ({
    onSelect,
    options,
    singleValue, // if this value selected, not any one other values can be selected
    value,
    multiple = false,
    disabled = false,
    grid = false,
}) => {
    const [currActives, setCurrActives] = useState<string[]>([]);

    useEffect(() => {
        value && setCurrActives(value);
    }, [value]);

    const clickHandler = (item: string, isSelected: boolean) => {
        if (multiple) {
            if (!isSelected) {
                setCurrActives((prev) =>
                    singleValue && singleValue === item
                        ? [item]
                        : singleValue && singleValue !== item
                        ? [...prev, item].filter((it) => it !== singleValue)
                        : [...prev, item],
                );
                onSelect(
                    singleValue && singleValue === item
                        ? [item]
                        : singleValue && singleValue !== item
                        ? [...currActives, item].filter(
                              (it) => it !== singleValue,
                          )
                        : [...currActives, item],
                );
            } else if (currActives.length !== 1) {
                setCurrActives((prev) => prev.filter((it) => it !== item));
                onSelect(currActives.filter((it) => it !== item));
            }
        } else {
            if (!isSelected) {
                setCurrActives([item]);
                onSelect([item]);
            } else if (currActives.length !== 1) {
                setCurrActives([]);
                onSelect([]);
            }
        }
    };

    return (
        <div
            className={classNames(styles.container, styles.disabled, {
                [styles.grid]: grid,
            })}
        >
            {options.map((item, ind) => {
                return (
                    <div key={ind} className={styles.item}>
                        <Button
                            className={styles.button}
                            disabled={disabled}
                            selected={currActives.includes(item.value)}
                            onClick={() =>
                                clickHandler(
                                    item.value,
                                    currActives.includes(item.value),
                                )
                            }
                        >
                            {item.name}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default CustomSelect;
