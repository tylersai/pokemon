export const formatMoney = (money: number | string): string => {
  return (typeof money === "string" ? Number(money) : money).toLocaleString("us", {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
