$(document).ready(function () {

  var topics = [];

  function displayGiphySearch() {

    var x = $(this).data("search");
    console.log(x);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=Z77jc3UEWHwJRxBSIkQIgM5FNx8mtbUq&limit=10";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {

        var searchDiv = $("<div class='col-md-4'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var searchImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        searchImage.attr("src", staticSrc);
        searchImage.addClass("hboGiphy");
        searchImage.attr("data-state", "still");
        searchImage.attr("data-still", staticSrc);
        searchImage.attr("data-animate", defaultAnimatedSrc);
        searchDiv.append(p);
        searchDiv.append(searchImage);
        $("#searchResultsArea").prepend(searchDiv);

      }
    });
  }

  $("#addSearch").on("click", function (event) {
    event.preventDefault();
    var newSearch = $("#searchInput").val().trim();
    topics.push(newSearch);
    console.log(topics);
    $("#searchInput").val('');
    displayButtons();
  });

  function displayButtons() {
    $("#searchResultsButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "search");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#searchResultsButtons").append(a);
    }
  }

  displayButtons();

  $(document).on("click", "#search", displayGiphySearch);

  $(document).on("click", ".hboGiphy", pausePlayGifs);

  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

});

