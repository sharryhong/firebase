(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNKetOhIuxti9ugG_ZGmr_QFslh54dd_A",
    authDomain: "web-quickstart-8a66e.firebaseapp.com",
    databaseURL: "https://web-quickstart-8a66e.firebaseio.com",
    storageBucket: "web-quickstart-8a66e.appspot.com",
    messagingSenderId: "479757967532"
  };
  firebase.initializeApp(config);

  // Get elements
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');

})();