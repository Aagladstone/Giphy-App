


var football = ["Patrick Mahomes", "San Diego Chargers", "Alvin Kamara", "Nick Foles", "Superdome", "Todd Gurley", "Phillip Rivers", "Tom Brady", "Andrew Luck",
"Dak Prescott", "Ezekiel Elliot", "Bill Belichick", "Sean Payton", "Andy Reid", "Jason Garrett", "New Orleans Saints", "New England Patriots",
 "Philadelphia Eagles", "Kansas City Chiefs", "Indianapolis Colts"]



  function displayGif() {
      var football = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        football + "&api_key=A2wddbauByYfK69tVahUGYQ534AqPhgu&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response){

            console.log(response);

            $("#gif-view").empty();

            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;

              gifDiv.addClass("gifgif")
  
              var p = $("<p>").text("Rating: " + rating);
  
              var personImage = $("<img>");

              personImage.attr("src", results[i].images.fixed_height_still.url);
              personImage.attr("data-still", results[i].images.fixed_height_still.url);
              personImage.attr("data-animate", results[i].images.fixed_height.url);
              personImage.addClass("pause");  
              
  

              gifDiv.append(personImage);
              gifDiv.append(p);

          $("#gif-view").append(gifDiv)
            }
      });



      }




function getFootballGif() {

  // YOUR CODE GOES HERE!!!
  var footballGif = $(this).attr("data-name");

  alert(footballGif);
}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-appear").empty();

  // Looping through the array of movies
  for (var i = 0; i < football.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("football");
    //added a attribute still
    a.attr("data-state", "still");
    // Added a data-attribute
    a.attr("data-name", football[i]);
    // Provided the initial button text
    a.text(football[i]);
    // Added the button to the HTML
    $("#buttons-appear").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var newFootball = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  football.push(newFootball);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

function animateGif() {

$(".pause").on("click", function() {

    var state = $(this).attr("data-state");
    console.log(state)
   
   // =============================================

   // STEP THREE: Check if the variable state is equal to 'still',

     if(state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
     } else 
       {
         $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
       }

    
});
}

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".football", displayGif);

$(document.body).on("click", ".pause", animateGif);



// Calling the renderButtons function to display the intial buttons
renderButtons();

// &image/original_still