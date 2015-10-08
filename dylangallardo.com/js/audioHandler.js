var i=0;
var ambientVolume = 0;
var ambientAudio = null;
var mouse = {x: null, y: null, oldX: null, oldY: null, movementDist: 0};

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
    // update mouse pos
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.movementDist = Math.abs(mouse.x-mouse.oldX)+Math.abs(mouse.y-mouse.oldY);

    var volumeModifier = mouse.movementDist/900;
    // fix for volume being high on initial movement
    if (mouse.oldX == null) {
      volumeModifier = 0;
    }

    mouse.oldX = mouse.x;
    mouse.oldY = mouse.y;

    // change volume
    ambientVolume += volumeModifier; //0.04 is a good speed
    if (ambientVolume > 0.5) {
      ambientVolume = 0.5;
    }
    ambientAudio.volume = ambientVolume;
  });

  window.onblur = function() {
      ambientVolume = 0;
      ambientAudio.volume = ambientVolume;
  };
}

addSoundToAll('.image-container', '#hover-sound', 1);
addSoundToAll('.navbar-nav li a', '#nav-hover-sound', 0.8);
addSoundToAll('.img-contact-icon', '#hover-sound', 1);


// Adds a sound that will trigger on hover to all
// elements with this id/class
function addSoundToAll(element, sound, startVolume) {
  i=0; //reset counter
  var soundPrefixRemoved = sound.substr(1);

  // Check if sound and element exist
  if ($(sound).length > 0 && $(element).length > 0) {
    $(element)
      .each(function(i) {
        $(sound)
          .clone()
          .css("volume", 0)
          .attr("id", soundPrefixRemoved + i)
          .appendTo($(this).parent());

        $(this).data("count", i);
        $(sound + i)[0].volume=0.8;

        i++;
      })
      .mouseenter(function() {
        $(sound + $(this).data("count"))[0].play();
      });
  }
}

update();

// main loop
function update() {
  if (ambientAudio) {
    ambientVolume -= 0.015;
    if (ambientVolume < 0) {
      ambientVolume = 0;
    }

    ambientAudio.volume = ambientVolume;
  }

  requestAnimationFrame(update); // do it all again
}