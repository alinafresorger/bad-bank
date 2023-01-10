import * as dal from "../../dal";
import { getSafeUser, createToken, findAndVerifyUser } from "../../lib";
import assert from "assert";

/**
 * /**
 * @openapi
 * /api/login:
 *   post:
 *     description: Log in by email and password
 *     consumes:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  console.log(req.body);

  try {
    const db = await dal.getDb();
    assert(req.body.email, "No email");
    assert(req.body.password, "No password");
    const user = await findAndVerifyUser(db, req.body.email, req.body.password);
    console.log("Logged in user", user);
    await createToken(user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error("Login error", e);
    res.statusMessage = e.message;
    res.status(400).send();
  }
}
