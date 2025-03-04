import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let jokes = [
  {
    id: 1,
    jokeText: "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: "Science",
  },
  {
    id: 2,
    jokeText: "Why did the scarecrow win an award? Because he was outstanding in his field.",
    jokeType: "Puns",
  },
  {
    id: 3,
    jokeText: "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    jokeType: "Puns",
  },
  {
    id: 4,
    jokeText: "What did one ocean say to the other ocean? Nothing, they just waved.",
    jokeType: "Wordplay",
  }
];

// 1. GET a random joke
app.get("/jokes/random", (req, res) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(randomJoke);
});

// 2. GET a specific joke by ID
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const joke = jokes.find((j) => j.id === id);
  if (joke) {
    res.json(joke);
  } else {
    res.status(404).send("Joke not found.");
  }
});

// 3. GET jokes by filtering on the joke type
app.get("/jokes", (req, res) => {
  const { type } = req.query;
  if (type) {
    const filteredJokes = jokes.filter((j) => j.jokeType.toLowerCase() === type.toLowerCase());
    res.json(filteredJokes);
  } else {
    res.json(jokes);
  }
});

// 4. POST a new joke
app.post("/jokes", (req, res) => {
  const { jokeText, jokeType } = req.body;
  if (!jokeText || !jokeType) {
    return res.status(400).send("Both jokeText and jokeType are required.");
  }
  const newJoke = {
    id: jokes.length + 1,
    jokeText,
    jokeType
  };
  jokes.push(newJoke);
  res.status(201).json(newJoke);
});

// 5. PUT a joke (update by ID)
app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { jokeText, jokeType } = req.body;
  const jokeIndex = jokes.findIndex((j) => j.id === id);

  if (jokeIndex !== -1) {
    jokes[jokeIndex] = { id, jokeText, jokeType };
    res.json(jokes[jokeIndex]);
  } else {
    res.status(404).send("Joke not found.");
  }
});

// 6. PATCH a joke (partial update by ID)
app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const joke = jokes.find((j) => j.id === id);

  if (joke) {
    const { jokeText, jokeType } = req.body;
    if (jokeText) joke.jokeText = jokeText;
    if (jokeType) joke.jokeType = jokeType;
    res.json(joke);
  } else {
    res.status(404).send("Joke not found.");
  }
});

// 7. DELETE a specific joke by ID
app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const jokeIndex = jokes.findIndex((j) => j.id === id);

  if (jokeIndex !== -1) {
    jokes.splice(jokeIndex, 1);
    res.send(`Joke with ID ${id} deleted.`);
  } else {
    res.status(404).send("Joke not found.");
  }
});

// 8. DELETE all jokes
app.delete("/jokes", (req, res) => {
  jokes = [];
  res.send("All jokes have been deleted.");
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
