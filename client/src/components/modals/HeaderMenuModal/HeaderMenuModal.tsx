import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import styles from "./HeaderMenuModal.module.scss";
import Button from "@/components/ui/Button/Button";
import { useTranslation } from "next-i18next";
import smoothScroll from "@/utils/smoothScroll";
import classNames from "classnames";
import AuthModal from "../AuthModal/AuthModal";

const HeaderMenuModal = () => {
    const { closeModal, showModal } = useContext(ModalContext);

    const { t } = useTranslation(["common", "auth"]);

    return (
        <div className={styles.container}>
            <div
                onClick={() => closeModal && closeModal()}
                className={styles.burger}
            >
                <img src="/burger.svg" alt="burger" />
            </div>
            <div className={styles.buttons}>
                <Button
                    onClick={() =>
                        showModal!(<AuthModal initState="signup_first" />)
                    }
                >
                    {t("signup", { ns: "auth" })}
                </Button>
                <Button
                    onClick={() => showModal!(<AuthModal initState="signin" />)}
                >
                    {t("signin", { ns: "auth" })}
                </Button>
            </div>
            <nav className={styles.nav}>
                <p
                    onClick={() => {
                        closeModal!();
                        smoothScroll("#about");
                    }}
                    className={classNames("subheader link small", styles.link)}
                >
                    {t("about")}
                </p>
                <p
                    onClick={() => {
                        closeModal!();
                        smoothScroll("#services");
                    }}
                    className={classNames("subheader link small", styles.link)}
                >
                    {t("services")}
                </p>
                <p
                    onClick={() => {
                        closeModal!();
                        smoothScroll("#schedule");
                    }}
                    className={classNames("subheader link small", styles.link)}
                >
                    {t("schedule")}
                </p>
                <p
                    onClick={() => {
                        closeModal!();
                        smoothScroll("#contacts");
                    }}
                    className={classNames("subheader link small", styles.link)}
                >
                    {t("contacts_header")}
                </p>
            </nav>
        </div>
    );
};

export default HeaderMenuModal;
