const Gupshup = require('gupshup-whatsapp-api');

// Initialize Gupshup client with your API key
let client = new Gupshup({
  apiKey: '7bxo0pdrzc4cfdnwkq8owvtj8ycqzlkj' // Replace with your actual API key
});

// Handle incoming messages
async function handleIncomingMessage(event) { 

    const body = event.payload.payload.text; // Message text is in event.payload.payload.text
    const from = event.payload.sender ? event.payload.sender.phone : null; // Sender's phone is under payload.sender
    
  if (!body) {
    console.log("No message body received.");
    return;
  }

  // Check if the user sent "start"
  if (body.toLowerCase() === 'start') {
    // Send the template message with options
    await sendTemplateMessage(from);
  }

  // Check if the user selected 'About' option
  if (body.toLowerCase() === 'about') {
    await sendAboutInfo(from);
  }

  // Check if the user selected 'Get Brochure' option
  if (body.toLowerCase() === 'get brochure') {
    await sendBrochure(from);
  }

  // Handle the "Back to Menu" option
  if (body.toLowerCase() === 'back to menu') {
    await sendTemplateMessage(from); // Send the menu again
  }
}

// Function to send Template Message with options (About, Get Brochure)
async function sendTemplateMessage(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864", // Replace with your business WhatsApp number
      destination: to,
      'src.name': "DemoQest", // Replace with your application name
      message: {
        isHSM: "true", // Indicates it's a template message
        type: "text",
        text: "Welcome! Please choose an option:\n1. About\n2. Get Brochure",
        interactive: {
          type: "button",
          header: {
            type: "text",
            text: "Welcome to Qest"
          },
          body: {
            text: "Choose an option below."
          },
          footer: {
            text: "Click a button to proceed."
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: "about",
                  title: "About"
                }
              },
              {
                type: "reply",
                reply: {
                  id: "get_brochure",
                  title: "Get Brochure"
                }
              }
            ]
          }
        },
        template: {
            id: "c4e59ded-3c4b-47a2-9e10-1cc7c83a87e3", // Pre-approved template ID
            params: [
              "Qest", "Qest", "Qest"
            ]
        }
      }
    });
    console.log("Template message sent", response);
  } catch (err) {
    console.log("Error sending template message", err);
  }
}

// Function to send 'About' info
async function sendAboutInfo(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864",
      destination: to,
      'src.name': "DemoQest",
      message: {
        type: "text",
        text: `At Qest, we're building an all-in-one SaaS platform that empowers service businesses to set up and manage their operations with ease. Our platform simplifies every aspect of business management, allowing service providers to launch and operate efficiently. We're not just reimagining the service industry—we're leading a revolution in how service businesses are discovered and managed.`,
      }
    });
    console.log("About info sent", response);
    
    // Send back to menu option
    await sendBackToMenuOption(to);
  } catch (err) {
    console.log("Error sending About info", err);
  }
}

// Function to send Brochure
async function sendBrochure(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864",
      destination: to,
      'src.name': "DemoQest",
      message: {
        type: "text",
        text: "Here is the brochure for Qest SaaS platform. [https://www.getqest.com/about-us]",
      }
    });
    console.log("Brochure sent", response);
    
    // Send back to menu option
    await sendBackToMenuOption(to);
  } catch (err) {
    console.log("Error sending Brochure", err);
  }
}

// Function to send 'Back to Menu' option
async function sendBackToMenuOption(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864",
      destination: to,
      'src.name': "DemoQest",
      message: {
        type: "text",
        text: "You can go back to the main menu. Type 'Back to Menu' to return.",
      }
    });
    console.log("Back to menu option sent", response);
  } catch (err) {
    console.log("Error sending back to menu option", err);
  }
}

// Webhook endpoint to receive messages (Example using Express.js)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Gupshup sends incoming messages to your webhook
app.post('/webhook', (req, res) => {
  const event = req.body;
  console.log("Incoming message event: ", event);
  
  // Process the incoming message
  handleIncomingMessage(event);
  
  res.status(200).send("OK");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
