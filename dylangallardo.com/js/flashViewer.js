var characterList = null;
var currentContent = 0;
var parent = $('#flash-content embed').parent();
var buttonLeft = document.getElementById("button-left");
var buttonRight = document.getElementById("button-right");


// Check for flash player in this browser.
// If not available switch to .gif versions of content
// *swfobject relies on the swfobject.js resource*
if(swfobject.hasFlashPlayerVersion("1"))
{
	var characterList = [
		"flash/DGallardo_RunningGirl_Side.swf",
		"flash/DGallardo_Character_Zenfella.swf",
		"flash/DGallardo_Character_Bill.swf",
		"flash/DGallardo_Character_Fatfella.swf",
		"flash/DGallardo_Character_TiredGirl.swf",
		"flash/DGallardo_Character_MagicGuy.swf",
		"flash/DGallardo_Character_RunningGirl.swf",
		"flash/DGallardo_Character_RunningGirl_Views.swf"
		];
}
else
{
	var characterList = [
		"img/Particle_Characters/Character_ZenFella.gif",
		"img/Particle_Characters/Character_BigFella.gif",
		"img/Particle_Characters/Character_Bill.gif",
		"img/Particle_Characters/Character_TiredGirl.gif",
		"img/Particle_Characters/Character_MagicFella.gif"
	];

	newElement = "<embed src='" + characterList[0] + "' align='center' width='100%' height='100%'>";
	$('#flash-content embed').remove();
	parent.append(newElement);
}


// Add event listeners
buttonLeft.addEventListener("click", function() {
	currentContent--;
	if (currentContent < 0) {
		currentContent=characterList.length-1;
	}

	changeContent();
});

buttonRight.addEventListener("click", function() {
	currentContent++;
	if (currentContent >= characterList.length) {
		currentContent = 0;
	}

	changeContent();
});


function changeContent() {
	newElement = "<embed src='" + characterList[currentContent] + "' align='center' width='100%' height='100%'>";
	$('#flash-content embed').remove();
	parent.append(newElement);

	// newElement = "<embed src='" + characterList[currentContent] + "' align='center' width='100%' height='100%'>";
	// $('#flash-content object').remove();
	// parent.append(newElement);
}