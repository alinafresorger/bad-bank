const express = require("express");
const app = express();
const cors = require("cors");
const dal = require("./dal.js");
const { createOrReturnUser } = require("./google");

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// const dbPromise = dal.connect();


//create user account
// app.get("/account/create/:name/:email/:password", async function (req, res) {
//   try {
//     const db = await dbPromise;

//     const existingUser = await dal.findUser(db, req.params.email);
//     if (existingUser) throw new Error("User already exists");

//     const user = await dal.create(db, req.params.name, req.params.email, req.params.password);
//     console.log(user);
//     res.send(user);
//   } catch (e) {
//     console.error("Login error", e);
//     res.statusMessage = e.message;
//     res.statusCode = 400;
//     res.send();
//   }
// });

// app.get("/account/login/:email/:password", async function (req, res) {
//   // else create user
//   const db = await dbPromise;
//   try {
//     const user = await findAndVerifyUser(db, req.params.email, req.params.password);
//     console.log("Logged in user", user);
//     await createToken(user);
//     res.send(getSafeUser(user));
//   } catch (e) {
//     console.error("Login error", e);
//     res.statusMessage = e.message;
//     res.statusCode = 400;
//     res.send();
//   }
// });

// app.get("/account/googleLogin/:token", async function (req, res) {
//   //TODO Get user info from google
//   // 1. Find Google library for nodejs
//   // 2. Use it to load user info via token
//   // else create user
//   // const auth = new GoogleAuth({
//   //   scopes: "https://www.googleapis.com/auth/cloud-platform",
//   // });
//   // const client = await auth.getClient();
//   // const projectId = await auth.getProjectId();
//   // const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//   // const response = await client.request({ url });
//   // console.log(response.data);
//   try {
//     const db = await dbPromise;
//     const user = await createOrReturnUser(db, req.params.token);
//     console.log("Logged in user", user);
//     await createToken(user);
//     res.send(getSafeUser(user));
//   } catch (e) {
//     console.error(e);
//     res.statusMessage = e.message;
//     res.statusCode = 400;
//     res.send();
//   }
// });

// //TODO Normally an access token should be provided instead of email and password
// //TODO :email/:password -> :token
// app.get("/account/deposit/:email/:password/:amount", async function (req, res) {
//   try {
//     const db = await dbPromise;

//     const user = await findAndVerifyUser(db, req.params.email, req.params.password);
//     console.log("Logged in user", user);

//     // if (!isNumber(req.params.amount)) throw new Error('Not a number');
//     user.balance = Number(user.balance) + Number(req.params.amount);
//     console.log(user);
//     await dal.updateUser(db, user);
//     res.send(getSafeUser(user));
//   } catch (e) {
//     console.error("Deposit error", e);
//     res.statusMessage = e.message;
//     res.sendStatus(400);
//   }
// });

//TODO Normally an access token should be provided instead of email and password
//TODO :email/:password -> :token
app.get("/account/withdraw/:email/:password/:amount", async function (req, res) {
  try {
    const db = await dbPromise;

    const user = await findAndVerifyUser(db, req.params.email, req.params.password);
    console.log("Logged in user", user);
    // if (!isNumber(req.params.amount)) throw new Error('Not a number');
    // if (req.params.amount > user.balance)) throw new Error('Not enough funds');
    user.balance = Number(user.balance) - Number(req.params.amount);
    await dal.updateUser(db, user);
    res.send(getSafeUser(user));
  } catch (e) {
    console.error("Withdraw error", e);
    res.statusMessage = e.message;
    res.sendStatus(400);
  }
});

// all accounts #1
// app.get("/account/all", async function (req, res) {
//   const db = await dbPromise;
//   dal.all(db).then((docs) => {
//     console.log(docs);
//     res.send(docs);
//   });
// });

//create user account #1
// app.get('/account/create/:name/:email/:password', function (req, res) {
//     res.send({
//         name: req.params.name,
//         email: req.params.email,
//         password: req.params.password
//     });
// });

// // all accounts #1
// app.get("/account/all", function (req, res) {
//   res.send({
//     name: "karl",
//     email: "karl@gmail.com",
//     password: 123,
//   });
// });

// staet the listener




// var port = 3000;
// app.listen(port);
// console.log("Running on port:" + port);
