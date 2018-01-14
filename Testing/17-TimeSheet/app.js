$('document').ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDu03oVxNCzXDhiS3YcT6yoXE5yeNd8Zu4",
        authDomain: "timesheet-4758a.firebaseapp.com",
        databaseURL: "https://timesheet-4758a.firebaseio.com",
        projectId: "timesheet-4758a",
        storageBucket: "timesheet-4758a.appspot.com",
        messagingSenderId: "980675643684"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
    $("#add-user").on("click", function() {
        // Don't refresh the page!
        event.preventDefault();

        // YOUR TASK!!!

        // Code in the logic for storing and retrieving the most recent user.
        database.ref().set({
                name: $("#name-input").val(),
                age: $("#age-input").val(),
                email: $("#email-input").val(),
                comment: $("#comment-input").val()
            })
            // Don't forget to provide initial data to your Firebase database.
        $("#name-display").html($("#name-input").val());
        $("#age-display").html($("#age-input").val());
        $("#email-display").html($("#email-input").val());
        $("#comment-display").html($("#comment-input").val());
    });


    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on(
        'value',
        function(snapshot) {
            var info = snapshot.val();
            if (info != null) {
                $("#name-display").html(info.name);
                $("#age-display").html(info.age);
                $("#email-display").html(info.email);
                $("#comment-display").html(info.comment);
            }
        },

        // Create Error Handling
        function(errorObject) {
            console.log('The read failed: ' + errorObject.code);
        }
    );




});