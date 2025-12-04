import { useGetYarns } from "../../api/ravelry/hooks";
import { useTranslation } from "react-i18next";

export const Yarns = () => {
  const { data, isLoading, isError, error } = useGetYarns();
  const { t } = useTranslation();

  console.log(data);

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  if (isError) {
    return <div>{t("error", { error: error?.message })}</div>;
  }
  return <div>{t("yarns.title")}</div>;
};
