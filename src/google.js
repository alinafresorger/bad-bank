const { OAuth2Client } = require("google-auth-library");
const dal = require("./dal.js");

const { GOOGLE_SECRET, NEXT_PUBLIC_GOOGLE_CLIENT_ID } = process.env;

const oAuth2Client = new OAuth2Client(
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_SECRET
  // "http://localhost:3000"
);

const checkGoogleToken = async (idToken) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken,
    audience: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  });

  const data = await ticket.getPayload();

  if (!data.email_verified) throw new Error("Not verified");
  if (data.iss !== "https://accounts.google.com") throw new Error("Issued not by Google");
  if (data.aud !== NEXT_PUBLIC_GOOGLE_CLIENT_ID) throw new Error("Wrong audience");

  // {
  //   iss: 'https://accounts.google.com',
  //   nbf: 1672892180,
  //   aud: '152320973930-k4cuiof24ni58fofkc8be760v9q73hjl.apps.googleusercontent.com',
  //   sub: '116044430429923515404',
  //   email: 'alinafresorger@gmail.com',
  //   email_verified: true,
  //   azp: '152320973930-k4cuiof24ni58fofkc8be760v9q73hjl.apps.googleusercontent.com',
  //   name: 'Alina Fresorger',
  //   picture: 'https://lh3.googleusercontent.com/a/AEdFTp5nYYdvdOUjvpD_XtEDSqBS_8L2nNMKWJLyaIBomw=s96-c',
  //   given_name: 'Alina',
  //   family_name: 'Fresorger',
  //   iat: 1672892480,
  //   exp: 1672896080,
  //   jti: '1a7e5dcdc0c12163de47c472c43535f9e9074436'
  // }

  return data;
};

export const createOrReturnUser = async (db, idToken) => {
  const userData = await checkGoogleToken(idToken);
  let user = await dal.findUser(db, userData.email);
  if (!user) {
    user = await dal.create(db, userData.name, userData.email, "GOOGLE" + Math.random());
  }
  return user;
};
