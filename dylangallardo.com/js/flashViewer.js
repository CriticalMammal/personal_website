var characterList = ["flash/DGallardo_RunningGirl_Side.swf",
	"flash/DGallardo_Character_Zenfella.swf",
	"flash/DGallardo_Character_Bill.swf",
	"flash/DGallardo_Character_Fatfella.swf",
	"flash/DGallardo_Character_TiredGirl.swf",
	"flash/DGallardo_Character_MagicGuy.swf",
	"flash/DGallardo_Character_RunningGirl.swf",
	"flash/DGallardo_Character_RunningGirl_Views.swf",];

var currentContent = 0;
var parent = $('#flash-content embed').parent();
// var newElement = "<embed scr='" + characterList[current += 1] + "' align='center' width='100%' height='100%'>";
var buttonLeft = document.getElementById("button-left");
var buttonRight = document.getElementById("button-right");

function changeContent() {
	newElement = "<embed src='" + characterList[currentContent] + "' align='center' width='100%' height='100%'>";
	$('#flash-content embed').remove();
	parent.append(newElement);
}

buttonLeft.addEventListener("click", function() {
	currentContent--;
	if (currentContent < 0) {
		currentContent=characterList.length-1;
	}

	changeContent();
});

buttonRight.addEventListener("click", function() { 
	console.log("clicked");
	currentContent++;
	if (currentContent >= characterList.length) {
		currentContent = 0;
	}

	changeContent();
});