import * as dal from "./dal";

//TODO When createToken and getSafeUser are implemented, replace all usages of password in deposit/withdrawal/balance to token
export const createToken = async (user) => {
  // user.token = Math.random();
  // await dal.updateUser(db, user);
  return user;
};

/**
 * Returns a safe user data, without password
 * @param {*} user
 * @returns
 */
export const getSafeUser = (user) => {
  // TODO
  // const { password, ...safeUser } = user;
  // return safeUser;
  return user;
};

export async function findAndVerifyUser(db, email, password) {
  const user = await dal.findUser(db, email);
  if (!user || user.password !== password) {
    throw new Error("No user or wrong password");
  }
  return user;
}
