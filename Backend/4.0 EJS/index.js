// Import the express module
import express from "express";

// Initialize the Express application
const app = express();
const port = 3000;

// Set the views directory and template engine
app.set("views", "./views"); // Specify where the EJS files are located
app.set("view engine", "ejs"); // Set EJS as the view engine

// Define the root route
app.get("/", (req, res) => {
    const today = new Date();
    const day = today.getDay();

    // Determine if it's a weekday or the weekend
    const isWeekend = day === 0 || day === 6;
    const type = isWeekend ? "the weekend" : "a weekday";
    const advice = isWeekend ? "it's time to have some fun" : "it's time to work hard";

    // Render the EJS template and pass the data
    res.render("index", {
        dayType: type, 
        advice: advice,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
