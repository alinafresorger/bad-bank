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
    // if (req.body.amount > user.balance)) throw new Error('Not enough funds');
    user.balance = Number(user.balance) - Number(req.body.amount);
    await dal.updateUser(db, user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error("Withdraw error", e);
    res.statusMessage = e.message;
    res.sendStatus(400);
  }
}
