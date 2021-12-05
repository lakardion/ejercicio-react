export const formatCurrency = (formatConfig) => (num) => {
  const numString = Math.trunc(num).toString();
  const lastIndex = numString.length - 1;
  let result = "";
  if (lastIndex > 2) {
    for (let i = lastIndex; i >= 0; i--) {
      if (lastIndex - i === 0 || (lastIndex - i) % 3 !== 0)
        result = numString[i] + result;
      else result = numString[i] + formatConfig.thousands + result;
    }
  } else result = `${numString}`;

  if (formatConfig.decimals) {
    const decimals = getDecimals(num, formatConfig?.amountOfDecimals);
    return `$ ${result}${formatConfig.decimals}${decimals}`;
  }
  return `$ ${result}`;
};

export const getDecimals = (n, limitDecimals = 1) => {
  const decimalPart = n - Math.trunc(n);
  const decimalAsInteger = Math.trunc(
    decimalPart * Math.pow(10, limitDecimals)
  );
  if (decimalAsInteger === 0) return "00";
  return decimalAsInteger.toString().padStart(limitDecimals, "0");
};
