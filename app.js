$(document).ready(function() {

    var characters = [
      "dwight", "jim", "pam", "michael", "kevin", "kelly",
      "angela", "phyllis", "darryl", "andy", "oscar",
      "toby", "creed"
    ];
  
    // function to make buttons and add to page
    function resultButton(array, newClass, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < array.length; i++) {
        var a = $("<button>");
        a.addClass(newClass);
        a.attr("data-type", array[i]);
        a.text(array[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".character-button", function() {
      $("#characters").empty();
      $(".character-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=zD6k9ZmYHDE1Csx1qBLmgEYMetH7Gzt0";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        var results = response.data;
  
        for (var i = 0; i < results.length; i++) {
          var characterDiv = $("<div class=\"character-item\">");
  
          var rating = results[i].rating;
  
          var p = $("<p>").text("Rating: " + rating);
  
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
  
          var characterImage = $("<img>");
          characterImage.attr("src", still);
          characterImage.attr("data-still", still);
          characterImage.attr("data-animate", animated);
          characterImage.attr("data-state", "still");
          characterImage.addClass("character-image");
  
          characterDiv.append(p);
          characterDiv.append(characterImage);
  
          $("#character").append(characterDiv);
        }
      });
    });
  
    $(document).on("click", ".character-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-character").on("click", function(event) {
      event.preventDefault();
      var newCharacter = $("input").eq(0).val();
  
      if (newCharacter.length > 2) {
        characters.push(newCharacter);
      }
  
      resultButton(characters, "character-button", "#character-buttons");
  
    });
  
    resultButton(characters, "character-button", "#character-buttons");
  });
  