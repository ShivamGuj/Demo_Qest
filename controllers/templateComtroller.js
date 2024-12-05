const axios = require("axios");
const qs = require("qs");

// Function to send Template Message with options (About, Get Brochure)
async function sendOptionMessage(to) {
  const url = "https://api.gupshup.io/wa/api/v1/msg";
  const apiKey = "7bxo0pdrzc4cfdnwkq8owvtj8ycqzlkj";
  const source = "917499472864";
  const destination = to;
  const message = {
    type: "quick_reply",
    content: {
      type: "text",
      text: "Choose an option:", // Main message content
    },
    options: [
      // Options to choose from
      {
        title: "About",
        postbackText: "Option 1 Selected",
      },
      {
        title: "Get Brochure",
        postbackText: "Option 2 Selected",
      },
    ],
  };

  const data = qs.stringify({
    // Constructing the data to send
    channel: "whatsapp",
    source: source,
    destination: destination,
    message: JSON.stringify(message),
    "src.name": "DemoQest",
  });

  try {
    const response = await axios.post(url, data, {
      // Sending the quick reply
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: apiKey,
      },
    });
    console.log("Quick reply sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error sending quick reply:",
      error.response ? error.response.data : error.message
    );
  }
}

// Export the function
module.exports = sendOptionMessage;
