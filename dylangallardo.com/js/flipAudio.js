$("#button-left")[0].addEventListener("click", playSound);
$('#button-right')[0].addEventListener("click", playSound);

function playSound() {
	console.log("left clicked");
	$('#flip-sound')[0].play();
}