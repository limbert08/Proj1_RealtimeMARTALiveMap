var returnRespone = {};
function getResponse() {
  // This is the API key for Giphy
  var APIKey = "7cfbab76-7af1-4ce7-b579-d1662046422d";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // Here we are building the URL we need to query the database
  var queryURL = "developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey="+ APIKey;
  //Ajax call to get the response object
  $.ajax({
    url: proxyurl+queryURL,
    method: "GET"
    //done promise to pass the response object to function to build the gif display and associate the events
  }).done(function(response) {
    console.log('Untouched Response');
    console.log(response);
    returnResponse = response;
    
    //var station = groupDestinations(response, 'DESTINATIONS');
    var stations = groupDestinations(response, 'DESTINATION');
    //console.log(stations);
    var arrivals = getArrivals(response, 'DUNWOODY', 'STATION', 'NEXT_ARR', 'TRAIN_ID');
    console.log('Arrivals at the five Points Stations');
    console.log(arrivals);
    var currentTrainStops = arrivals.returnTrainStops(response, 'TRAIN_ID');
    console.log('Current Stops for COming into the stations'); 
    console.log(currentTrainStops);
    var currentBoardingStops = currentTrainStops.returnTrainLocations('Boarding', 'WAITING_TIME');
    var currentArrivingStops = currentTrainStops.returnTrainLocations('Arriving', 'WAITING_TIME');

    console.log('Arrivals at the five Points Stations');
    console.log(arrivals);
    console.log('Trains that are boarding'); 
    console.log(currentBoardingStops);
    console.log('Trains that arriving');
    console.log(currentArrivingStops);
    console.log(returnResponse);
    return returnResponse;
    //console.log(response.hasValue("Airport", 'DESTINATION'));
    //fail promise to deal with unknown exceptions
  }).fail(function (jqXHR, textStatus) {
    alert('The request for your subject failed please try another button');
  });
  
}

function groupDestinations(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}

function getArrivals(currentTrains, station, property, returnString1, returnString2) {
  var hash = {};
  arrivals = [];
  for (var i =0; i < currentTrains.length; i++) {
    if (!hash[currentTrains[i][property]]) hash[currentTrains[i][property]] = [];
        //console.log(currentTrains[i][property].toString());
        if (currentTrains[i][property].toString() == station) {
          var nextArrvial = [] 
          nextArrvial.push(currentTrains[i][returnString1]);
          nextArrvial.push(currentTrains[i][returnString2]); 
          arrivals.push(nextArrvial);
          //hash[currentTrains[i][property]].push(currentTrains[i]);  
        }
         
  }
  return arrivals;
}

function getTrainStops(arrivals, response) {
  for (var i =0; i < arrivals.length; i++) {

  }
}
Array.prototype.returnTrainStops = function(response, trainID) {
    var trainStops = []; 
    var i = this.length;
    while (i--) {
      var x = response.length;
        while(x--) {
        if (response[x][trainID] == this[i][1]) {
          trainStops.push(response[x]);   // Found it
        //}
        }  
      }
    }
    return trainStops;
}

Array.prototype.returnTrainLocations = function(filter, property) {
    var currentStops = []; 
    var i = this.length;
    while (i--) {
        if (this[i][property] == filter) {
          currentStops.push(this[i]);   // Found it
      }
    }
    return currentStops;
}

Array.prototype.returnIncomingTrains = function(filter, property, station) {
    var currentStops = []; 
    var i = this.length;
    while (i--) {
        if (this[i][property] == filter) {
          currentStops.push(this[i]);   // Found it
      }
    }
    return currentStops;
}

