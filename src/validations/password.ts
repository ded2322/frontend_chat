export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[А-Яа-яA-Z]).{7,}$/;
  
  return passwordRegex.test(password);
};