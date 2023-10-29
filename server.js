const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
const { getMessaging } = require("firebase-admin/messaging");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/send", (req, res) => {
  const registrationToken =
    "enfOxRNJbpNnL1KcIWA99b:APA91bEw2a6fkpo6ntB70aP5b99ccILkz2FEb0SLbFsDw7YBhj3r3gB6oGziFyL4DGr7T0TfrEbpsve-CEbFedzsdcILmNnZ2nR7nfTODJyng7ZhMs7sGxb5LC5JI6JaibuomBc7EEYQ";

  const message = {
    // notification: {
    //   title: "Hello2 dfds",
    //   body: "Test notification",
    // },
    token: req.body.fcmToken,
    data: {
      openURL: "https://facebook.com/",
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      icon: "https://images.unsplash.com/photo-1574169207511-e21a21c8075a?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