function getIncomingTrains(station, line) {
  var config = {
  apiKey: "AIzaSyChS-KWClciEknCOfjJKJ15ufrrZ847z9I",
  authDomain: "marta-hw.firebaseapp.com",
  databaseURL: "https://marta-hw.firebaseio.com/",
  storageBucket: "marta-hw.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();
    //var categoryId = "my-category"
    //var categoryRef = postsRef.childByAppendingPath(categoryId)
    var ref = firebase.database().ref("trains");
    ref.orderByChild("Line").equalTo(line).on("child_added", function(snapshot) {
      console.log(snapshot.key() + " was " + snapshot.val().LINE);
    });
    //var ref = firebase.database().ref("trains");
    //ref.orderByChild("LINE").on("child_added", function(snapshot) {
    //console.log(snapshotToArray(snapshot.val());

  //var currentIncomingTrains = response.returnIncomingTrains('Arriving', 'WAITING_TIME', station);
  //currentIncomingTrains = currentIncomingTrains.concat(response.returnIncomingTrains('Boarding', 'WAITING_TIME', station));
  //console.log(currentIncomingTrains);
  //drawTrainRoute(currentIncomingTrains);
}

function drawTrainRoute(trains, line) {
  for (i = 0; i < trains.length; i++) {
    var destination = "";
    var direction = "";
    var line = "";
    var nextArrival = "";
    var station = "";
    var train = "";
    var wait = "";
    var status = "";
    destination = trains[i]['DESTINATION'].toString();
    direction = trains[i]['DIRECTION'].toString();
    line = $('.stations').attr('data-stations');
    nextArrival = trains[i]['NEXT_ARR'].toString();
    station = trains[i]['STATION'].toString();
    train = trains[i]['TRAIN_ID'].toString();
    wait = trains[i]['WAITING_SECONDS'].toString();
    status = trains[i]['WAITING_TIME'].toString();
    if ((line == 'RED') && (direction == 'N')) {
      buildTrainUL('#redTrain li', '#ccffcc', 'RED', 'redTrain', station)
    } else if ((line == 'RED') && (direction == 'S')) {
      buildTrainUL('#redTrainRev li', '#ccff00', 'RED', 'redTrainRev', station);
    } else if ((line == 'BLUE') && (direction == 'N')) {
      buildTrainUL('#blueTrain li', '#ccffcc', 'BLUE', 'blueTrain', station)
    } else if ((line == 'BLUE') && (direction == 'S')) {
      buildTrainUL('#blueTrainRev li', '#ccff00', 'BLUE', 'blueTrainRev', station);
    } else if ((line == 'GOLD') && (direction == 'N')) {
      buildTrainUL('#goldTrain li', '#ccffcc', 'GOLD', 'goldTrain', station)
    } else if ((line == 'GOLD') && (direction == 'S')) {
      buildTrainUL('#goldTrainRev li', '#ccff00', 'GOLD', 'goldTrainRev', station);
    } else if ((line == 'GREEN') && (direction == 'N')) {
      buildTrainUL('#greenTrain li', '#ccffcc', 'GREEN', 'greenTrain', station)
    } else if ((line == 'GREEN') && (direction == 'S')) {
      buildTrainUL('#greenTrainRev li', '#ccff00', 'GREEN', 'greenTrainRev', station);
    }
  }
}

function getData() {
  var config = {
  apiKey: "AIzaSyChS-KWClciEknCOfjJKJ15ufrrZ847z9I",
  authDomain: "marta-hw.firebaseapp.com",
  databaseURL: "https://marta-hw.firebaseio.com/",
  storageBucket: "marta-hw.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();
    
    //var ref = firebase.database().ref("trains");
    //ref.orderByChild("LINE").on("child_added", function(snapshot) {
    //console.log(snapshotToArray(snapshot.val());
    var query = firebase.database().ref("trains").orderByChild("TRAIN_ID");
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          console.log(key);
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          console.log(childData);
      });

  });
}

function buildTrainUL(div, color, elClass, id, station) {
  var trainLine = $(div);
  var trainRoute = $('<ul data-color="'+color+'" id="'+id+'" class="'+elClass+'" data-label="Train#"></ul>').appendTo('#trainRoutes');
  for (x = 0; x < trainLine.length; x++) {
    if (trainLine[x].attributes.length > 2) {
      if (trainLine[x].attributes[2].nodeValue == station){
        trainLine.length=x;
        trainLine.each(function(index, value){
          trainRoute.append(value);
        });
      }
    }  
  }  
}