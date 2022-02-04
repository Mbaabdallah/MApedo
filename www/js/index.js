  function geo() {
    navigator.geolocation.getCurrentPosition(onSuccess,
      onError
      );
  }

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  var onSuccess = function(position) {
    alert('Latitude: '    + position.coords.latitude          + '\n' +
      'Longitude: '         + position.coords.longitude         + '\n' +
      'Altitude: '          + position.coords.altitude          + '\n' +
      'Accuracy: '          + position.coords.accuracy          + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      'Heading: '           + position.coords.heading           + '\n' +
      'Speed: '             + position.coords.speed             + '\n' +
      'Timestamp: '         + position.timestamp                + '\n');
    var lat1 = position.coords.latitude;
    var lat2 = position.coords.latitude;
    var lon1 = position.coords.longitude;
    var lon2 = position.coords.longitude;
  var R = 6371e3; // metres
  var phee1 = lat1 * Math.PI/180; // φ, λ in radians
  var phee2 = lat2 * Math.PI/180;
  var delta_phee = (lat2-lat1) * Math.PI/180;
  var delta_lambda = (lon2-lon1) * Math.PI/180;
  var a = Math.sin(delta_phee/2) * Math.sin(delta_phee/2) +Math.cos(phee1) * Math.cos(phee2) * Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c)/1000; // in metres
  //60 calories/km
  var calories = d * 60 ;
  var now = new Date();
  var heure   = now.getHours();
  var minute  = now.getMinutes();
  var seconde = now.getSeconds();
  var heure = heure + ":" + minute + ":" + seconde  ;
  document.getElementById("distance").innerHTML = parseInt(d);
  document.getElementById("calories").innerHTML = parseInt(calories);
  document.getElementById("heure").innerHTML = heure ;
  console.log("calories = " + calories);
  console.log("heure = " + heure);
  console.log("disatnces = " + d);


}

function geo1() {
    navigator.geolocation.getCurrentPosition(onSuccess1,
      onError1
      );
  }

  function onError1(error) {
    alert('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
  }

  var onSuccess1 = function(position) {
    console.log('Latitude: '    + position.coords.latitude          + '\n' +
      'Longitude: '         + position.coords.longitude         + '\n' );
    var lat1 = position.coords.latitude;
    var lat2 = position.coords.latitude;
    var lon1 = position.coords.longitude;
    var lon2 = position.coords.longitude;
  var R = 6371e3; // metres
  var phee1 = lat1 * Math.PI/180; // φ, λ in radians
  var phee2 = lat2 * Math.PI/180;
  var delta_phee = (lat2-lat1) * Math.PI/180;
  var delta_lambda = (lon2-lon1) * Math.PI/180;
  var a = Math.sin(delta_phee/2) * Math.sin(delta_phee/2) +Math.cos(phee1) * Math.cos(phee2) * Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c)/1000; // in metres
  //60 calories/km
  
  d = document.getElementById("distance").innerHTML 
  var ob = document.getElementById("objectif");
  console.log("objectif = " + ob.value);

  if (parseFloat(ob.value)==parseFloat(d)) {
    alert("Vous avez atteindre votre objectif !");
    console.log(navigator.vibrate);
    navigator.vibrate(300);
  }
}

function onRetintialiser() {
  var now = new Date();
  var heure   = now.getHours();
  var minute  = now.getMinutes();
  var seconde = now.getSeconds();
  var heure = heure + ":" + minute + ":" + seconde  ;
  document.getElementById("distance").innerHTML = 0;
  document.getElementById("calories").innerHTML = 0;
  document.getElementById("heure").innerHTML = heure ;

}


window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(status) {
  console.log("Battery Level Low " + status.level + "%");
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  console.log(navigator.vibrate);
  navigator.vibrate(300);
}


function onConfirm(){
  alert("le retintialiser est effectuer avec success", null);

}

function reportJour(){
    // l'identifiant est celui du canevas
  var ctx = document.getElementById('graphique');

  // création du graphique
  var myChartConfig = {type: 'bar',  // le type du graphique
  data: {        // les données
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' , 'Dimanche'],
    datasets: [{
      label: 'KM/Jour',
      data: [6.7, 8, 7.8, 7.6, 7, 8.8 , 6.7],
      backgroundColor: '#3098f2',
      borderColor: '#505357'
    }]
  }
};
  var myChart = new Chart(ctx, myChartConfig);

}
function reportSemaine(){
    // l'identifiant est celui du canevas
  var ctx = document.getElementById('graphique');
  // création du graphique
  var myChartConfig = {type: 'bar',   // le type du graphique
  data: {        // les données
    labels: ['1', '2', '3', '4'],
    datasets: [{
      label: 'KM/Semaine',
      data: [50, 44, 47, 66],
      backgroundColor: '#3098f2',
      borderColor: '#505357'
    }]
  }
};
  var myChart = new Chart(ctx, myChartConfig);

}
function reportMois(){
    // l'identifiant est celui du canevas
  var ctx = document.getElementById('graphique');
  // création du graphique
  var myChartConfig = {type: 'bar',   // le type du graphique
  data: {        // les données
    labels: ['janv', 'févr', 'mars', 'avr', 'mai', 'juin' , 'juill','août','sept','oct','nov','déc'],
    datasets: [{
      label: 'KM/Mois',
      data: [120, 80, 70, 66, 99, 77 , 60 , 70 ,90 , 66 , 55, 65],
      backgroundColor: '#3098f2',
      borderColor: '#505357'

    }]
  }
};
  var myChart = new Chart(ctx, myChartConfig);

}


