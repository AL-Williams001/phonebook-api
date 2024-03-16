const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://arthurlynnwilliams01:Greed01!@cluster0.leuv2xg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
  }
}

connectToDB(MONGODB_URI);

// 1. Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// 2. Model
const Person = mongoose.model("Person", personSchema);

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});

// 3 Create
// const person1 = new Person({
//   name: "Arto Hellas",
//   number: "040-123456",
// });

// person1.save();

// const person2 = new Person({
//   name: "Ada Lovelace",
//   number: "39-44-5323523",
// });

// person2.save();

// const person3 = new Person({
//   name: "Dan Abramov",
//   number: "12-43-234345",
// });

// person3.save();
