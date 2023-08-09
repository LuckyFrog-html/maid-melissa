import { AppProps } from "next/app";
import Header from "../components/Header/Header";
import "../scss/index.scss";
import { appWithTranslation } from "next-i18next";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import ModalState from "@/context/ModalContext";
import { Outfit } from "next/font/google";
import AlertState from "@/context/AlertContext";

const outfit = Outfit({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
    const { i18n } = useTranslation();
    return (
        <AlertState>
            <ModalState>
                <div
                    dir={i18n.dir ? i18n.dir() : "ltr"}
                    className={classNames("app")}
                >
                    <style jsx global>{`
                        html {
                            font-family: ${outfit.style.fontFamily};
                        }
                    `}</style>
                    <Header />
                    <main>
                        <Component {...pageProps} />
                    </main>
                </div>
            </ModalState>
        </AlertState>
    );
}

export default appWithTranslation(MyApp);
