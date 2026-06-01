
export const mmolToMg = (mmol: string | number): string => {
  const val = typeof mmol === 'string' ? parseFloat(mmol.replace(',', '.')) : mmol;
  if (isNaN(val)) return '';
  return Math.round(val * 18.0182).toString();
};

export const mgToMmol = (mg: string | number): string => {
  const val = typeof mg === 'string' ? parseFloat(mg.replace(',', '.')) : mg;
  if (isNaN(val)) return '';
  return (val / 18.0182).toFixed(1).replace('.', ',');
};
