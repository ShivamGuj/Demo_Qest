const sendTemplateMessage = require('./controllers/templateComtroller');
const sendTemplate1 = require("./templates/template1");
const sendAboutInfo = require("./controllers/aboutController");
const sendBrochure = require("./controllers/getBrochureContoller");

// Handle incoming messages
async function handleIncomingMessage(event) {
  const body = event.payload.payload ? event.payload.payload.text : null; 
  const from = event.payload.sender ? event.payload.sender.phone : null;

  if (!body) {
    console.log("No message body received.");
    return;
  }
  
  if (body.toLowerCase() === "start") {
    //Sending the template message with options
    //console.log("Sending template message with options");
    await sendTemplate1(from);
    //console.log("Template message sent");
    setTimeout(async () => {
    await sendTemplateMessage(from);
    }, 3000);
  }

  // If the user selected 'About' option
  if (body.toLowerCase() === "about") {
    await sendAboutInfo(from);
  }

  // If the user selected 'Get Brochure' option
  if (body.toLowerCase() === "get brochure") {
    await sendBrochure(from);
  }

  // Handling the "Back to Menu" option
  if (body.toLowerCase() === "back to menu") {
    await sendTemplateMessage(from); // Send the menu again
  }
}

// Webhook endpoint to receive messages (Example using Express.js)
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// When Gupshup sends incoming messages to the webhook
app.post("/webhook", (req, res) => {
  const event = req.body;
  console.log("Incoming message event: ", event);

  handleIncomingMessage(event);

  res.status(200).send("OK");// this send back a 200 status code to Gupshup API
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
