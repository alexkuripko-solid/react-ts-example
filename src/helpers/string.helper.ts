export const formatCardNumber = (string: string) => {
  return string
    .replace(/\D/g, '')
    .trim()
    .slice(0, 16);
};

export const formatCardExpiry = (string: string) => {
  return string
    .replace(/\D/g, '')
    .replace(/(\d{2})/g, string.length > 2 ? '$1/' : '$1')
    .trim()
    .slice(0, 5);
};

export const formatCardCvv = (string: string) => {
  return string.replace(/\D/g, '').trim().slice(0, 3);
};

