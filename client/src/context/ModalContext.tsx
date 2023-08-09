"use client";

import Modal from "@/components/ui/Modal/Modal";
import React, { createContext, useState, useEffect } from "react";

type ModalStateProps = {
    children?: React.ReactNode;
    isSidebar?: boolean;
    showModal?: (
        content: React.ReactNode | string,
        closeOnBorder?: boolean,
        isSidebar?: boolean
    ) => void;
    closeModal?: () => void;
};

export const ModalContext = createContext<ModalStateProps>(
    {} as ModalStateProps,
);

const ModalState = ({ children }: ModalStateProps) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isSidebar, setIsSidebar] = useState<boolean>(false);
    const [closeOnBorder, setCloseOnBorder] = useState<boolean>(true);
    const [currContent, setCurrContent] = useState<React.ReactNode>("");

    const showModal = (
        content: React.ReactNode | string,
        closeOnBorder: boolean = true,
        isSidebar: boolean = false,
    ) => {
        setIsOpened(true);
        setIsSidebar(isSidebar);
        setCloseOnBorder(closeOnBorder);
        setCurrContent(content);
    };

    const closeModal = () => {
        setIsOpened(false);
        setTimeout(() => {
            setCurrContent("");
        }, 300);
    };

    useEffect(() => {
        const escClose = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        window.addEventListener("keydown", escClose);

        return () => {
            window.removeEventListener("keydown", escClose);
        };
    }, []);

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            <Modal
                closeOnBorder={closeOnBorder}
                children={currContent}
                isOpen={isOpened}
                handleClose={() => setIsOpened(false)}
                isSidebar={isSidebar}
            />
            {children}
        </ModalContext.Provider>
    );
};

export default ModalState;
