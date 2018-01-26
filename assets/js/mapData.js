//var returnRespone = {};
function getResponse(station) {
  // This is the API key for Giphy
  /*var APIKey = "7cfbab76-7af1-4ce7-b579-d1662046422d";
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
    stationSearch(response, station);
    //console.log(response.hasValue("Airport", 'DESTINATION'));
    //fail promise to deal with unknown exceptions
  }).fail(function (jqXHR, textStatus) {
    alert('The request for your subject failed please try another button');
  });*/
  // ********************* Firebase call ****************************
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
database.ref().on("value", function(martadata) {
  $("#targetbody").html("");
  console.clear();
  console.log("Testing firebase call");

  var martadata = martadata.val().trains;
  console.log(martadata);
  stationSearch(martadata, station);
  firebase.database().goOffline()// Kill this firebase app.
  firebase.app().delete().then(function() {
    console.log("tear down");
  });

// *********************** End of firebase call ********************

});
}

// stationSearch - identifies next inbound train to each station
function stationSearch(martadata, responseId) {


  $("#searchList").html("");
  $("#station-id").html("");

  var trainArray = [];
  var timeArray = [];
  var stationArray = [];
  var lineArray = [];
  var directionArray = [];
  var finalArray = [];

    for (var i = 0; i < martadata.length; i++) {

      if (martadata[i].STATION === responseId) {
        trainArray.push(martadata[i].TRAIN_ID);
        timeArray.push(martadata[i].NEXT_ARR);
        stationArray.push(martadata[i].STATION);
        lineArray.push(martadata[i].LINE);
        directionArray.push(martadata[i].DIRECTION);
        finalArray.push(martadata[i].DESTINATION);
      }

    }

    console.log("Next arrivals for " + responseId);
  
  // Create object to hold next train detail  
    var nextArrivals = {
  train: trainArray,
  time: timeArray,
  station: stationArray,
  line: lineArray,
  direction: directionArray,
  final: finalArray
  }
  console.log(nextArrivals);
  localStorage.setItem("arrivals", JSON.stringify(nextArrivals));
  drawTrainRoute(nextArrivals)
}

function drawTrainRoute(trains) {
  for (i = 0; i < trains.train.length; i++) {
    var direction = "";
    var destination = "";
    var line = "";
    var station = "";
    var nextArrival = "";
    var train = "";
    destination = trains.final[i];
    direction = trains.direction[i];
    line = trains.line[i];
    nextArrival = trains.time[i];
    station = trains.station[i];
    train = trains.train[i];
    if ((line == 'RED') && (direction == 'S')) {
      buildTrainUL('#redTrain li', '#DC143C', 'RED', 'redTrain', station, train)
    } else if ((line == 'RED') && (direction == 'N')) {
      buildTrainUL('#redTrainRev li', '#B0171F', 'RED', 'redTrainRev', station, train);
    } else if ((line == 'BLUE') && (direction == 'E')) {
      buildTrainUL('#blueTrain li', '#0000FF', 'BLUE', 'blueTrain', station, train)
    } else if ((line == 'BLUE') && (direction == 'W')) {
      buildTrainUL('#blueTrainRev li', '#4F94CD', 'BLUE', 'blueTrainRev', station, train);
    } else if ((line == 'GOLD') && (direction == 'S')) {
      buildTrainUL('#goldTrain li', '#CDAD00', 'GOLD', 'goldTrain', station, train)
    } else if ((line == 'GOLD') && (direction == 'N')) {
      buildTrainUL('#goldTrainRev li', '#B8860B', 'GOLD', 'goldTrainRev', station, train);
    } else if ((line == 'GREEN') && (direction == 'E')) {
      buildTrainUL('#greenTrain li', '#00CD00', 'GREEN', 'greenTrain', station, train)
    } else if ((line == 'GREEN') && (direction == 'W')) {
      buildTrainUL('#greenTrainRev li', '#008B00', 'GREEN', 'greenTrainRev', station, train);
    }
  }
  reDrawMaps();
}

function buildTrainUL(div, color, elClass, id, station, trainID) {
  var trainLine = $(div);
  var trainRoute = $('<ul data-trainID="'+trainID+'"data-color="'+color+'" id="'+id+'" class="'+elClass+'" data-label="Train#"></ul>').appendTo('#trainRoutes');
  for (x = 0; x < trainLine.length; x++) {
    if (trainLine[x].attributes.length > 2) {
      if (trainLine[x].attributes[2].nodeValue == station){
        trainLine.length=(x+1);
        trainLine.each(function(index, value){
          if(index + 1 === trainLine.length){ //last element
            $(value).attr('data-marker', '@interchange');
          }
          $(value).clone(true).appendTo(trainRoute);
          //trainRoute.append(value);
        });
      }
    }  
  }  
}

function reDrawMaps() {
  $('#subwaymap .canvas').remove();
  $('#legend').empty();
  $('#subwaymapinvisible').subwayMap({ debug: false });
  $('.trainRoutes').subwayMap({ debug: false });
  $('.trainRoutes').css("display","block");
  setCanvasEvent();
}

function getUserClick(e) {
  var x = e.clientX
    , y = e.clientY
  //...
  var stations = JSON.parse(localStorage.getItem("stations"));
  console.log(stations);      

      for (z = 0; z < stations.length; z++) {
          var isClicked = isInCircle(stations[z][0], stations[z][1], stations[z][2], x, y);
          if (isClicked == true) {
              console.log("Found It Clicked: " + stations[z][3]);
              var station = stations[z][3];
              z=999;
              //getIncomingTrains(returnResponse, station);
              $('.trainRoutes').empty();
              getResponse(station);
              //getIncomingTrains(station, line);
              
              
          }
      }
}
function setCanvasEvent() {
  $('.canvas').off('click');
  $('.canvas').on('click', function(e) {
    getUserClick(e);                 
  });
}

function testEvent() {
  var timer;
  $('.canvas').off('mousemove');
  $('.canvas').on('mousemove', function(e) {
    var x = e.clientX
    , y = e.clientY
    //...
    var stations = JSON.parse(localStorage.getItem("stations"));
        for (z = 0; z < stations.length; z++) {
          var isClicked = isInCircle(stations[z][0], stations[z][1], stations[z][2], x, y);
          if (isClicked == true) {
            var tempString = stations[z][3].toProperCase();
            tempString = tempString.substring(0, tempString.lastIndexOf(" "));
            $('#'+tempString.replace(/\s/g,'')).css('opacity', 1);
            console.log(tempString.replace(/\s/g,''));
            try {
              clearTimeout(timer);
            } catch (e) {}
            timer = setTimeout(function () {
              $('#'+tempString.replace(/\s/g,'')).css('opacity', 0);
            }, 1000);
          }
        }                     
    }); 
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
        
function makeStationNamesVisible() {
  $('#NorthSprings').css('opacity', 1);
  //$('#FivePoints').css('display', 'block');
  $('#Doraville').css('opacity', 1);
  $('#Airport').css('opacity', 1);
  $('#Bankhead').css('opacity', 1);
  $('#IndianCreek').css('opacity', 1);
  $('#HamiltonEHolmes').css('opacity', 1);
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

function getIncomingTrains(response, station) {
  var currentIncomingTrains = response.returnIncomingTrains('Arriving', 'WAITING_TIME', station);
  currentIncomingTrains = currentIncomingTrains.concat(response.returnIncomingTrains('Boarding', 'WAITING_TIME', station));
  console.log(currentIncomingTrains);
  drawTrainRoute(currentIncomingTrains);
}