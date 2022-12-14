const { resolve } = require("path");

const MongoClient = require("mongodb").MongoClient;

const { MONGODB_URI, DATABASE_NAME } = process.env;

const url = MONGODB_URI; // || `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;

console.log("Mongo URL", url);

// let db = null;
//
// //connect to mongo
// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//   console.log("Connected to db!");

//   //connect ot myproject database
//   db = client.db("myproject");
// });

export function connect() {
  return new Promise((resolve, reject) => {
    //connect to mongo
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        reject(err);
        return;
      }

      console.log("Connected to db!");

      //connect ot myproject database
      resolve(client.db(DATABASE_NAME));
    });
  });
}

// create user account
export function create(db, name, email, password) {
  // TODO Await DB here
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
    //TODO Add audit entry
  });
}

export async function findUser(db, email) {
  // TODO Await DB here
  return db.collection("users").findOne({ email });
}

export async function updateUser(db, user) {
  // TODO Await DB here
  const { _id, ...rest } = user;
  if (!_id) throw new Error("no user id");
  return db.collection("users").updateOne({ _id }, { $set: rest });
}

// all users
export function all(db) {
  // TODO Await DB here
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }

        // //clean up
        // client.close();
      });
  });
}

// module.exports = { create, all, findUser, updateUser, connect };
const dbPromise = connect();

export async function getDb() {
  return dbPromise;
}
