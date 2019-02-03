var config = {
  apiKey: "AIzaSyDHQ8MatbGpS3Xb_zAmnrW4sU5Wo9EaFas",
  authDomain: "pgrotas.firebaseapp.com",
  databaseURL: "https://pgrotas.firebaseio.com",
  projectId: "pgrotas",
  storageBucket: "pgrotas.appspot.com",
  messagingSenderId: "103953800507"
};
firebase.initializeApp(config);
var database = firebase.database();

if (navigator.serviceWorker.controller) {
  console.log("[PWA Builder] active service worker found, no need to register");
} else {
  //Register the ServiceWorker
  navigator.serviceWorker
    .register("/serviceworker.js", {
      scope: "./"
    })
    .then(function (reg) {
      console.log("Service worker has been registered for scope:" + reg.scope);
    });
}