// Execute only after the whole document is fetched and assets are loaded.
$(document).ready(function () {
	// Form submission event listener (event handler)
	$("#voteForm").submit(function (e) {
		// Prevent the default event.
		e.preventDefault();
		// Get the checked input element's value.
		var starter = $(".form-check-input:checked").val();
		// Construct the data to be sent as a payload to the AJAX call.
		var data = {
			"starter": starter
		};
		// Fire the POST request AJAX call to our /vote end point.
		$.post("/vote", data, function (res) {
			// Log the output in the console.
			console.log(res);
		});
	});
	// Create the base data points.
	var dataPoints = [
		{
			label: "Charmander",
			y: 0
		}, {
			label: "Squirtle",
			y: 0
		}, {
			label: "Bulbasaur",
			y: 0
		}
	];
	// Initialise Chart using jQuery selector.
	// Get the chart container element.
	var chartContainer = $("#chartContainer");
	// Check if the element exists in the DOM.
	if (chartContainer.length === 1) {
		// Construct the options for the chart.
		var options = {
			"animationEnabled": true,
			"theme": "light1",
			"title": {
				"text": "Pokemon Starter Results"
			},
			"data": [
				{
					"type": "column",
					"dataPoints": dataPoints
				}
			]
		};
		// Initialise the chart.
		$("#chartContainer").CanvasJSChart(options);

		// Subscribe to Pusher
		// Enable pusher logging - don't include this in production
		Pusher.logToConsole = true;

		// Initialise a Pusher Object.
		var pusher = new Pusher(PusherConfig.key, {
			cluster: PusherConfig.cluster,
			forceTLS: PusherConfig.forceTLS
		});

		// Subscribe to the channel.
		var channel = pusher.subscribe('pkmn-voting');
		// Bind to a particular event and listen to the event data.
		channel.bind('pkmn-starter', function(data) {
			// Use a higher order Array map.
			dataPoints = dataPoints.map(function (d) {
				// Check if the current label is the updated value.
				if (d.label == data.starter) {
					// Increment the starter's value by the number of new points.
					d.y += data.points;
				}
				// Return the original value as this is a map function.
				return d;
			});

			// Re-render the chart.
			$("#chartContainer").CanvasJSChart(options);
		});
	}
});