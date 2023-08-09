import { useState, useContext } from "react";
import styles from "./Filters.module.scss";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import {
    AllergyType,
    CleaningType,
    FrequencyType,
    useFilterStore,
} from "@/store/filterStore";
import { useHoursStore } from "@/store/hoursStore";
import { getFreeHours } from "@/http/API/hoursAPI";
import { AlertContext } from "@/context/AlertContext";

const Filters = () => {
    const { t } = useTranslation(["filters", "common", "seo", "auth"]);
    const [tempAddress, setTempAddress] = useState<string>("");

    const { setHours } = useHoursStore();
    const { showAlert } = useContext(AlertContext);

    const {
        address,
        allergy,
        frequency,
        cleaning,
        setAddress,
        setAllergy,
        setCleaning,
        setFrequency,
    } = useFilterStore();

    const handleApply = async () => {
        setAddress(tempAddress);
        const { hours, status } = await getFreeHours();
        if (status === "error") {
            showAlert!(t("unavailable", { ns: "auth" }));
            return
        }
        setHours(hours);
    };

    return (
        <div id="filter" className={styles.container}>
            <p className="header">{t("filter", { ns: "common" })}</p>
            <div className={styles.address}>
                <p className="text big">{t("address_header")}</p>
                <p className="text small">
                    (dev) Enter "test" to see free time blocks
                </p>
                <div>
                    <Input
                        borderBottom
                        icon="/searchIcon.svg"
                        value={tempAddress}
                        setValue={(val) => setTempAddress(val)}
                    />
                    <div className={styles.button}>
                        <Button onClick={() => handleApply()}>
                            {t("apply_btn", { ns: "common" })}
                        </Button>
                    </div>
                </div>
            </div>
            <p className={classNames("text big", styles.subheader)}>
                {t("filter_subheader", { ns: "seo" })}
            </p>
            <div className={styles.filtres}>
                <p
                    className={classNames(
                        "subheader medium uppercase red",
                        styles.title,
                    )}
                >
                    {t("allergy_title")}
                </p>
                <CustomSelect
                    grid
                    disabled={!address}
                    multiple
                    singleValue={"none"}
                    options={[
                        { name: t("allergy_1"), value: "none" },
                        { name: t("allergy_2"), value: "cats" },
                        { name: t("allergy_3"), value: "dogs" },
                    ]}
                    onSelect={(values: AllergyType) => setAllergy(values)}
                />
                <p
                    className={classNames(
                        "subheader medium uppercase red",
                        styles.title,
                    )}
                >
                    {t("frequency_title")}
                </p>
                <CustomSelect
                    grid
                    disabled={allergy && !allergy.length}
                    options={[
                        { name: t("frequency_1"), value: "onetime" },
                        { name: t("frequency_2"), value: "twice" },
                        { name: t("frequency_3"), value: "weekly" },
                    ]}
                    onSelect={(values: FrequencyType[]) => {
                        setCleaning([]);
                        setFrequency(values[0]);
                    }}
                />
                <p
                    className={classNames(
                        "subheader medium uppercase red",
                        styles.title,
                    )}
                >
                    {t("cleaning_title")}
                </p>
                <CustomSelect
                    grid={frequency === "onetime"}
                    disabled={!frequency}
                    multiple
                    value={cleaning}
                    options={
                        frequency === "onetime"
                            ? [
                                  {
                                      name: t("service_title_1", { ns: "seo" }),
                                      value: "regular",
                                  },
                                  {
                                      name: t("service_title_2", { ns: "seo" }),
                                      value: "window",
                                  },
                                  {
                                      name: t("service_title_3", { ns: "seo" }),
                                      value: "relocation",
                                  },
                                  {
                                      name: t("service_title_4", { ns: "seo" }),
                                      value: "repairing",
                                  },
                              ]
                            : [
                                  {
                                      name: t("service_title_1", { ns: "seo" }),
                                      value: "regular",
                                  },
                              ]
                    }
                    onSelect={(values: CleaningType) => setCleaning(values)}
                />
            </div>
        </div>
    );
};

export default Filters;
