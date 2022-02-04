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
    console.log('Latitude: '    + position.coords.latitude          + '\n' +
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
  console.log(d);
  return d;
  console.log(calories);
  return calories;
  console.log(heure);
  return heure;
  var ob = document.getElementById("objectif");
  console.log(ob.value);
  if (parseFloat(ob.value)==parseFloat(d)) {
    alert("Vous avez atteindre votre objectif !")
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
  var myChartConfig = {type: 'bar',   // le type du graphique
  data: {        // les données
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' , 'Dimanche'],
    datasets: [{
      data: [12, 19, 3, 5, 2, 3 , 6]
    }]
  }
};
  var myChart = new Chart(ctx, myChartConfig);

}


