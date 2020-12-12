// Add the key, forceTLS, cluster options here.
const PusherConfig = {
  key: '149f2d35d0eb0a3d955c',
  cluster: 'us2',
  forceTLS: true
};

// Execute only after the whole document is fetched and assets are loaded.
$(document).ready(function () {
	
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
    function createOptions(dataPoints){
        return{
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
    }
    // Form submission event listener (event handler)
	$("#voteForm").submit(function (e) {
		// Prevent the default event.
		e.preventDefault();
		// Get the checked input element's value.
		var starter = $(".form-check-input:checked").val();
        console.log(starter);
        if(starter != undefined){
            //storing object in data variable
            var data = {"starter":starter}
            $.post("/vote/star", data, function (res) {
            // Log the output in the console.
            console.log(res);
            });
	   }else{
           delete(starter);
           window.alert("Try selecting a starter.")
       };
    });
	// Initialise Chart using jQuery selector.
	// Get the chart container element.
	var chartContainer = $("#chartContainer");
	// Check if the element exists in the DOM.
	if (chartContainer.length === 1) {
		// Construct the options for the chart.
		var options = createOptions(dataPoints)
		// Initialise the chart.
		$("#chartContainer").CanvasJSChart(options);

		// Initialise a Pusher Object.
		var pusher = new Pusher(PusherConfig.key, {
			cluster: PusherConfig.cluster,
			forceTLS: PusherConfig.forceTLS
		});

		// Subscribe to the channel.
		var channel = pusher.subscribe('pkmn-voting');
		// Bind to a particular event and listen to the event data.
		channel.bind('pkmn-starter', function(data) {
            //gives list of keys
            const newDataPoints = Object.keys(data).map(function(key){
                return{label: key, y: data[key]}
            });
            const newOptions = createOptions(newDataPoints)
            
			// Re-render the chart.
			$("#chartContainer").CanvasJSChart(newOptions);
		});
	}
});