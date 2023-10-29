const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
const { getMessaging } = require("firebase-admin/messaging");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/send", (req, res) => {
  const message = {
    token: req.body.fcmToken,
    data: {
      openURL: req.body.openURL,
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      icon: req.body.icon,
    },
  };

  // Send the FCM message

  getMessaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.send("Notification sent successfully");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(500).send("Failed to send notification");
    });
});

// Start the server
const port = 3080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
