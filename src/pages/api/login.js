import * as dal from "../../dal";
import { getSafeUser, createToken, findAndVerifyUser } from "../../lib";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  console.log(req.body);

  try {
    const db = await dal.getDb();
    const user = await findAndVerifyUser(db, req.body.email, req.body.password);
    console.log("Logged in user", user);
    await createToken(user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error("Login error", e);
    res.statusMessage = e.message;
    res.sendStatus(400);
  }
}
