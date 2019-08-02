// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDYG6jV7hT-rPHhqVZS2tewNZs4nFK7GVk",
    authDomain: "eden-loot-tracker.firebaseapp.com",
    databaseURL: "https://eden-loot-tracker.firebaseio.com",
    projectId: "eden-loot-tracker",
    storageBucket: "",
    messagingSenderId: "212398462210",
    appId: "1:212398462210:web:7d694efcc309f2e5"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-item").on("click", function(event) {

    event.preventDefault();

    var playerName = $("#name-input option:selected").text();
    var itemName = $("#item-input option:selected").text();
    var dateAcquired = $("#date-input").val().trim();
    var isMain = $("#main-input option:selected").text();

    var newEntry = {
        name: playerName,
        item: itemName,
        date: dateAcquired,
        main: isMain
    };

    database.ref().push(newEntry);

    console.log(newEntry.name);
    console.log(newEntry.item);
    console.log(newEntry.date);
    console.log(newEntry.main);
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var playerName = childSnapshot.val().name;
    var itemName = childSnapshot.val().item;
    var dateAcquired = childSnapshot.val().date;
    var isMain = childSnapshot.val().main;

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(dateAcquired),
        $("<td>").text(playerName),
        $("<td>").text(itemName),
        $("<td>").text(isMain)
    );
    
      // Append the new row to the table
    $("#loot-table > tbody").append(newRow);
});