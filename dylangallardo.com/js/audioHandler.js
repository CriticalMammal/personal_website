var i=0;
var ambientVolume = 0;
var ambientAudio = null;

if ($("#mouse-move-sound").length > 0) {
  ambientAudio = document.getElementById('mouse-move-sound');
  ambientAudio.volume = ambientVolume;
  ambientAudio.play();

  // HTML5 audio loop wasn't working so did it manually
  ambientAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);

  // Events and listeners
  $(window).mousemove(function(e){
    ambientVolume += 0.04;
    if (ambientVolume > 0.5) {
      ambientVolume = 0.5;
    }
    ambientAudio.volume = ambientVolume;
    console.log("working");
  });

  window.onblur = function() {
      ambientVolume = 0;
      ambientAudio.volume = ambientVolume;
  };
}

// Attach sounds to elements
if ($("#hover-sound").length > 0) {
  $(".image-container")
    .each(function(i) {
      $("#hover-sound")
        .clone()
        .css("volume", 0)
        .attr("id", "hover-sound" + i)
        .appendTo($(this).parent());
      
      $(this).data("beeper", i);
      $("#hover-sound" + $(this).data("beeper"))[0].volume=1;

      i++;
    })
    .mouseenter(function() {
      $("#hover-sound" + $(this).data("beeper"))[0].play();
    });

  $("#hover-sound").attr("id", "hover-sound");
}
if ($("#nav-hover-sound").length > 0) {
  i=0; //reset counter

  $(".navbar-nav li a")
    .each(function(i) {
      $('#nav-hover-sound')
        .clone()
        .css("volume", 0)
        .attr("id", "nav-hover-sound" + i)
        .appendTo($(this).parent());

      $(this).data("beeper", i);
      $('#nav-hover-sound' + $(this).data("beeper"))[0].volume=0.8;

      i++;
    })
    .mouseenter(function() {
      $('#nav-hover-sound' + $(this).data("beeper"))[0].play();
    });

  $('nav-hover-sound').attr("id", "nav-hover-sound");
}


update();

// main loop
function update() {
  if (ambientAudio) {
    ambientVolume -= 0.01;    
    if (ambientVolume < 0) {
      ambientVolume = 0;
    }

    ambientAudio.volume = ambientVolume;
  }

  requestAnimFrame(update); // do it all again
}