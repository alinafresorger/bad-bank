import * as dal from "../../dal";
import { getSafeUser, findAndVerifyUser } from "../../lib";
import assert from "assert";

//TODO TODO Normally an access token should be provided instead of email and password
/**
 * /**
 * @openapi
 * /api/withdraw:
 *   post:
 *     description: Withdraws money
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
 *               amount:
 *                 type: integer
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
  try {
    const db = await dal.getDb();

    const user = await findAndVerifyUser(db, req.body.email, req.body.password);
    console.log("Logged in user", user);
    // if (!isNumber(req.body.amount)) throw new Error('Not a number');
    // if (req.body.amount > user.balance)) throw new Error('Not enough funds');

    assert(req.body.amount && Number.isInteger(req.body.amount) && req.body.amount > 0, "Must be a number");
    assert(user.balance >= req.body.amount, "Not enough funds");

    user.balance = Number(user.balance) - Number(req.body.amount);
    await dal.updateUser(db, user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error("Withdraw error", e);
    res.statusMessage = e.message;
    res.status(400).send();
  }
}
