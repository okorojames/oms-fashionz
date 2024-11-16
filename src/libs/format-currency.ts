export const FormatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  })
    .format(value)
    .replace("NGN", "₦");
};
