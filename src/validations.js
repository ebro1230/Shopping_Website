const passwordTest = (password) => {
  const passwordRequirements =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!^&*()\-_=+{}|?>.<,:;~`]).{8,}$/;
  return passwordRequirements.test(password);
};

const emailTest = (email) => {
  const emailRequirements = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  return emailRequirements.test(email);
};

export { passwordTest, emailTest };
