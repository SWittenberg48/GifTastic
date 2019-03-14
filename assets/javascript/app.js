$(document).ready(function() {
  var comics = [
    "Adam Sandler",
    "Kevin Hart",
    "Bill Burr",
    "Jerry Seinfeld",
    "Chris Farley",
    "Dave Chappelle",
    "will ferrel",
    "Chris Rock",
    "Tina Fey",
    "Tracy Morgan"
  ];

  function renderButtons() {
    $("#person-buttons").empty();
    for (i = 0; i < comics.length; i++) {
      $("#person-buttons").append(
        "<button class='btn' data-person='" +
          comics[i] +
          "'>" +
          comics[i] +
          "</button>"
      );
    }
  }
  renderButtons();

  $("#add-person").on("click", function() {
    event.preventDefault();
    var person = $("#person-input")
      .val()
      .trim();
    comics.push(person);
    renderButtons();
  });

  $("button").on("click", function() {
    var person = $(this).attr("data-person");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      $("#comics").empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        var rating = response.rating;
        gifImage.attr("src", results[i].images.fixed_height.url);

        gifImage.attr("src", results[i].images.original_still.url);
        gifImage.attr("data-still", results[i].images.original_still.url);
        gifImage.attr("data-animate", results[i].images.original.url);
        gifImage.attr("data-State", "still");
        gifImage.attr("class", "gif");
        gifDiv.append(p);
        gifDiv.append(gifImage);
        $("#comics").append(gifDiv);
      }
    });
  });
  function changeState() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".gifs", changeState);
});
