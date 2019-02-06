const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendAdminNotification = functions.database.ref('/mensagens/{pushId}').onWrite(event => {
    const news= event.data.val();

    const payload = {notification: {
                title: 'New news',
                body: `"Uhuuu"`
                    }
        };
        return admin.messaging().sendToTopic("News",payload)
        .then(function(response){
             console.log('Notification sent successfully:',response);
        }) 
        .catch(function(error){
             console.log('Notification sent failed:',error);
        });
        
});