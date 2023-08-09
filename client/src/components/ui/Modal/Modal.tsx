import { FC, useEffect, useState } from "react";
import ReactPortal from "../../ui/ReactPortal/ReactPortal";
import styles from "./Modal.module.scss";
import cn from "classnames";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    closeOnBorder?: boolean;
    isSidebar: boolean;
}

const Modal: FC<ModalProps> = ({
    children,
    isOpen,
    handleClose,
    closeOnBorder,
    isSidebar,
}) => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isHide, setIsHide] = useState(true);

    useEffect(() => {
        let id: NodeJS.Timeout;
        if (isOpen) {
            setIsHide(false);
            id = setTimeout(() => {
                setIsModalOpened(true);
            }, 50);
        } else {
            setIsModalOpened(false);
            id = setTimeout(() => {
                setIsHide(true);
            }, 300);
        }

        return () => {
            clearTimeout(id);
        };
    }, [isOpen]);

    return (
        <ReactPortal>
            <div
                onClick={(e) => {
                    e.target === e.currentTarget &&
                        closeOnBorder &&
                        handleClose();
                }}
                className={cn(styles.container, {
                    [styles.hide]: isHide,
                    [styles.active]: isModalOpened,
                    [styles.sidebar]: isSidebar,
                })}
            >
                {!isHide && (
                    <div className={styles.modalBody}>
                        {!closeOnBorder && (
                            <div
                                onClick={() => handleClose()}
                                className={styles.cross}
                            >
                                <img src="/cross.svg" alt="cross" />
                            </div>
                        )}
                        {children}
                    </div>
                )}
            </div>
        </ReactPortal>
    );
};

export default Modal;
