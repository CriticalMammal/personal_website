var i=0;
var ambientVolume = 0;

var ambientAudio = document.getElementById('mouse-move-sound');
ambientAudio.volume = ambientVolume;
document.getElementById('mouse-move-sound').play();

ambientAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

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

$(window).mousemove(function(e){
  ambientVolume += 0.006;
  if (ambientVolume > 0.5) {
    ambientVolume = 0.5;
  }
  ambientAudio.volume = ambientVolume;
});

window.onblur = function() {
    ambientVolume = 0;
    ambientAudio.volume = ambientVolume;
};

update();

// main loop
function update() {
  ambientVolume -= 0.002;
  if (ambientVolume < 0) {
    ambientVolume = 0;
  }

  ambientAudio.volume = ambientVolume;

  requestAnimFrame(update); // do it all again
}