// Topics array
var topics = ['amy poehler', 'tina fey', 'will ferrell', 'kate mckinnon', 'amy schumer', 'mike birbiglia', 'trevor noah', 'john mulaney', 'aziz ansari', 'steve carrell' ];
// var topics = ['amy poehler', 'tina fey', 'will ferrell', 'kate mckinnon', 'amy schumer', 'mike birbiglia', 'trevor noah', 'john mulaney', 'aziz ansari', 'steve carrell' ];


// Render buttons for each item in the array

// Alphabetize array
topics.sort()

function createButtons() {
	// Empty buttons for when new buttons are created
	$("#buttons-wrapper").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button></button>').html(topics[i]).attr('class', 'topic-buttons').attr('data', topics[i]);
		$('#buttons-wrapper').append(newButton);
	}
	$(document).on("click", ".topic-buttons-round", createResults);
	$(document).on("click", ".topic-buttons", createResults);

	$(".topic-buttons").mouseover(function(){
    	$(this).attr('class', 'topic-buttons-round');
	});

	$(".topic-buttons").mouseout(function(){
    	$(this).attr('class', 'topic-buttons');
	});
}

// Create topic buttons on load
createButtons();


// On click function for add form

function addTopicButton () {
	$(".add-topic").on("click", function(event) {
		event.preventDefault();
		var topic = $(".topic-input").val().trim();
		topics.push(topic);
		createButtons();
	});
}

addTopicButton();

// // Creates the list of results
// function createResults() {
// 	var topicText = $(this).attr("data");
// 	console.log(topicText);

// 	$(".results").empty();

// 	// Query Giphy API using the button text
// 	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
//         topicText + "&api_key=dc6zaTOxFJmzC&limit=25";

	
//     // AJAX call to Giphy API
// 	$.ajax({
// 		url: queryURL,
// 		method: "GET"
// 	}).done(function(response) {
// 		console.log(response);
// 		var results = response.data;

// 		// Loop to create each image as a div and show the rating
// 		for (var i = 0; i < results.length; i++) {
// 			var gifDiv = $("<div class='item'>");
// 	        var rating = results[i].rating;
// 	        var rating = rating.toUpperCase();
// 	        var p = $("<p>").text( rating + " Rated");

// 	        // Create img element
// 	        var gifImage = $("<img>");
// 			gifImage.attr({
// 				"src": results[i].images.fixed_height.url, 
// 				"class": "item-img",
// 				"data-still": results[i].images.fixed_height_still.url, 
// 				"data-animate": results[i].images.fixed_height.url, 
// 				"data-state": "still"});

// 			// Prepend image to results
// 	        gifDiv.prepend(p);
// 	        gifDiv.prepend(gifImage);

// 	        $(".results").prepend(gifDiv);
// 		}

// 		// Displays this message if there are no results
// 		if (results.length === 0 ) {
// 			$('.message').html('Sorry! No results for ' + topicText.toUpperCase()).attr('text-align', 'center');
// 		}
// 		// Displays this message if there are results
// 		else {
// 			$(".message").html('Showing results for ' + topicText.toUpperCase() + '<br>');
//         }
// 	});

// 	// On click function to pause and play gifs
// 	$(document).on("click", ".item-img", pause);
// }

// Create results in a column layout
function createResults() {
	var topicText = $(this).attr("data");
	console.log(topicText);

	$("#columns").empty();

	// Query Giphy API using the button text
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topicText + "&api_key=dc6zaTOxFJmzC&limit=10";

	
    // AJAX call to Giphy API
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var results = response.data;

		// Loop to create each image as a figure and show the rating
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<figure></figure>");
	        var rating = results[i].rating;
	        var rating = rating.toUpperCase();
	        var caption = $("<figcaption></figcaption").text(rating + " Rated");

	        // Create img element
	        var gifImage = $("<img>");
			gifImage.attr({
				"src": results[i].images.fixed_height.url, 
				"class": "item-img",
				"data-still": results[i].images.fixed_height_still.url, 
				"data-animate": results[i].images.fixed_height.url, 
				"data-state": "still"});

			// Prepend image to results
	        gifDiv.prepend(caption);
	        gifDiv.prepend(gifImage);

	        // Add the image and caption to columns
	        $("#columns").prepend(gifDiv);
		}

		// Displays this message if there are no results
		if (results.length === 0 ) {
			$('.message').html('Sorry! No results for ' + topicText.toUpperCase()).attr('text-align', 'center');
		}
		// Displays this message if there are results
		else {
			$(".message").html('Showing results for ' + topicText.toUpperCase() + '<br>');
        }
	});

	// On click function to pause and play gifs
	$(document).on("click", ".item-img", pause);
}




// Pause and start gifs on click
function pause() {
	var state = $(this).attr('data-state');

	// Variables for a still and animated state
	console.log(state);
	var dataAnimation = $(this).attr('data-animate');
	var dataStill = $(this).attr('data-still');

	// If the current gif is still, change data state to animate
	if (state === 'still') {
		$(this).attr('src', dataAnimation);
		$(this).attr('data-state', 'animate');
	}

	// If not still, change data to still
	else {
		$(this).attr('src', dataStill);
		$(this).attr('data-state', 'still');
	}

};


// Clear button, removes results
$('#clear').on('click', clearResults);

function clearResults() {
	$("#columns").empty();
	$(".message").empty();
}

