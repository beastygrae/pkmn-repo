// Add the key, forceTLS, cluster options here.
const PusherConfig = {
  key: '149f2d35d0eb0a3d955c',
  cluster: 'us2',
  forceTLS: true
};


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
      // Increment the house's value by the number of new points.
      d.y += data.points;
    }
    // Return the original value as this is a map function.
    return d;
  });
  //Re-Render the chart
  $("#chartContainer").CanvasJSChart(options);
});