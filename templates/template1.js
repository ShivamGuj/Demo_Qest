const axios = require("axios");

async function sendTemplate1(destinationPhoneNumber) {
  console.log("Sending template message with options");
  const apiKey = "7bxo0pdrzc4cfdnwkq8owvtj8ycqzlkj";
  const source = "917499472864";
  const templateId = "c4e59ded-3c4b-47a2-9e10-1cc7c83a87e3";
  const templateParams = ["Qest", "Qest", "Qest"];

  const url = "https://api.gupshup.io/wa/api/v1/template/msg";
  const data = new URLSearchParams();
  data.append("channel", "whatsapp");
  data.append("source", source);
  data.append("destination", destinationPhoneNumber);
  data.append("src.name", "DemoQest");
  data.append(
    "template",
    JSON.stringify({
      id: templateId,
      params: templateParams,
    })
  );
  data.append(
    "message",
    JSON.stringify({
      image: { id: "1091780495741855" },
      type: "image",
    })
  );

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: apiKey,
      },
    });
    console.log("Template message sent successfully:", response.data);
  } catch (error) {
    console.error(
      "Error sending template message:",
      error.response ? error.response.data : error.message
    );
  }
}

module.exports = sendTemplate1;
