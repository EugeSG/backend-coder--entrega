import bcrypt from "bcrypt";
import passport from "passport";

export async function createHash(password) {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  return hashPassword;
}

export async function comparePassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}



