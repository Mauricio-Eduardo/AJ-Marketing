export const removeFormatting = (value: string) => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};

export const formatCurrency = (value: number | string): string => {
  const numberValue =
    typeof value === "string"
      ? parseFloat(value.replace(/\./g, "").replace(",", "."))
      : value;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedValue = formatter.format(numberValue);
  return formattedValue.replace("R$", "").trim();
};

export const formatToDecimal = (value: number | string): string => {
  return String(value).replace(/\./g, "").replace(",", ".");
};

export const formatPhone = (value: string) => {
  return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};

export const formatCpfCnpj = (value: string) => {
  if (value.length >= 14) {
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
};
