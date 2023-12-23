const passwordTest = (password) => {
  const passwordRequirements =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!^&*()\-_=+{}|?>.<,:;~`]).{8,}$/;
  return passwordRequirements.test(password);
};

const emailTest = (email) => {
  const emailRequirements =
    /^(?!.*[A-Z0-9.%+-]+@[A-Z0-9.-]+.[A-Z]{2,})([a-z0-9.%+-]+@[a-z0-9.-]+.[a-z]{2,})$/;
  return emailRequirements.test(email);
};

export { passwordTest, emailTest };
