import * as dal from "../../dal";
import { getSafeUser } from "../../lib";
import assert from "assert";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  try {
    const db = await dal.getDb();

    assert(req.body.name, "No name");
    assert(req.body.email, "No email");
    assert(req.body.password, "No password");
    assert(req.body.password.length >= 8, "Short password");

    const existingUser = await dal.findUser(db, req.body.email);
    if (existingUser) throw new Error("User already exists");

    const user = await dal.create(db, req.body.name, req.body.email, req.body.password);
    console.log(user);
    res.json(getSafeUser(user)); // was send
  } catch (e) {
    console.error("Create error", e);
    res.statusMessage = e.message;
    res.status(400).send();
  }
  //   res.status(200).json({ message: "Hello from Next.js!" });
}
