//Variables
const button = $(".shuffle");
const container = $(".container");
const cardsURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=";
const cardsCount = 10;
const cardsAPI = cardsURL + cardsCount;


//Add a custom cursor and loading animation
$(button).addClass("shuffleLoading");
$('body').append("<div id='cursor'></div>");
  

//Deal function
function deal(data) {
  var html = '<ul class="deck">';
  $.each(data.cards, function (i, card) {
    html += '<li class="card">';
    html += '<img src=" ' + card.image + '" data-title="' + card.value + ' OF ' + card.suit + '">';
    html += '</li>';
  });
  html += '</ul>';

  $(container).html(html);
  $(button).removeClass("shuffleLoading");

  // Add lighbox on card click
  const $lightbox = $("<div class='lightbox'><div class='close'><p></p><img></div></div>");
  $('body').append($lightbox);
   $('.card').click(function() {
    var captions = $(this).contents().attr("data-title");
    $("p").html(captions);
    var src = $(this).contents().attr("src");
    $('img').css('background-image', 'url(' + src + ')');
    // Add lightbox
    $lightbox.fadeIn('slow');
  });

  // Close lighbox on click
  $lightbox.click(function() {
    $lightbox.fadeOut('slow');
  });
};

//Call deal function
$.getJSON(cardsAPI, deal);

//Shuffle and deal when button is clicked
$(button).click(function() {
  $(button).addClass("shuffleLoading");
  $(".deck").fadeOut(1000, "linear");
  $(".deck").fadeIn(1600, "linear",test);
});

function test(){
  $.getJSON(cardsAPI, deal);
};



// create a custom circular pointer
mouseX = function(event) {
  return event.clientX
}
mouseY = function(event) {
  return event.clientY
}
positionElement = function(event) {
  mouse = {
    h: $('#cursor').height(),
    w: $('#cursor').width(),
    x: mouseX(event),
    y: mouseY(event)
  };
  $('#cursor').css({
    top: mouse.y - mouse.h/2 + 'px',
    left: mouse.x  - mouse.w/2+ 'px'
  });
}
$(window).on('mousemove', function(event) {
  positionElement(event);
});