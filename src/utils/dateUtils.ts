
export const formatDateToGerman = (date: Date): string => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
};

export const isValidGermanDate = (dateStr: string): boolean => {
  const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  if (!regex.test(dateStr)) return false;
  const match = dateStr.match(regex);
  if (!match) return false;
  const [_, d, m, y] = match;
  const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
  return date.getDate() === parseInt(d) && date.getMonth() === parseInt(m) - 1 && date.getFullYear() === parseInt(y);
};

export const parseGermanDate = (dateStr: string): Date => {
  const [d, m, y] = dateStr.split('.').map(Number);
  return new Date(y, m - 1, d);
};
