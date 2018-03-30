//global variables
$(document).ready(function(){
//An array of movie titles     
var movies = ['american psycho', 'anchorman', 'harry potter', 'kill bill', 'scarface', 'spring breakers', 'star wars', 'the hunger games', 'the shinning','ace ventura', 'addams family', 'beetlejuice', 'bladerunner', 'dodgeball', 'elf', 'ghostbusters', 'indiana jones'];
//Main Functions
function displayGifbuttons (){
    $('#Gifbuttonview').empty(); // erasing duplicate results in the div id
    for (var i=0; i< movies.length; i++){
    var gifButton = $("<button>");
    gifButton.addClass("movies");
    gifButton.addClass("btn btn-primary");
    gifButton.attr("data-name", movies[i]);
    gifButton.text(movies[i]);
    $('#Gifbuttonview').append(gifButton);
    }
}

//Function to add new movie button
function AddnewButton(){
    $("#addGif").on("click", function(){
        var movie = $("#movie-input").val().trim();
        if (movie == ""){
            return false; // added so user cannot add a blank button
        }
        movies.push(movie);

        displayGifbuttons();
        return false;
    });
}
//function to remove last movie button
function RemovelastButton(){
    $("removeGif").on("click", function(){
        movies.pop(movie);
        displayGifbuttons();
        return false;
    });
}
//function that displays all of the gifs
function Displaygifs(){
    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=F83wH8JtFWXAq94qIL3yXldOx8dTpEyN&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response); // console test to make sure something returns
        $("#gifsview").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsview").prepend(gifDiv);
            }
        });
    }
// Main Process
displayGifbuttons();
AddnewButton();
RemovelastButton();
// Document Event Listeners
$(document).on("click", ".movies", Displaygifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});   
