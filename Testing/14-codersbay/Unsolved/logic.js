// Initialize Firebase
var config = {
    apiKey: 'AIzaSyCArvkzjngKhuCmbsEu5f6DXXxt7ZeaIBo',
    authDomain: 'codingbay-1f2a4.firebaseapp.com',
    databaseURL: 'https://codingbay-1f2a4.firebaseio.com',
    projectId: 'codingbay-1f2a4',
    storageBucket: '',
    messagingSenderId: '974583722433',
};
firebase.initializeApp(config);
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


// Assign the reference to the database to a variable named 'database'
// Create a variable to reference the database
var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        // Set the variables for highBidder/highPrice equal to the stored values in firebase.
        // highPrice = ...
        // highBidder = ...
        database.ref().on('value', function(snapshot) {
                var highPrice = snapshot.val();
                console.log(highPrice);
                var highBidder = snapshot.val();
                console.log(highBidder);
                if (info != null) {
                    $('#highest-bidder').html(info.name);
                    $('#highest-price').html(info.age);
                }
            }, // Create Error Handling
            function(errorObject) {
                console.log('The read failed: ' + errorObject.code);
            });

        // Change the HTML to reflect the stored values


        // Print the data to the console.


    }

    // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
    else {

        // Change the HTML to reflect the initial values


        // Print the data to the console.


    }


    // If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Get the input values


    // Log the Bidder and Price (Even if not the highest)
    if (bidderPrice > highPrice) {

        // Alert
        alert("You are now the highest bidder.");

        // Save the new price in Firebase


        // Log the new High Price


        // Store the new high price and bidder name as a local variable


        // Change the HTML to reflect the new high price and bidder

    } else {
        // Alert
        alert("Sorry that bid is too low. Try again.");
    }

});