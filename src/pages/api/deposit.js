import * as dal from "../../dal";
import { getSafeUser, findAndVerifyUser } from "../../lib";

/**
 * TODO Normally an access token should be provided instead of email and password
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const db = await dal.getDb();

    const user = await findAndVerifyUser(db, req.body.email, req.body.password);
    console.log("Logged in user", user);

    // if (!isNumber(req.body.amount)) throw new Error('Not a number');
    user.balance = Number(user.balance) + Number(req.body.amount);
    console.log(user);
    await dal.updateUser(db, user);
    res.send(getSafeUser(user));
  } catch (e) {
    console.error("Deposit error", e);
    res.statusMessage = e.message;
    res.sendStatus(400);
  }
}
