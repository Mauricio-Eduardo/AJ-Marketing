import * as React from "react";

export const maskMoney = (event: React.FormEvent<HTMLInputElement>) => {
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
};

export const maskCPF = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;

  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskPhone = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 15;
  const { value } = event.currentTarget;
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");
};

export const maskCEP = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 9;
  const { value } = event.currentTarget;
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};


export const maskPercentage = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.maxLength = 6;
  const { value } = event.currentTarget;

  // Remove qualquer caractere que não seja número ou vírgula
  let newValue = value.replace(/[^0-9,]/g, "");

  // Permite apenas uma vírgula
  if (newValue.includes(',')) {
    const parts = newValue.split(',');
    newValue = parts[0] + ',' + parts[1].slice(0, 2);
  }

  // Limita a 2 casas decimais
  newValue = newValue.replace(/^(\d+)(,\d{0,2})?.*$/, "$1$2");

  // Verifica se o valor é maior que 100 e ajusta conforme necessário
  // Verifica se o valor é maior que 100 e ajusta conforme necessário
  let numericValue = parseFloat(newValue.replace(',', '.'));
  if (numericValue > 100) {
    let intValue = Math.floor(numericValue / 10);
    newValue = intValue.toString() + ',' + (numericValue % 10).toFixed(0);
  }

  return newValue;
};

export type MaskTypes = "cpf" | "money" | "phone" | "cep" | "percentage";

type Masks = Record<
  MaskTypes,
  (event: React.FormEvent<HTMLInputElement>) => string
>;

const masks: Masks = {
  cpf: maskCPF,
  money: maskMoney,
  phone: maskPhone,
  cep: maskCEP,
  percentage: maskPercentage,
};

export default masks;
