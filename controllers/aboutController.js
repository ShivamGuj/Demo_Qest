const sendOptionMessage = require("./templateComtroller");

// Function to send 'About' info
async function sendAboutInfo(to) {
  try {
    const response = await client.message.send({
      channel: "whatsapp",
      source: "+917499472864",
      destination: to,
      "src.name": "DemoQest",
      message: {
        type: "text",
        text: `At Qest, we're building an all-in-one SaaS platform that empowers service businesses to set up and manage their operations with ease. Our platform simplifies every aspect of business management, allowing service providers to launch and operate efficiently. We're not just reimagining the service industry—we're leading a revolution in how service businesses are discovered and managed.`,
      },
    });
    console.log("About info sent", response);

    // Send back to menu option
    await sendOptionMessage(to);
  } catch (err) {
    console.log("Error sending About info", err);
  }
}

module.exports = sendAboutInfo;
