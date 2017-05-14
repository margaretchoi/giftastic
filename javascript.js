// Topics array
var topics = ['amy poehler', 'tina fey', 'will ferrell', 'kate mckinnon', 'amy schumer', 'mike birbiglia', 'trevor noah', 'john mulaney', 'aziz ansari', 'steve carrell' ];
// var topics = ['amy poehler', 'tina fey', 'will ferrell', 'kate mckinnon', 'amy schumer', 'mike birbiglia', 'trevor noah', 'john mulaney', 'aziz ansari', 'steve carrell' ];


// Render buttons for each item in the array
function createButtons() {
	$("#buttons-wrapper").empty();
	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button></button>').html(topics[i]).attr('class', 'topic-buttons').attr('data', topics[i]);
		$('#buttons-wrapper').append(newButton);
	}
}

createButtons();


// On click function for add form
$("#add-topic").on("click", function(event) {
	event.preventDefault();
	var topic = $("#topic-input").val().trim();
	topics.push(topic);
	createButtons();
});



$(".topic-buttons").on("click", function() {

	var topicText = $(this).attr('data');
	console.log(topicText);

	$(".grid").empty();

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topicText + "&api_key=dc6zaTOxFJmzC&limit=12";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");
	        var rating = results[i].rating;
	        var p = $("<p>").text("Rating: " + rating);

	        var gifImage = $("<img>");
	        gifImage.attr("src", results[i].images.fixed_height.url);

	        gifDiv.prepend(p);
	        gifDiv.prepend(gifImage);

	        $(".grid").prepend(gifDiv);
		}
        
	});
});

$(document).on("click", ".topic-buttons", createResults);

function createResults() {
	var topicText = $(this).attr('data');
	console.log(topicText);

	$(".grid").empty();

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        topicText + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");
	        var rating = results[i].rating;
	        var p = $("<p>").text("Rating: " + rating);

	        var gifImage = $("<img>");
	        gifImage.attr("src", results[i].images.fixed_height.url);

	        gifDiv.prepend(p);
	        gifDiv.prepend(gifImage);

	        $(".grid").prepend(gifDiv);
		}
        
	});
}




