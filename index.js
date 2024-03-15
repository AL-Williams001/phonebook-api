const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
];

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

  return maxId + 1;
}

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
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
