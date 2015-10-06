$("#button-left")[0].addEventListener("click", playSound);
$('#button-right')[0].addEventListener("click", playSound);

document.getElementById('flip-sound').volume = 0.8;

function playSound() {
	console.log("left clicked");
	$('#flip-sound')[0].play();
}