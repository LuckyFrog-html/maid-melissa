"use client";

import classNames from "classnames";
import styles from "./Header.module.scss";
import smoothScroll from "@/utils/smoothScroll";
import { useTranslation } from "next-i18next";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import AuthModal from "../modals/AuthModal/AuthModal";
import { useUserStore } from "@/store/userStore";
import Button from "../ui/Button/Button";
import { logout } from "@/http/API/usersAPI";
import { clearLocalTokens } from "@/utils/localStorage";
import { AlertContext } from "@/context/AlertContext";
import { useHoursStore } from "@/store/hoursStore";
import { useContentStore } from "@/store/contentStore";
import Image from "next/image";
import HeaderMenuModal from "../modals/HeaderMenuModal/HeaderMenuModal";

export default function Header() {
    const { t } = useTranslation(["common", "auth"]);

    const { showModal } = useContext(ModalContext);
    const { showAlert } = useContext(AlertContext);
    const { user = null, isAuth, clearUser } = useUserStore();
    const { setHours } = useHoursStore();
    const { isMobile } = useContentStore();

    const logoutHandler = () => {
        logout();
        clearUser();
        setHours([]);
        showAlert!(t("logout_message", { ns: "auth" }), "success");
        clearLocalTokens();
    };

    return (
        <div className={styles.container}>
            {!isMobile ? (
                <>
                    <p className={classNames("subheader", styles.logoText)}>
                        {t("app_title", { ns: "common" })}
                    </p>
                    <nav className={styles.nav}>
                        <p
                            onClick={() => smoothScroll("#about")}
                            className={classNames(
                                "subheader link small",
                                styles.link,
                            )}
                        >
                            {t("about")}
                        </p>
                        <p
                            onClick={() => smoothScroll("#services")}
                            className={classNames(
                                "subheader link small",
                                styles.link,
                            )}
                        >
                            {t("services")}
                        </p>
                        <p
                            onClick={() => smoothScroll("#schedule")}
                            className={classNames(
                                "subheader link small",
                                styles.link,
                            )}
                        >
                            {t("schedule")}
                        </p>
                        <p
                            onClick={() => smoothScroll("#contacts")}
                            className={classNames(
                                "subheader link small",
                                styles.link,
                            )}
                        >
                            {t("contacts_header")}
                        </p>
                    </nav>
                    {isAuth ? (
                        <div className={styles.profile}>
                            <p className={classNames("text big", styles.name)}>
                                <span>{user?.firstname[0]}</span>
                                {user?.firstname} {user?.lastname}
                            </p>
                            <p
                                className="text big link wide"
                                onClick={() => logoutHandler()}
                            >
                                {t("logout", { ns: "auth" })}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.auth}>
                            <p
                                onClick={() =>
                                    showModal!(
                                        <AuthModal initState="signup_first" />,
                                    )
                                }
                                className="subheader link light-red"
                            >
                                {t("signup", { ns: "auth" })}
                            </p>
                            <p
                                onClick={() =>
                                    showModal!(<AuthModal initState="signin" />)
                                }
                                className="subheader link light-red"
                            >
                                {t("signin", { ns: "auth" })}
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <div
                    onClick={() => showModal!(<HeaderMenuModal />, true, true)}
                    className={styles.burger}
                >
                    <Image
                        width={32}
                        height={32}
                        src="/burger.svg"
                        alt="burger"
                    />
                </div>
            )}
        </div>
    );
}
