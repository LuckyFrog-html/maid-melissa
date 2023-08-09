import { FC } from "react";
import classNames from "classnames";
import styles from "./CustomAccordion.module.scss";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

type CustomAccordionProps = {
    question: string;
    anwser: string;
};

const CustomAccordion: FC<CustomAccordionProps> = ({ question, anwser }) => {
    return (
        <Accordion
            className={styles.container}
            allowZeroExpanded
            allowMultipleExpanded
        >
            <AccordionItem className={styles.item}>
                <AccordionItemHeading className={styles.head}>
                    <AccordionItemButton
                        className={classNames("text big wide", styles.text)}
                    >
                        {question}
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className={styles.panel}>
                    <p className="text">{anwser}</p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default CustomAccordion;
