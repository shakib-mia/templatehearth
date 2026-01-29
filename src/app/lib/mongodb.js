import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hdemiyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // mongodb+srv://user:pass@cluster/.../?retryWrites=true&w=majority
if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

const options = {
  maxPoolSize: 10,
  wtimeoutMS: 2500,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
const clientCollection = await clientPromise;

export const db = clientCollection.db("templatehearth");
export const blogsCollection = db.collection("blogs");
export const servicesCollection = db.collection("services");
export const templatesCollection = db.collection("templates");
export const templateContentsCollection = db.collection("template-contents");

export default clientPromise;
