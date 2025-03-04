import superheroes from "superheroes";

// Use the `superheroes` module directly
const superheroNames = superheroes || []; // Fallback in case the module is undefined

if (Array.isArray(superheroNames) && superheroNames.length > 0) {
  const randomIndex = Math.floor(Math.random() * superheroNames.length);
  const name = superheroNames[randomIndex];
  console.log(`I am ${name}!`);
} else {
  console.log("No superhero names available.");
}

