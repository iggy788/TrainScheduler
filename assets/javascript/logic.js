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
        //var trainStart = moment($('#first-train-input').val().trim(), 'DD/MM/YY').format('X');
        var trainStart = moment($('#first-train-input').val().trim(), 'hh:mm').format('X');
        //var trainStart = moment($('#first-train-input').val().trim(), "hh:mm").subtract(1, "years");
        //console.log('Time Train Starts ' + trainStart);
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
        //console.log(newTrain.destination);
        //console.log(newTrain.name);
        //console.log(newTrain.start);
        //console.log(newTrain.rate);

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
        console.log('CURRENT TIME TRAIN WILL ARRIVE: ' + moment.unix(trainStart).format('hh:mm A'));
        console.log(trainRate);
        // ==========================================================
        // Next Arrival
        var trainStartPretty = moment.unix(trainStart).format('hh:mm A');
        //console.log('FIRST TIME TRAIN ARRIVES: ' + trainStartPretty);


        var firstTimeConverted = moment.unix(trainStart, 'hh:mm').subtract(1, 'years');
        //console.log('FIRST ' + firstTimeConverted);

        // Current Time Right Now
        var currentTime = moment();
        console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm A'));

        // Minutes Away
        // Difference between the times or Minutes Away
        var diffTime = moment().diff(moment.unix(trainStart), 'minutes');
        console.log('DIFFERENCE IN TIME: ' + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainRate;
        //console.log('tRemainder is ' + tRemainder);

        // Minutes Until Next Train
        var nextTrain = trainRate - tRemainder;
        //console.log('MINUTES TILL TRAIN: ' + nextTrain);

        // Next Train
        var arrivalTime = moment().add(nextTrain, "minutes").format("hh:mm A");
        //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

        // Add each train's data into the table
        $('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainRate + '</td><td>' + arrivalTime + '</td><td>' + nextTrain + '</td><td>');
    });

});