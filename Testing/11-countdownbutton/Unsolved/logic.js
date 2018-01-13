// Initialize Firebase (YOUR OWN APP)
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)
//Intialize Firebase
// This code was copied from our app page
var config = {
    apiKey: "AIzaSyAJLU3cuLrT_d4om25fHs7pny_GKzhfDxY",
    authDomain: "testing-firebase-7db6c.firebaseapp.com",
    databaseURL: "https://testing-firebase-7db6c.firebaseio.com",
    projectId: "testing-firebase-7db6c",
    storageBucket: "testing-firebase-7db6c.appspot.com",
    messagingSenderId: "751647189459"
};

// This will connect you to your database
firebase.initializeApp(config);
// Create a variable to reference the database
// var database = ...
var database = firebase.database();

// Use the below initialValue
var initialValue = 100;

// Use the below variable clickCounter to keep track of the clicks.
var clickCounter = initialValue;

// --------------------------------------------------------------

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
// HINT: Assuming 'database' is our database variable, use...
// database.ref().on("value", function(snapshot)) {}
database.ref().on(
    'value',
    function(snapshot) {

        // We are now inside our .on function...
        // Console.log the "snapshot" value (a point-in-time representation of the database)
        // the snapshot does not have a value itself, the value comes from the event tied to the snapshot so we have to add .val after snapshot
        console.log(snapshot.val());

        // This "snapshot" allows the page to get the most current values in firebase.
        // Change the value of our clickCounter to match the value in the database
        clickCounter = snapshot.val().clickCount;

        // Console Log the value of the clickCounter
        console.log(clickCounter);

        // Change the HTML using jQuery to reflect the updated clickCounter value
        $('#click-value').text(snapshot.val().clickCount);
    },

    // Then include Firebase error logging
    // HINT: }, function(errorObject)
    function(errorObject) {
        console.log('The read failed: ' + errorObject.code);
    }
);
// --------------------------------------------------------------


// Whenever a user clicks the click button
$("#click-button").on("click", function() {

    // Reduce the clickCounter by 1
    clickCounter--;

    // Alert User and reset the counter
    if (clickCounter === 0) {

        alert("Phew! You made it! That sure was a lot of clicking.");

        clickCounter = initialValue;

    }

    // Save new value to Firebase
    database.ref().set({
        clickCount: clickCounter
    });
    // Log the value of clickCounter
    console.log(clickCounter);

});

// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

    // Set the clickCounter back to initialValue
    clickCounter = initialValue;

    // Save new value to Firebase
    /*database.ref().set({
        clickCount: clickCounter
    });*/

    // Log the value of clickCounter
    //console.log(clickCounter);

    // Change the HTML Values
    $("#click-value").text(clickCounter);


});