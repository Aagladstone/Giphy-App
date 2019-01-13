


var football = ["Patrick Mahomes", "San Diego Chargers", "Alvin Kamara", "Nick Foles", "Superdome", "Todd Gurley", "Phillip Rivers", "Tom Brady", "Andrew Luck",
"Dak Prescott", "Ezekiel Elliot", "Bill Belichick", "Sean Payton", "Andy Reid", "Jason Garrett", "New Orleans Saints", "New England Patriots",
 "Philadelphia Eagles", "Kansas City Chiefs", "Indianapolis Colts"]


// This functon uses the AJAX method to use the API to grab our gif subjects append them on our screen
  function displayGif() {
      var football = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        football + "&api_key=A2wddbauByYfK69tVahUGYQ534AqPhgu&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"

      }).then(function(response){

            //this emties the "gif-view" html div
            $("#gif-view").empty();
            console.log(response);
            //this is where we create our response variable so we can go grab the data
            var results = response.data;
            //This for loop adds our attributes, and classes to our gifs so that we can access them later, and appends them on in our "gif-view" div
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;

              gifDiv.addClass("gifgif")
  
              var p = $("<p>").text("Rating: " + rating);

              var title = results[i].title;

              var t = $("<p>").text("Title: " + title);
  
              var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_still.url);
              gifImage.attr("data-still", results[i].images.fixed_height_still.url);
              gifImage.attr("data-animate", results[i].images.fixed_height.url);
              gifImage.addClass("gif");  
              gifImage.attr("data-state", "still");              
  

              gifDiv.append(gifImage);
              gifDiv.append(p);
              gifDiv.append(t);

          $("#gif-view").append(gifDiv)
            }
      });

      }


// Function is used for displaying gif buttons
function renderButtons() {

//First we must empty the buttons div
  $("#buttons-appear").empty();

  // Then we loop though our topic array
  for (var i = 0; i < football.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    //We are adding a new button
    var addButtons = $("<button>");
    // Adding a class
    addButtons.addClass("football");
    // Added a data-attribute
    addButtons.attr("data-name", football[i]);
    // Provided the initial button text
    addButtons.text(football[i]);
    // Added the button to the HTML
    $("#buttons-appear").append(addButtons);
  }
}

// This function handles events where the submit button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var newFootball = $("#gif-input").val().trim();

  // The word from the textbox is then added to the topics array
  football.push(newFootball);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();

});

// function animateGif() {

$(document.body).on("click", ".gif", function() {

    var state = $(this).attr("data-state");
        console.log(state)
   
   // Check if the variable state is equal to 'still',

     if(state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
     } else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
       } 
});
// }


$(document).on("click", ".football", displayGif);


// Calling the renderButtons function to display the intial buttons
renderButtons();
