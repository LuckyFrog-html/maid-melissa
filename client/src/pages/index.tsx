import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import styles from "./Index.module.scss";
import classNames from "classnames";
import Benefits from "@/components/Benefits/Benefits";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Reveiws from "@/components/Reviews/Reviews";
import Filters from "@/components/Filters/Filters";
import Schedule from "@/components/Schedule/Schedule";
import Anwsers from "@/components/Anwsers/Anwsers";
import Contacts from "@/components/Contacts/Contacts";
import { getUserOrders } from "@/http/API/hoursAPI";
import { useHoursStore } from "@/store/hoursStore";
import { useUserStore } from "@/store/userStore";
import { getLocalAccessToken } from "@/utils/localStorage";
import { auth } from "@/http/API/usersAPI";
import { useContentStore } from "@/store/contentStore";

export default function Index({}: InferGetServerSidePropsType<
    typeof getServerSideProps
>) {
    const { t } = useTranslation("common");

    const { addHour } = useHoursStore();
    const { setUser, isAuth } = useUserStore();
    const { setIsMobile } = useContentStore();


    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const resize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        let timeout: NodeJS.Timeout;
        window.onresize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(resize, 150);
        };
    }, []);

    useEffect(() => {
        const authUser = async () => {
            if (getLocalAccessToken()) {
                const { user } = await auth();

                if (user.id) {
                    const userOrders = await getUserOrders();
                    userOrders.hours.forEach((i) => {
                        addHour(i);
                    });
                    setUser(user);
                }
            }
        };
        authUser();
    }, [isAuth]);

    return (
        <div>
            <Head>
                <link rel="icon" type="image/x-icon" href="favicon.ico" />
                <title>{t("app_title")}</title>
                <meta name="description" content={t("app_description")} />
            </Head>
            <div className={styles.container}>
                <h1 className={classNames("header big", styles.header)}>
                    {t("header")}
                </h1>
                <p className={classNames("text", styles.subheader)}>
                    {t("subheader")}
                </p>
                <Benefits />
                <About />
                <Services />
                <Reveiws />
                <Filters />
                <Schedule />
                <Anwsers />
                <Contacts />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "seo",
                "auth",
                "filters",
            ])),
        },
    };
};
