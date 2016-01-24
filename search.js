// After the API loads, call a function to enable the search box.
$(window).load(function() {
  gapi.client.setApiKey('AIzaSyAdihVNuBb6MYgkg3gLPSpS6fQYsrft8EY');
  // gapi.client.setApiKey('AIzaSyCW0d9UbZYXZ8r52U4tYnvzvvFa6QA9s4w');
  gapi.client.load('youtube', 'v3', function() {
   $('#search-button').attr('disabled', false);
  });

  $('#search-button').on("submit", function(events) {
    events.preventDefault();
    search();
  });
});

// Search for a specified string.
function search() {
  $('#search-container').empty();
  var q = $('#query').val(); // get the input words
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 10
  });

  request.execute(function(response) {
    // var results = response.result;
    for (var i=0;i<10;i++){
      // get id of the video
      var id = response.result.items[i].id.videoId
      // get title of the video
      var nameVideo = response.result.items[i].snippet.title
      // make a title above the video
      var titleName = "<h4>" + nameVideo + "</h4>"

      var lists = "<iframe src="+"https://www.youtube.com/embed/" + id +
      " name=" + nameVideo + " width='800' height='500' ></iframe>"
      // console.log(lists);
      // append heading name and video into search container
      $('#search-container').append(titleName);
      $('#search-container').append(lists);

    }
  });
}
