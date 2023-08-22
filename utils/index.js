export const checkImageUrl = (url) => {
  if (!url) return false;

  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|bmp|webp|svg)/g;
  return regex.test(url);
};
