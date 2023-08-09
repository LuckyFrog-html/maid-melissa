import { useState, FC, useContext } from "react";
import classNames from "classnames";
import styles from "./AuthModal.module.scss";
import { AuthModalStates } from "@/types";
import { useTranslation } from "next-i18next";
import { ModalContext } from "@/context/ModalContext";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import { useAuthStore } from "@/store/authStore";
import Timer from "../../ui/Timer/Timer";
import Image from "next/image";
import { emailCorrect, passCorrect } from "@/utils/validation";
import { signIn, signUp, updatePass, verifyCode } from "@/http/API/usersAPI";
import { AlertContext } from "@/context/AlertContext";
import { Oval } from "react-loader-spinner";
import { useUserStore } from "@/store/userStore";
import {
    updateLocalAccessToken,
    updateLocalRefreshToken,
} from "@/utils/localStorage";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type AuthModalProps = {
    initState: AuthModalStates;
};

const AuthModal: FC<AuthModalProps> = ({ initState }) => {
    const [modalState, setModalState] = useState<AuthModalStates>(initState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const store = useAuthStore();
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

    const { t } = useTranslation("auth");
    const { closeModal } = useContext(ModalContext);
    const { showAlert } = useContext(AlertContext);
    const { setUser } = useUserStore();

    const Back: FC<{ to: AuthModalStates }> = ({ to }) => {
        return (
            <div onClick={() => setModalState(to)} className={styles.back}>
                <Image
                    width={44}
                    height={44}
                    src="/arrowBack.svg"
                    alt="arrow"
                />
            </div>
        );
    };

    const loginHandle = async () => {
        setIsLoading(true);
        const res = await signIn({
            login: store.login,
            password: store.pass,
        });
        setIsLoading(false);
        if (res.status !== "success") {
            showAlert!(t("invalid_login"));
            return;
        }
        updateLocalAccessToken(res.tokens?.accessToken!);
        updateLocalRefreshToken(res.tokens?.refreshToken!);
        setUser({ ...res.resUser!, orders: [] });
        showAlert!(t("logged_in"), "success");
        store.clearStore();
        closeModal!();
    };

    const renderContent = () => {
        switch (modalState) {
            case "init":
                return (
                    <div className={styles.wrapper}>
                        <p className={classNames("text big wide", styles.title)}>
                            {t("auth_req_modal_title")}
                        </p>
                        <div className={styles.buttons}>
                            <Button
                                onClick={() => setModalState("signup_first")}
                                noShadow
                                dark
                            >
                                {t("signup")}
                            </Button>
                            <Button
                                onClick={() => setModalState("signin")}
                                noShadow
                            >
                                {t("signin")}
                            </Button>
                        </div>
                        <div className={styles.icons}>
                            <Image
                                width={44}
                                height={44}
                                src="facebook.svg"
                                alt="facebook"
                            />
                            <Image
                                width={44}
                                height={44}
                                src="google.svg"
                                alt="google"
                            />
                        </div>
                    </div>
                );
            case "signup_first":
                return (
                    <div className={styles.wrapper}>
                        <Back to="init" />
                        <div className={styles.inputs}>
                            <Input
                                placeholder={t("firstname")}
                                value={store.firstname}
                                setValue={(val) => store.setFirstname(val)}
                            />
                            <Input
                                placeholder={t("lastname")}
                                value={store.lastname}
                                setValue={(val) => store.setLastname(val)}
                            />
                            <Input
                                placeholder={t("date_of_birth")}
                                value={store.dateOfBirth}
                                setValue={(val) => {
                                    console.log(val);
                                    store.setDateOfBirth(val);
                                }}
                                type="date"
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={
                                    store.firstname === "" ||
                                    store.lastname === "" ||
                                    store.dateOfBirth === ""
                                }
                                onClick={() => setModalState("signup_second")}
                                dark
                                noShadow
                            >
                                {t("next_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "signup_second":
                return (
                    <div className={styles.wrapper}>
                        <Back to="signup_first" />
                        <p className="text big wide">{t("verification")}</p>
                        <p className={classNames("text", styles.verification)}>
                            {t("verification_text")}
                        </p>
                        <div className={styles.inputs}>
                            <Input
                                placeholder={t("email")}
                                value={store.email}
                                setValue={(val) => store.setEmail(val)}
                                wrong={!emailCorrect(store.email)}
                            />
                            <PhoneInput
                                placeholder={t("mobile_phone")}
                                smartCaret
                                international
                                defaultCountry="US"
                                value={store.phone}
                                onChange={(val) => store.setPhone(String(val))}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={
                                    !emailCorrect(store.email) ||
                                    store.phone.length <= 8
                                }
                                onClick={async () => {
                                    setIsLoading(true);
                                    const res = await signUp({
                                        date_of_birth: new Date(
                                            `${store.dateOfBirth} UTC`,
                                        ),
                                        email: store.email,
                                        firstname: store.firstname,
                                        lastname: store.lastname,
                                        phone: store.phone,
                                    });
                                    setIsLoading(false);
                                    if (res.status === "already") {
                                        showAlert!(t("already"));
                                        return;
                                    }
                                    showAlert!(
                                        t("email_sent") + store.email,
                                        "success",
                                    );
                                    setModalState("ver_code");
                                }}
                                dark
                                noShadow
                            >
                                {t("send_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "ver_code":
                return (
                    <div className={styles.wrapper}>
                        {isTimeUp && <Back to="signup_second" />}
                        <p className="text big wide">{t("verification")}</p>
                        <div className={styles.inputs}>
                            <Input
                                readonly
                                placeholder={t("email")}
                                value={store.email}
                                setValue={(val) => store.setEmail(val)}
                            />
                            <Input
                                placeholder={t("verification_code")}
                                value={store.verification}
                                setValue={(val) => store.setVerification(val)}
                            />
                        </div>
                        <div
                            onLoad={() => setIsTimeUp(false)}
                            className={classNames("text", styles.timer)}
                        >
                            {!isTimeUp ? (
                                <>
                                    <span className="text big uppercase">
                                        {t("code_exp_time")}
                                    </span>
                                    {t("exp_time")}

                                    <Timer
                                        onTimeUp={() => setIsTimeUp(true)}
                                        time={60}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="text big uppercase red">
                                        {t("code_exp_time")}
                                    </span>
                                    <span className="text red">
                                        {t("has_expired")}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={isTimeUp || store.verification === ""}
                                onClick={async () => {
                                    setIsLoading(true);
                                    const res = await verifyCode({
                                        code: store.verification,
                                        email: store.email,
                                    });
                                    setIsLoading(false);

                                    if (res.status !== "success") {
                                        showAlert!(t("code_incorrcet"));
                                        return;
                                    }
                                    showAlert!(t("code_correct"), "success");
                                    setModalState("pass");
                                }}
                                dark
                                noShadow
                            >
                                {t("send_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "ver_code_forgot":
                return (
                    <div className={styles.wrapper}>
                        {isTimeUp && <Back to="forgot" />}
                        <p className="text big wide">{t("verification")}</p>
                        <div className={styles.inputs}>
                            <Input
                                readonly
                                placeholder={t("email")}
                                value={store.email}
                                setValue={(val) => store.setEmail(val)}
                            />
                            <Input
                                placeholder={t("verification_code")}
                                value={store.verification}
                                setValue={(val) => store.setVerification(val)}
                            />
                        </div>
                        <div
                            onLoad={() => setIsTimeUp(false)}
                            className={classNames("text", styles.timer)}
                        >
                            {!isTimeUp ? (
                                <>
                                    <span className="text big uppercase">
                                        {t("code_exp_time")}
                                    </span>
                                    {t("exp_time")}

                                    <Timer
                                        onTimeUp={() => setIsTimeUp(true)}
                                        time={60}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className="text big uppercase red">
                                        {t("code_exp_time")}
                                    </span>
                                    <span className="text red">
                                        {t("has_expired")}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={isTimeUp || store.verification === ""}
                                onClick={async () => {
                                    setIsLoading(true);
                                    const res = await verifyCode({
                                        code: store.verification,
                                        email: store.email,
                                    });
                                    setIsLoading(false);
                                    if (res.status !== "success") {
                                        showAlert!(t("code_incorrcet"));
                                        return;
                                    }
                                    showAlert!(t("code_correct"), "success");
                                    setModalState("new_pass");
                                }}
                                dark
                                noShadow
                            >
                                {t("send_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "pass":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.inputs}>
                            <Input
                                placeholder={t("pass")}
                                value={store.pass}
                                setValue={(val) => store.setPass(val)}
                                type="password"
                                wrong={!passCorrect(store.pass)}
                            />
                            <p className="text small">{t("pass_info")}</p>
                            <Input
                                placeholder={t("repeat_pass")}
                                value={store.newPass}
                                setValue={(val) => store.setNewPass(val)}
                                type="password"
                                wrong={store.newPass !== store.pass}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={
                                    store.pass !== store.newPass ||
                                    !passCorrect(store.pass)
                                }
                                onClick={() => {
                                    setIsLoading(true);
                                    const res = updatePass({
                                        email: store.email,
                                        password: store.pass,
                                    });
                                    setIsLoading(false);
                                    setModalState("registered");
                                }}
                                dark
                                noShadow
                            >
                                {t("done_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "registered":
                return (
                    <div className={styles.wrapper}>
                        <p
                            className={classNames(
                                "text big wide",
                                styles.registered,
                            )}
                        >
                            {t("registered")}
                            <Image
                                src="/key.svg"
                                width={32}
                                height={32}
                                alt="key"
                            />
                        </p>
                        <Button
                            onClick={() => {
                                store.clearStore();
                                setModalState("signin");
                            }}
                            dark
                            noShadow
                        >
                            {t("done_btn", { ns: "common" })}
                        </Button>
                    </div>
                );
            case "signin":
                return (
                    <div className={styles.wrapper}>
                        <Back to="init" />
                        <div className={styles.inputs}>
                            <Input
                                placeholder={t("email_or_phone")}
                                value={store.login}
                                setValue={(val) => store.setLogin(val)}
                                type="text"
                                wrong={store.login.length <= 3}
                            />
                            <Input
                                placeholder={t("pass")}
                                value={store.pass}
                                setValue={(val) => store.setPass(val)}
                                type="password"
                                wrong={!passCorrect(store.pass)}
                            />
                        </div>
                        <p
                            onClick={() => setModalState("forgot")}
                            className={classNames(
                                "text small link",
                                styles.forgot,
                            )}
                        >
                            {t("forgot_password_question")}
                        </p>
                        <div className={styles.button}>
                            <Button
                                disabled={
                                    !passCorrect(store.pass) ||
                                    store.login.length <= 3
                                }
                                onClick={() => loginHandle()}
                                dark
                                noShadow
                            >
                                {t("signin")}
                            </Button>
                        </div>
                    </div>
                );
            case "forgot":
                return (
                    <div className={styles.wrapper}>
                        <Back to="signin" />
                        <p className="text big wide">{t("forgot_password")}</p>
                        <div className={styles.input}>
                            <Input
                                placeholder={t("enter_email")}
                                value={store.email}
                                setValue={(val) => store.setEmail(val)}
                                wrong={!emailCorrect(store.email)}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={!emailCorrect(store.email)}
                                onClick={async () => {
                                    // Check is user exist
                                    setIsLoading(true);
                                    const res = await verifyCode({
                                        code: "",
                                        email: store.email,
                                    });
                                    setIsLoading(false);
                                    if (res.status === "not found") {
                                        showAlert!(t("not_found"));
                                        return;
                                    }
                                    showAlert!(t("code_correct"), "success");
                                    setModalState("ver_code_forgot");
                                }}
                                dark
                                noShadow
                            >
                                {t("send_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "new_pass":
                return (
                    <div className={styles.wrapper}>
                        <div className={styles.inputs}>
                            <Input
                                placeholder={t("pass")}
                                value={store.pass}
                                setValue={(val) => store.setPass(val)}
                                type="password"
                                wrong={!passCorrect(store.pass)}
                            />
                            <p className="text small">{t("pass_info")}</p>
                            <Input
                                placeholder={t("repeat_pass")}
                                value={store.newPass}
                                setValue={(val) => store.setNewPass(val)}
                                type="password"
                                wrong={store.newPass !== store.pass}
                            />
                        </div>
                        <div className={styles.button}>
                            <Button
                                disabled={
                                    store.pass !== store.newPass ||
                                    !passCorrect(store.pass)
                                }
                                onClick={() => {
                                    setIsLoading(true);
                                    const res = updatePass({
                                        email: store.email,
                                        password: store.pass,
                                    });
                                    setIsLoading(false);
                                    setModalState("pass_changed");
                                }}
                                dark
                                noShadow
                            >
                                {t("done_btn", { ns: "common" })}
                            </Button>
                        </div>
                    </div>
                );
            case "pass_changed":
                return (
                    <div className={styles.wrapper}>
                        <p
                            className={classNames(
                                "text big wide",
                                styles.registered,
                            )}
                        >
                            {t("password_changed")}
                            <Image
                                src="/key.svg"
                                width={32}
                                height={32}
                                alt="key"
                            />
                        </p>
                        <Button
                            onClick={() => {
                                store.clearStore();
                                setModalState("signin");
                            }}
                            dark
                            noShadow
                        >
                            {t("done_btn", { ns: "common" })}
                        </Button>
                    </div>
                );
            default:
                return <div></div>;
        }
    };

    return (
        <div
            className={classNames(styles.container, {
                [styles.loading]: isLoading,
            })}
        >
            <div
                onClick={() => {
                    closeModal && closeModal();
                    store.clearStore();
                }}
                className={styles.cross}
            >
                <Image width={64} height={64} src="/cross.svg" alt="cross" />
            </div>
            {isLoading && (
                <Oval
                    width={100}
                    height={100}
                    secondaryColor="rgb(124, 137, 173)"
                    color="rgb(62, 79, 125)"
                    wrapperClass={styles.oval}
                />
            )}
            {renderContent()}
        </div>
    );
};

export default AuthModal;
