var textTest = ["hello, world!", "I am an AI", "Hi", 
	"This is the info panel", "Welcome to Dylan Gallardo's website...",
	"responses are absolutely confidential...",
	"and aren't recorded in any way",
	"Are my operations up to your standards?",
	"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non",
	  "proident sunt in culpa qui officia deserunt mollit anim id est laborum"];
var testCt = 0;
var textLoop = null;
var timerIsRunning = false;
var consoleBox = null;
var consoleContent = null;
var isScrolledToBottom = true;

// entry point
window.addEventListener ? 
window.addEventListener("load",init,false) : 
window.attachEvent && window.attachEvent("onload",init);

function init() {
	consoleBox = '#console';
	consoleContent = '#console p';

	testTextWrite();
}

function testTextWrite() {
	var element = document.getElementById("console");
	// var isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop + 1;

	if (timerIsRunning == false) {
		// isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
		// console.log(isScrolledToBottom);

		// var numberedContent = testCt + '. ' + textTest;
		writeText(consoleBox, consoleContent, textTest[testCt], 40, 100);
		timerIsRunning = true;
		testCt++;

		// line break
		var br = document.createElement('br');
		$(consoleContent).append(br);
	}

	if (testCt < textTest.length) {
		setTimeout(testTextWrite, 16);
	}
}

function writeText(targetScroll, target, content, speedMin, speedMax) {
	// add content letter by letter
	index = 0;
	var speed = randomInt(speedMin, speedMax);
	var element = document.getElementById("console");

	textLoop = setInterval(function() {
		isScrolledToBottom = element.scrollHeight - element.clientHeight <= element.scrollTop + 1;

		speed = randomInt(speedMin, speedMax);	
		$(target).append(content[index]);
		index++;

		if (isScrolledToBottom) {
			console.log('scrolling to bottom');
			element.scrollTop = element.scrollHeight - element.clientHeight;
		}

		if (index == content.length) {
			clearInterval(textLoop);
			timerIsRunning = false;
		}
	}, speed);
}

// get random integer in range min-max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}