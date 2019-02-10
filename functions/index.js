const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.sendAdminNotification2 = functions.database.ref('/mensagens/{pushId}').onWrite(event => {


    console.log("executei função");
    // This registration token comes from the client FCM SDKs.
    var registrationToken = "crGp4iw4x4A:APA91bEo08fc1lVFkar_0diRGyrY6oS-uwGnWYBZ_ZuTisJs_-Bk6u5KV7aweylhVqseLvps3ZieyhZ0uxKGkjDNj7zGJwJ91jHleO3Tm7S_jEZ6Ml8g3eyJNw3z3qQLgzQrixOqU6Zs";

    // See documentation on defining a message payload.
    var message = {

        to: registrationToken,
        notification: {}
    };


    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

});