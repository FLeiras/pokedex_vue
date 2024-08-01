export const capitalizeFirstLetter = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// export const capitalizeFirstLetter = (name) => {
//   if (name?.length === 0) return "";
//   return name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();
// };
