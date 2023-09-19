export const uid = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }
  return result;
};
