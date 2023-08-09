import { useContext } from "react";
import styles from "./Schedule.module.scss";
import classNames from "classnames";
import ShceduleTable from "./ShceduleTable/ShceduleTable";
import Button from "../ui/Button/Button";
import { ModalContext } from "@/context/ModalContext";
import { useTranslation } from "next-i18next";
import AuthModal from "../modals/AuthModal/AuthModal";
import { useUserStore } from "@/store/userStore";
import { orderHour } from "@/http/API/hoursAPI";
import { useFilterStore } from "@/store/filterStore";
import { AlertContext } from "@/context/AlertContext";

const Schedule = () => {
    const { showModal } = useContext(ModalContext);
    const { showAlert } = useContext(AlertContext);

    const { t } = useTranslation("common");
    const { isAuth, userOrders, user } = useUserStore();

    const handlerOrder = () => {
        for (const item of userOrders) {
            orderHour({
                address: item.address,
                allergy: item.allergy,
                cleaning: item.cleaning,
                frequency: item.frequency,
                dateStr: item.dateStr,
                hourId: item.hourId,
                userId: user?.id!,
            });
        }
        showAlert!(t("order_accepted"), "success");
    };

    return (
        <div id="schedule" className={styles.container}>
            <p className={classNames("header", styles.header)}>
                {t("schedule")}
            </p>
            <ShceduleTable />
            <div className={styles.button}>
                <Button
                    disabled={!userOrders.length}
                    onClick={() =>
                        isAuth
                            ? handlerOrder()
                            : showModal!(<AuthModal initState="init" />)
                    }
                >
                    Order
                </Button>
            </div>
        </div>
    );
};

export default Schedule;
