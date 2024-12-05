const sendOptionMessage = require("./templateComtroller");

// Function to send Brochure
async function sendBrochure(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864",
      destination: to,
      "src.name": "DemoQest",
      message: {
        type: "text",
        text: "Here is the brochure for Qest SaaS platform. [https://www.getqest.com/about-us]",
      },
    });
    console.log("Brochure sent", response);

    // Send back to menu option
    await sendOptionMessage(to);
  } catch (err) {
    console.log("Error sending Brochure", err);
  }
}

module.exports = sendBrochure;
