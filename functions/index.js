const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!123");
});

exports.sendAdminNotification = functions.database.ref('/mensagens/{pushId}').onWrite(event => {


    console.log("Teste27");
    // This registration token comes from the client FCM SDKs.
    var registrationToken = "crGp4iw4x4A:APA91bEo08fc1lVFkar_0diRGyrY6oS-uwGnWYBZ_ZuTisJs_-Bk6u5KV7aweylhVqseLvps3ZieyhZ0uxKGkjDNj7zGJwJ91jHleO3Tm7S_jEZ6Ml8g3eyJNw3z3qQLgzQrixOqU6Zs";



    var message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });



});