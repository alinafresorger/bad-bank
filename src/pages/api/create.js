import * as dal from "../../dal";
import { getSafeUser } from "../../lib";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const db = await dal.getDb();

    const existingUser = await dal.findUser(db, req.body.email);
    if (existingUser) throw new Error("User already exists");

    const user = await dal.create(db, req.body.name, req.body.email, req.body.password);
    console.log(user);
    res.json(getSafeUser(user)); // was send
  } catch (e) {
    console.error("Create error", e);
    res.statusMessage = e.message;
    res.sendStatus(400);
  }
  //   res.status(200).json({ message: "Hello from Next.js!" });
}
