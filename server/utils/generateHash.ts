import * as bcrypt from 'bcrypt';
export const handlePasswordHashing = (plainPassword: string, salt: number) => {
  let hashed = bcrypt.hashSync(plainPassword, salt);

  if (hashed.includes('/')) {
    hashed = handlePasswordHashing(plainPassword, salt);
  }

  return hashed;
};
