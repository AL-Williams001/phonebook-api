const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI =
  "mongodb+srv://arthurlynnwilliams01:Greed01!@cluster0.leuv2xg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

async function connectToDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`);
  }
}

connectToDB(MONGODB_URI);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

  return maxId + 1;
}

app.get("/api/persons", (_req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons);
  });
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons = persons.concat(person);
  res.status(201).json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server is running`));
