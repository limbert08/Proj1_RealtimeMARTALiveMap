
var Firebase = require('firebase');
var jQuery = require('jquery');

exports.handler = (event, context, callback) => {
    var config = {
        apiKey: "AIzaSyChS-KWClciEknCOfjJKJ15ufrrZ847z9I",
        authDomain: "marta-hw.firebaseapp.com",
        databaseURL: "https://marta-hw.firebaseio.com",
        projectId: "marta-hw",
        storageBucket: "marta-hw.appspot.com",
        messagingSenderId: "235403493962"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    // Marta API key
    var martaKey = "2a3502f1-d73a-4fd9-bafe-dc2c5d5c1b1e";
    // Marta API connection settings
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=" + martaKey,
        "method": "GET"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (var key in response) {
            if (response.hasOwnProperty(key)) {
                console.log("Key is " + k + ", value is" + response[key]);
                var dbKey = key;
                var dbVal = response[key];
                database.ref().child('trains').push(response);
            }
        }
    });
    context.succeed("done");
}

