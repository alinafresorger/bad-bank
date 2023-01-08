import * as dal from "../../dal";
import { getSafeUser, findAndVerifyUser } from "../../lib";
import assert from "assert";

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
    assert(req.body.amount && Number.isInteger(req.body.amount) && req.body.amount > 0, "Must be a number");

    user.balance = Number(user.balance) + Number(req.body.amount);
    console.log(user);
    await dal.updateUser(db, user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error("Deposit error", e);
    res.statusMessage = e.message;
    res.status(400).send();
    // res.sendStatus(400);
  }
}
