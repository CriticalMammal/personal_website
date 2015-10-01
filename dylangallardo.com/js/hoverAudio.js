var i=0;

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