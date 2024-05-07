export const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Zа-яА-Я0-9_-]{3,10}$/;
  
  return usernameRegex.test(username);
};