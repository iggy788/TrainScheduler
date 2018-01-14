/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
$('document').ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyANLYziFr5f-d9MP0XD9qZzs7LRpA6j7nY",
        authDomain: "trainscheduler-a5bd8.firebaseapp.com",
        databaseURL: "https://trainscheduler-a5bd8.firebaseio.com",
        projectId: "trainscheduler-a5bd8",
        storageBucket: "",
        messagingSenderId: "104914317113"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // 2. Button for adding Trains
    $('#add-train-btn').on('click', function(event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $('#train-name-input').val().trim();
        var trainDestination = $('#destination-input').val().trim();
        var trainStart = moment($('#first-train-input').val().trim(), 'hh:mm').format('X');
        //var trainStart = moment($('#first-train-input').val().trim(), "hh:mm").subtract(1, "years");
        var trainRate = $('#frequency-input').val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            rate: trainRate
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.rate);

        // Alert
        alert('Train successfully added');

        // Clears all of the text-boxes
        $('#train-name-input').val('');
        $('#destination-input').val('');
        $('#first-train-input').val('');
        $('#frequency-input').val('');
    });

    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on('child_added', function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainStart = childSnapshot.val().start;
        var trainRate = childSnapshot.val().rate;

        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainStart);
        console.log(trainRate);
        // ==========================================================
        // Calculations for when trains will arrive and how far they are away 

        // First Train of the Day is 3:00 AM
        // Assume Train comes every 7 minutes.
        // Assume the current time is 3:16 AM....
        // What time would the next train be...? (Use your brain first)
        // It would be 3:21 -- 5 minutes away

        // ==========================================================

        // Solved Mathematically
        // Test case 2:
        // 16 - 00 = 16
        // 16 % 7 = 2 (Modulus is the remainder)
        // 7 - 2 = 5 minutes away
        // 5 + 3:16 = 3:21

        // Assumptions

        // Next Arrival
        var trainStartPretty = moment.unix(trainStart).format('MM/DD/YY');
        //var trainStartPretty = moment.unix(trainStart).format("hh:mm"));

        // Minutes Away
        var trainMonths = moment().diff(moment.unix(trainStart, 'X'), 'months');
        console.log(trainMonths);
        // Difference between the times
        // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        // var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        // Minute Until Train
        // var tMinutesTillTrain = tFrequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


        // Next Train
        // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Add each train's data into the table
        $('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainRate + '</td><td>' + trainStartPretty + '</td><td>' + trainMonths + '</td><td>');
    });

    // Example Time Math
    // -----------------------------------------------------------------------------
    // Assume Train start date of January 1, 2015
    // Assume current date is March 1, 2016

    // We know that this is 15 months.
    // Now we will create code in moment.js to confirm that any attempt we use mets this test case

});