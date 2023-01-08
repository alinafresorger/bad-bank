import * as dal from "../../dal";
import { getSafeUser, createToken } from "../../lib";
import { createOrReturnUser } from "../../google";
import assert from "assert";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  //TODO Get user info from google
  // 1. Find Google library for nodejs
  // 2. Use it to load user info via token
  // else create user
  // const auth = new GoogleAuth({
  //   scopes: "https://www.googleapis.com/auth/cloud-platform",
  // });
  // const client = await auth.getClient();
  // const projectId = await auth.getProjectId();
  // const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  // const response = await client.request({ url });
  // console.log(response.data);
  try {
    const db = await dal.getDb();
    assert(req.body.token, "No token");
    const user = await createOrReturnUser(db, req.body.token);
    console.log("Logged in user", user);
    await createToken(user);
    res.json(getSafeUser(user));
  } catch (e) {
    console.error(e);
    res.statusMessage = e.message;
    res.status(400).send();
  }
}
